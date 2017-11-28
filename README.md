# JawaSkrip

An Indonesian Version of JavaScript

JawaSkrip addalah versi indonesia dari bahasa pemrograman JavaScript

# Instalasi

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

# Tutorial

Untuk beberapa contoh kamu bisa lihat di [Example](https://github.com/Indmind/JawaSkrip/tree/master/example)

### Contoh JawaSkrip

- fungsi atau function
```
fungsi utama(){
    tulis("halo dunia");
}
utama();
```

- jika atau if
```
var saya = "jelek";

tulis("sekarang saya " + saya);

jika(saya tidak "ganteng"){
    saya = "ganteng";
}

tulis("sekarang saya " + saya);
```

- sementara atau while
```
var i = 10;
sementara(i > 0){
    i--;
    tulis(i);
}
```

- untuk atau for
```
untuk(var i = 0;i kurangDari 10;i++){
    tulis(i);
}
```

- aritmatika dasar (masih dapat mengunakan simbol normal)
```
tulis(3 ditambah 2 dikurangi 12 ditambah 32 dikali 21 dibagi 2);
```

### Tabel Perbedaan

| JawaSkrip        | JavaScript        |
|------------------|-------------------|
| jika(){...}      | if(){...}         |
| jikaTidak(){...} | else if(){...}    |
| fungsi n(){...}  | function n(){...} |
| sementara(){...} | sementara(){...}  |
| untuk(){...}     | for(){...}        |
| tidak            | !=                |
| dan              | &&                |
| atau             | &#124;&#124;      |
| tulis()          | console.log()     |
| benar            | true              |
| salah            | false             |