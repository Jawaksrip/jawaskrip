# JawaSkrip

Noting.

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

- Sebagai library ([Contoh](https://runkit.com/indmind/contoh-penggunaan-library-jawaskrip))
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

- uraiAngka atau parseInt

```cs
// contoh uraiAngka

tulis("tanpa uraiAngka")
var a = masukan("angka a: "); // misal kita masukan 3
var b = masukan("angka b: "); // misal kita masukan 2

tulis(a + b) // output akan "32"

tulis("dengan uraiAngka")
var c = uraiAngka(masukan("angka c: ")); // misal kita masukan 3
var d = uraiAngka(masukan("angka d: ")); // misal kita masukan 2

tulis(c + d) // output akan 5

```

-- uraiHuruf atau String

```cs
// contoh uraiHuruf

tulis("tanpa uraiHuruf");
tulis(2 + 2); // hasil: 4

tulis("dengan uraiHuruf");
tulis(uraiHuruf(2) + uraiHuruf(2)); // hasil: "22"

```

### Tabel Perbedaan

| JawaSkrip           | JavaScript        |
|---------------------|-------------------|
| jika(){...}         | if(){...}         |
| jikaTidak(){...}    | else if(){...}    |
| fungsi n(){...}     | function n(){...} |
| lakukan {} selama ()| do {} while()     |  
| selama(){...}       | while(){...}      |
| untuk(){...}        | for(){...}        |
| tidak               | !=                |
| dan                 | &&                |
| atau                | &#124;&#124;      |
| tulis()             | console.log()     |
| kelas{}             | class             |
| extends             | turunan           |
| masukan()           | ~~~               |
| benar               | true              |
| salah               | false             |

Dan lain-lain

## Kontribusi
Silahkan edit code sesuka hati :) :)
