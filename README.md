# JawaSkrip

An Indonesian Version of JavaScript

JawaSkrip adalah versi indonesia dari bahasa pemrograman JavaScript

## Instalasi

- pastikan sudah terinstall NodeJs di pc-mu, jika belum [Download NodeJs](https://nodejs.org/en/)
- buka terminal / cmd / powershell / git bash / lainya
- install secara globall menggunakan NPM

```
npm install -g jawaskrip
```
- untuk run 
```
jawaskrip <lokasi/nama file>
```

## Tutorial

Untuk beberapa contoh kamu bisa lihat di [Example](https://github.com/Indmind/JawaSkrip/tree/master/example)

### Contoh JawaSkrip

- fungsi atau function
```cs
fungsi utama(){
    tulis("halo dunia");
}
utama();
```

- jika atau if
```cs
var saya = "jelek";

tulis("sekarang saya " + saya);

jika(saya tidak "ganteng"){
    saya = "ganteng";
}

tulis("sekarang saya " + saya);
```

- ulangi
```cs
ulangi(var i sebanyak 20 kali){
    tulis(i);
}
```

- selama atau while
```cs
var i = 10;
selama(i > 0){
    i--;
    tulis(i);
}
```

- untuk atau for
```cs
untuk(var i = 0;i kurangDari 10;i++){
    tulis(i);
}
```

- perulangan dan objek
```cs
var a = 1;

untuk(var i = 1;i kurangDari 10;i++){
    a *= i;
    tulis(i);
}

var manusia = {
    nama: "dinda",
    uang: "Rp" + a
}

tulis(manusia.nama + " mempunyai uang sebanyak " + manusia.uang);
```


- aritmatika dasar (masih dapat mengunakan simbol normal)
```cs
tulis(3 ditambah 2 dikurangi 12 ditambah 32 dikali 21 dibagi 2);
```

- masukan
```cs
var b = [];
ulangi(var a sebanyak 5 kali){
    b[a] = masukan(`b[${a}] = `)
}

tulis(b);

var lanjut = benar;

selama(lanjut){
    tulis("berlanjut...");
    lanjut = salah;
    var jawaban = masukan("mau lanjut? (iya/tidak) ");
    jika(jawaban adalah "iya"){
        lanjut = benar;
    }
}
```

- Kelas atau class
```cs
kelas Manusia{
    konstruksi(){
        ini.tangan = 2;
        ini.kaki = 2;
        ini.mata = 2;
    }
}

kelas Laki turunan Manusia{
    konstruksi(){
        // selalu panggil fungsi super() untuk mengunakan variabel induk
        super();
        tulis(ini.mata);
    }
}

var saya = buat Laki();
```

- Pyramid
```cs
var baris = 5;
var k = 0;
var i = 1;
var j = 1;

selama(i <= baris){
    var hasil = "";
    untuk(j = 1; j <= baris dikurangi i; j++){
        hasil += " ";
    }
    selama(k bukan 2 dikali i dikurangi 1){
        hasil += "*";
        k++;
    }
    tulis(hasil);
    i++;
    k = 0;
}
```

### Tabel Perbedaan

| JawaSkrip        | JavaScript        |
|------------------|-------------------|
| jika(){...}      | if(){...}         |
| jikaTidak(){...} | else if(){...}    |
| fungsi n(){...}  | function n(){...} |
| selama(){...} | while(){...}      |
| untuk(){...}     | for(){...}        |
| tidak            | !=                |
| dan              | &&                |
| atau             | &#124;&#124;      |
| tulis()          | console.log()     |
| benar            | true              |
| salah            | false             |