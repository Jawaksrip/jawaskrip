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

    it('should compile lakukan selama to do while', async () => {
        const res = await jw.compile('lakukan{}selama(benar)')

        expect(res).toBe('do {} while (true)')
    })

    it('should compile ulangi', async () => {
        const res = await jw.compile(
            'ulangi(var i sebanyak 20 kali){tulis(i);}'
        )

        expect(res).toBe(
            'for (var i = 0; i < 20; i++) {\n' + '    console.log(i);\n}'
        )

        return jw
            .compile('ulangi(var i sebanyak){tulis(i);}')
            .catch(err =>
                expect(err).toBe(`Error pada baris 1: "Syntax 'ulangi' error"`)
            )
    })

    it('should compile jika to if', async () => {
        const res = await jw.compile('jika (benar){}')

        expect(res).toBe('if (true) {}')
    })

    it('should compile lain to else', async () => {
        const res = await jw.compile('jika(benar){}lain jika(salah){}lain{}')

        expect(res).toBe('if (true) {} else if (false) {} else {}')
    })

    it('should compile impor to require', async () => {
        const res = await jw.compile('impor fs dari "fs";')

        expect(res).toBe('const fs = require("fs");')
    })

    it('should compile kelas to class', async () => {
        const res = await jw.compile('kelas Hewan{konstruksi(){}}')

        expect(res).toBe(`class Hewan {\n    constructor() {}\n}`)
    })

    it('should compile turunan to extends', async () => {
        const res = await jw.compile('kelas Sapi turunan Hewan{konstruksi(){}}')

        expect(res).toBe(`class Sapi extends Hewan {\n    constructor() {}\n}`)
    })

    it('should compile buat to new', async () => {
        const res = await jw.compile('const cowy = buat Sapi()')

        expect(res).toBe(`const cowy = new Sapi()`)
    })

    it('should compile Angka to Number', async () => {
        const res = await jw.compile('const angka = Angka("123")')

        expect(res).toBe(`const angka = Number("123")`)
    })

    it('should compile Teks to String', async () => {
        const res = await jw.compile('const teks = Teks(123)')

        expect(res).toBe(`const teks = String(123)`)
    })

    it('should compile ini to this', async () => {
        const res = await jw.compile('ini.roda = 10')

        expect(res).toBe(`this.roda = 10`)
    })

    it('should compile ditambah to +', async () => {
        const res = await jw.compile('1 ditambah 1')

        expect(res).toBe(`1 + 1`)
    })

    it('should compile dikurangi to -', async () => {
        const res = await jw.compile('1 dikurangi 1')

        expect(res).toBe(`1 - 1`)
    })

    it('should compile dikali to *', async () => {
        const res = await jw.compile('1 dikali 1')

        expect(res).toBe(`1 * 1`)
    })

    it('should compile dibagi to +', async () => {
        const res = await jw.compile('1 dibagi 1')

        expect(res).toBe(`1 / 1`)
    })

    it('should compile modulo to %', async () => {
        const res = await jw.compile('1 modulo 1')

        expect(res).toBe(`1 % 1`)
    })

    it('should compile dan to &&', async () => {
        const res = await jw.compile('benar dan salah')
        const normal = await jw.compile('benar && salah')

        expect(res).toBe(`true && false`)
        expect(normal).toBe(`true && false`)
    })

    it('should compile atau to ||', async () => {
        const res = await jw.compile('benar atau salah')
        const normal = await jw.compile('benar || salah')

        expect(res).toBe(`true || false`)
        expect(normal).toBe(`true || false`)
    })

    it('should compile comment', async () => {
        const res = await jw.compile('//1 ditambah 1;\nanother()')

        expect(res).toBe('//1 ditambah 1;\nanother()')
    })

    it('should compile ultiline mcomment', async () => {
        const res = await jw.compile('/* 1 ditambah 1;\nanother() */')

        expect(res).toBe('/* 1 ditambah 1;\nanother() */')
    })

    it('should throw "tanda kutip" error', done => {
        jw.compile('let foo = "bar').catch(err => {
            expect(err).toBeInstanceOf(Error)
            done()
        })
    })

    it('should compile tunggu to await', async () => {
        const res = await jw.compile('const data = tunggu ambilData()')

        expect(res).toBe('const data = await ambilData()')
    })

    it('should compile assigment', async () => {
        const res = await jw.compile(
            'var j %= i;var d *= b;var n -= u;var z += y;'
        )

        expect(res).toBe('var j %= i;\nvar d *= b;\nvar n -= u;\nvar z += y;')
    })

    it('should compile arithmatic', async () => {
        const res = await jw.compile(
            'var a = j % i;var b = c * b;var n = x - u;var z = p + y;'
        )

        expect(res).toBe(
            'var a = j % i;\nvar b = c * b;\nvar n = x - u;\nvar z = p + y;'
        )
    })

    it('should compile masukan and import readline-sync module', async () => {
        const res = await jw.compile(
            'const foo = masukan("bar: ");var bar = masukan("foo: ");'
        )

        expect(res).toBe(
            `const readlineSync = require("${require.resolve(
                'readline-sync'
            )}");` +
                '\n\nconst foo = readlineSync.question("bar: ");\n' +
                'var bar = readlineSync.question("foo: ");'
        )
    })

    it('should compile comparison operators', async () => {
        const equal = await jw.compile('1 samadengan 1')
        const is = await jw.compile('benar adalah benar')
        const kurangDari = await jw.compile(
            '1 kurangdari 2;1 kurangDari 2;1 < 2;'
        )
        const lebihDari = await jw.compile('2 lebihdari 1;2 lebihDari 1;2 > 1;')
        const kurangDariSamadengan = await jw.compile('2 <= 2; 2 <= 1;')
        const lebihDariSamadengan = await jw.compile('2 >= 2;2 >=1;')

        expect(equal).toBe('1 == 1')
        expect(is).toBe('true === true')
        expect(kurangDari).toBe('1 < 2;\n1 < 2;\n1 < 2;')
        expect(lebihDari).toBe('2 > 1;\n2 > 1;\n2 > 1;')
        expect(kurangDariSamadengan).toBe('2 <= 2;\n2 <= 1;')
        expect(lebihDariSamadengan).toBe('2 >= 2;\n2 >= 1;')
    })

    it('should compile arrow function', async () => {
        const res = await jw.compile(
            'var makan = (makanan, kecepatan, minuman) => { ' +
                "tulis('makan', makanan, 'dan minum', minuman, 'dengan kecepatan', kecepatan) }"
        )

        expect(res).toBe(readData('results/arrow_function.txt'))
    })

    it('should compile setop and lewati to break and continue', async () => {
        const res = await jw.compile(
            'selama (benar){ jika (benar) setop;jika (salah) lewati; }'
        )

        expect(res).toBe(readData('results/setop_lewati.txt'))
    })

    it('should compile masukan', async () => {
        const res = await jw.compile(
            'selama (benar){ jika (benar) setop;jika (salah) lewati; }'
        )

        expect(res).toBe(readData('results/setop_lewati.txt'))
    })

    it('should compile segitiga pascal', async () => {
        const res = await jw.compile(readData('programs/segitiga_pascal.jw'))

        expect(res).toBe(readData('results/segitiga_pascal.txt'))
    })

    it('should compile ternak lele', async () => {
        const res = await jw.compile(readData('programs/ternak_lele.jw'))

        expect(res).toBe(readData('results/ternak_lele.txt'))
    })

    it('should compile "all.jw"', async () => {
        const res = await jw.compile(readData('programs/all.jw'))

        expect(res).toBe(readData('results/all.txt'))
    })
})
