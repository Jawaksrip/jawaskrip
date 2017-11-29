# JawaSkrip

An Indonesian Version of JavaScript

JawaSkrip addalah versi indonesia dari bahasa pemrograman JavaScript

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

- sementara atau while
```cs
var i = 10;
sementara(i > 0){
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

### Tabel Perbedaan

| JawaSkrip        | JavaScript        |
|------------------|-------------------|
| jika(){...}      | if(){...}         |
| jikaTidak(){...} | else if(){...}    |
| fungsi n(){...}  | function n(){...} |
| sementara(){...} | while(){...}      |
| untuk(){...}     | for(){...}        |
| tidak            | !=                |
| dan              | &&                |
| atau             | &#124;&#124;      |
| tulis()          | console.log()     |
| benar            | true              |
| salah            | false             |