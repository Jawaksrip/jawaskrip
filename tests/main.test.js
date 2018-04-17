const jw = require('../program/main')
const fs = require('fs')

function readData(name) {
    return fs.readFileSync(__dirname + '/__data__/' + name, 'utf8')
}

describe('main test', () => {
    it('should compile fungsi to function', async () => {
        const res = await jw.compile('fungsi hallo(){}')

        expect(res).toBe('function hallo() {}')
    })

    it('should compile selama to while', async () => {
        const res = await jw.compile('selama (){}')

        expect(res).toBe('while () {}')
    })

    it('should compile jika to if', async () => {
        const res = await jw.compile('jika (benar){}')

        expect(res).toBe('if (true) {}')
    })

    it('should compile impor to require', async () => {
        const res = await jw.compile('impor fs dari "fs";')

        expect(res).toBe('const fs = require("fs");')
    })

    it('should compile kelas to class', async () => {
        const res = await jw.compile('kelas Hewan{konstruksi(){}}')

        expect(res).toBe(`class Hewan {\n    constructor() {}\n}`)
    })

    it('should compile masukan and import readline-sync module', async () => {
        const res = await jw.compile('const foo = masukan("bar: ")')

        expect(res).toBe(
            `const readlineSync = require("${require.resolve(
                'readline-sync'
            )}");` + '\nconst foo = readlineSync.question("bar: ")'
        )
    })

    it('should compile segitiga pascal', async () => {
        const res = await jw.compile(`
            fungsi segitigaPascal(limit, baris){
                jika(!baris atau baris.length == 0) kembalikan segitigaPascal(limit, [[1]]);

                var barisBaru = [];
                var barisTerakhir = baris[baris.length - 1];

                untuk(var i = 1, panjang = barisTerakhir.length; i kurangDari panjang; i++){
                    barisBaru.push(barisTerakhir[i - 1] + barisTerakhir[i]);
                }

                barisBaru.unshift(1);
                barisBaru.push(1);

                baris.push(barisBaru);

                jika(limit == baris.length){
                    kembalikan baris;
                }else{
                    kembalikan segitigaPascal(limit, baris);
                }
            }

            var n = 4;
            var hasil = segitigaPascal(n + 1);

            setiap(hasil sebagai baris){
                tulis(baris.join(''));
            }
        `)

        expect(res).toBe(readData('segitiga_pascal.txt'))
    })

    it('should compile ternak lele', async () => {
        const res = await jw.compile(`
            var leleku = 10;
            var aku = "bahagia";

            tulis("aku " + aku);

            selama(leleku lebihDari 0){
                tulis("lelekuku tinggal " + leleku);
                leleku--;
            }

            tulis();

            jika(leleku kurangDari 1){
                tulis("Leleku mati semua");
                aku = "setres";
            }

            tulis();

            jika(aku tidak "bahagia"){
                var bwabwa = "bwa";

                untuk(var bwa = 0;bwa kurangDari 5;bwa++){
                    bwabwa += "bwa";
                }

                tulis("aku " + aku);
                tulis(bwabwa);
            }
        `)

        expect(res).toBe(readData('ternak_lele.txt'))
    })
})
