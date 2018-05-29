# JawaSkrip
Noting.

[![Build Status](https://travis-ci.org/indmind/jawaskrip.svg?branch=master)](https://travis-ci.org/indmind/jawaskrip)
[![Coverage](https://codecov.io/gh/indmind/jawaskrip/branch/master/graph/badge.svg)](https://codecov.io/gh/indmind/jawaskrip)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/indmind/jawaskrip/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/jawaskrip.png)](https://npmjs.org/package/jawaskrip) [![Greenkeeper badge](https://badges.greenkeeper.io/indmind/jawaskrip.svg)](https://greenkeeper.io/)

## Instalasi

- Install [NodeJs](https://nodejs.org/en/)
- buka terminal / cmd
- install secara global menggunakan NPM

` npm install -g jawaskrip`

- atau sebagai library

` npm install --save jawaskrip`

## Tutorial

- CLI
```
~$ jawaskrip run <nama file atau lokasi file>
atau
~$ jw run <nama file atau lokasi file>
atau
~$ jw <nama file atau lokasi file>

bantuan:
~$ jw -h
```

- DIREKTORI

contoh direktori
```
.
├── lib
└── src
    ├── index.jw
    └── test.jw
```

`$ jawaskrip d src lib`

perintah di atas akan mengkompilasi semua file pada folder `src` dan menulis hasil kompilasinya ke folder `lib` dengan nama yang sama dan berekstensi `js`

```
.
├── lib
│   ├── index.js
│   └── test.js
└── src
    ├── index.jw
    └── test.jw
```

- API ([Contoh](https://runkit.com/indmind/contoh-penggunaan-library-jawaskrip))
```js
const jawaskrip = require("jawaskrip");

var code = `
    fungsi halo(){
        tulis("halo dunia");
    }
    halo();
`;

// compile
jawaskrip.compile(code).then(compiled => {
    console.log(compiled);
});

```

- Contoh script ada di [Example](https://github.com/Indmind/JawaSkrip/tree/master/example)

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
var nama = masukan("Masukan namamu: ");
tulis("halo " + nama);
```

- Kelas atau class
```cs
kelas Mamalia{
    konstruksi(){
        ini.bertulangBelakang = benar
        ini.menyusui = benar
    }
}

kelas Kucing turunan Mamalia{
    konstruksi(){
        // selalu panggil fungsi super() untuk mengunakan variabel induk
        super();
        tulis(ini.menyusui);
    }
}

var neko = buat Kucing();
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

- Angka atau Number

```cs
var a = masukan("angka a: "); 
var b = masukan("angka b: "); 

tulis(a + b) // "32"

var c = Angka(masukan("angka c: "));
var d = Angka(masukan("angka d: ")); 

tulis(c + d) // 5
```

- Teks atau String

```cs
tulis(2 + 2); // 4

tulis(Teks(2 + 2)); // "22"

```

### Tabel Perbedaan

| JawaSkrip           | JavaScript        |
|---------------------|-------------------|
| jika(){...}         | if(){...}         |
| lain jika(){...}    | else if(){...}    |
| lain{...}           | else{...}         |
| fungsi n(){...}     | function n(){...} |
| lakukan {} selama ()| do {} while()     |  
| selama(){...}       | while(){...}      |
| untuk(){...}        | for(){...}        |
| tidak               | !=                |
| adalah              | ===               |
| samaDengan          | ==                |
| dan                 | &&                |
| atau                | &#124;&#124;      |
| lebihDari           | >=                |
| kurangDari          | <=                |
| setop               | break             |
| lewati              | continue          |
| tulis()             | console.log()     |
| kelas{}             | class{}           |
| turunan             | extends           |
| masukan()           | ~~~               |
| benar               | true              |
| salah               | false             |

Dan lain-lain

## Kontribusi
Silahkan edit code sesuka hati :) :)
