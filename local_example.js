const jawaskrip = require("./");

const script = `
var kumpulanData = [];
var panjangData  = masukan("Masukan jumlah data yang kan dimasukan: ");
var i = 0;

selama(i kurangDari panjangData){
    tulis("-----------------");
    tulis("Masukan data " + i);
    tulis("-----------------");
    var info = {
        nama: masukan("Masukan Nama: "),
        nim: masukan("Masukan NIM: "),
        nh: masukan("Masukan NH: "),
        uts: masukan("Masukan UTS: "),
        uas: masukan("Masukan UAS: ")
    }
    kumpulanData.push(info);
    i++;
}

setiap(kumpulanData sebagai data){
    var grade = "E";
    var ket = "Tidak Lulus";
    var NA = ((10/100) * data.nh) + ((40/100) * data.uts) + ((50/100) * data.uas);
    jika(NA lebihDari 84) grade = "A";
    jika(NA lebihDari 75 dan NA kurangDari 84) grade = "B";
    jika(NA lebihDari 60 dan NA kurangDari 75) grade = "C";
    jika(NA lebihDari 45 dan NA kurangDari 60) grade = "D";
    jika(NA lebihDari 60) ket = "Lulus";

    tulis("-----------------");
    tulis("Hasil data " + data.nama);
    tulis("-----------------");
    tulis("NIM: " + data.nim);
    tulis("NA: " + NA);
    tulis("GRADE: " + grade);
    tulis("KET: " + ket);
}
`
// run
jawaskrip.run(script);

// atau compile
jawaskrip.compile(script).then(compiled => console.log(compiled));
