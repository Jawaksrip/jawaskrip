/**
 * @author indmind <mail.indmind@gmail.com>
 * @file Tokenize the script
 * @version 0.0.2
 */

const fs = require("fs");
const path = require("path");
const {constant} = require("./variable");

/**
 * @class Tokenizer - membuat token dari value yang diberikan
 */
class Tokenizer{
    /**
     *  mapping token yang diberikan
     *  @param {Any} _type - tipe token
     *  @param {Any} _value - value token
     *  @param {number} _line - baris token
     *  @return {Object} - objek hasil mapping token
     */
    toke(_type, _value, _line){
        return {type: _type, value: _value, line: _line};
    }

    /**
     * membuat token dari value yang diberikan
     * @param {String} _code - teks code yang aka di tokenize
     * @return {Object} - hasil tokenize
     */
    tokenize(_code){
        //const tokens = this.second_step(this.generate_token(_code));
        return this.generate_token(_code);
    }

    /**
     * step pertama tokenizer
     * @param {String} _code - teks kode
     */
    generate_token(_code){
        /**
         * @var tokens {Object} - hasil tokenize
         * @var line {Number} - jumlah baris code
         */
        let tokens = [];
        let line = 1;
        let i = 0;
        const end_word = new RegExp("[:!,;\.\s\?]");

        while(i < _code.length){

            /**
             * @const {String} c - huruf jaman now
             */
            const c = _code[i];

            // cek newline
            if(c == "\n") line++;

            else if(c == "." || c == " " || c == String.fromCharCode(13));

            // Operator
            // else if(c == "+") tokens.push(this.toke(constant.T_PLUS, null, line));
            // else if(c == "-") tokens.push(this.toke(constant.T_MINUS, null, line));
            else if(c == "+" || c == "-"){
                // postfix or prefix
                let fix = c;
                if(c == _code[i+1]){
                    fix += _code[i+1];
                    tokens.push({type: fix, value: null, line: line});
                    i++;
                }else{
                    tokens.push(this.toke(c == "+"? constant.T_PLUS: constant.T_MINUS, null, line));
                }
            }

            else if(c == "*") tokens.push(this.toke(constant.T_TIMES, null, line));
            else if(c == "/") tokens.push(this.toke(constant.T_DIVIDE, null, line));
            else if(c == "%") tokens.push(this.toke(constant.T_MOD, null, line));
            else if(c == "<") tokens.push(this.toke(constant.T_LESS, null, line));
            else if(c == ">") tokens.push(this.toke(constant.T_GREATER, null, line));
            else if(c == "=") tokens.push(this.toke(constant.T_ASSIGN, null, line));

            // Penutup
            else if(c == ";") tokens.push(this.toke(constant.T_SCOLON, null, line));
            else if(c == "(") tokens.push(this.toke(constant.T_LPAREN, null, line));
            else if(c == ")") tokens.push(this.toke(constant.T_RPAREN, null, line));
            else if(c == "{") tokens.push(this.toke(constant.T_LBRACE, null, line));
            else if(c == "}") tokens.push(this.toke(constant.T_RBRACE, null, line));

            // Integer
            else if(!c.isEmpty() && !isNaN(c)){
                let num = "";
                while(!isNaN(_code[i])){
                    num += _code[i];
                    i++;
                }
                i--; 
                tokens.push({type: num, value: null, line: line});
            }

            //Kata dan Keyword
            else if(c.isAlphaNumeric()){
                let word = '';
                while(i < _code.length && (_code[i].isAlphaNumeric() || _code[i] == "")){
                    word += _code[i];
                    i++;
                }
                // if(i < _code.length && !/[:!,;.s?]/.test(_code[i])){
                //     this.error(line, "noword");
                // }
                i--;

                if(word == "adalah") tokens.push(this.toke(constant.T_IS, null, line));
                else if(word == "var") tokens.push(this.toke(constant.T_VAR, null, line));
                else if(word == "fungsi") tokens.push(this.toke(constant.T_FUNCTION, null, line));
                else if(word == "jika") tokens.push(this.toke(constant.T_IF, null, line));
                else if(word == "jikaTidak" || word == "jikatidak") tokens.push(this.toke(constant.T_ELSE, null, line));
                else if(word == "sementara") tokens.push(this.toke(constant.T_WHILE, null, line));
                else if(word == "untuk") tokens.push(this.toke(constant.T_FOR, null, line));
                else if(word == "tidak") tokens.push(this.toke(constant.T_NOT, null, line));
                else if(word == "dan") tokens.push(this.toke(constant.T_AND, null, line));
                else if(word == "atau") tokens.push(this.toke(constant.T_OR, null, line));
                else if(word == "tulis" || word == "tampilkan") tokens.push(this.toke(constant.T_PRINT, null, line));
                else if(word == "masukan") tokens.push(this.toke(constant.T_INPUT, null, line));
                else if(word == "benar") tokens.push(this.toke(constant.T_TRUE, null, line));
                else if(word == "salah") tokens.push(this.toke(constant.T_FALSE, null, line));

                // teks operator
                else if(word == "ditambah") tokens.push(this.toke(constant.T_OR, null, line));
                else if(word == "dikurangi") tokens.push(this.toke(constant.T_OR, null, line));
                else if(word == "dikali") tokens.push(this.toke(constant.T_OR, null, line));
                else if(word == "dibagi") tokens.push(this.toke(constant.T_OR, null, line));
                else if(word == "modulus") tokens.push(this.toke(constant.T_MOD, null, line));
                else if(word == "kurangdari" || word == "kurangDari") tokens.push(this.toke(constant.T_LESS, null, line));
                else if(word == "lebihdari" || word == "lebihDari") tokens.push(this.toke(constant.T_GREATER, null, line));

                // bukan keyword kemungkinan nama variabel
                else tokens.push({type: word, value: null, line: line});
            }

            else if(c == '"'){
                i++;
                let quote = "";
                while(_code[i] != '"'){
                    quote += _code[i];
                    i++;
                    if(i >= _code.length) this.error(line, "Tanda Kutip Tidak Terselesaikan");
                }
                tokens.push({type: `"${quote}"`, value: null, line: line});
            }

            else this.error(line, "Syntax Error");
            i++;
        }
        return tokens;
    }
    /**
     * Fungsi untuk menampilkan error programm
     * @param {Number} _line - baris terjadinya error
     * @param {String} _mess - pesan error yang akan di tampilkan
     * @throws {Error} Program Error
     */
    error(_line, _mess){
        //console.log(global.userFilePath)
        throw new Error(`Error: ${global.userFilePath} (${_line}):\n${_mess}`);
    }
}

exports.lex = (_filepath) => {
    // const lineReader = require('readline').createInterface({
    //     input: fs.createReadStream(_filepath)
    // });

    // // membaca file baris perbaris
    // lineReader.on('line', function (line) {
    //     console.log(lexer(line));
    //     //console.log('Line from file:', line);
    // });
    const file = fs.readFileSync(_filepath, "utf8").toLowerCase();
    const Tokenize = new Tokenizer();
    return Tokenize.tokenize(file);
};

// array cleaner
Array.prototype.clean = function (deleteValue) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

String.prototype.isAlphaNumeric = function(){
    let code, i, len;
    for (i = 0, len = this.length; i < len; i++) {
        code = this.charCodeAt(i);
        if (!(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
        }
    }
    return true;
};

String.prototype.isSpace = function(){
    return !this || /^ *$/.test(this);
};

// percobaan ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// function lexer(code){
//     return code.split(/\W+/)
//         .filter(function (t) { return t.length > 0 })
//         .map(function (t, i) {
//             return isNaN(t)
//                 ? {type: 'word', value: t}
//                 : {type: 'number', value: t};
//         })
// }

// function lexer(_text) {
//     let splited = [];
//     let word = '';
//     let Strings = 0;
//     for (i in _text) {
//         // skip spasi
//         if (/\s/.test(_text[i])) continue;
//         if (/\w/.test(_text[i])) {
//             word += _text[i];
//             console.log(word)
//         } else {
//             Strings++;
//             splited.push(_text[i] == "'" && _text[i - word.length] == "'"
//                 ? 
//                 {
//                     type: "String",
//                     val: "s"
//                 }
//                 :
//                 {
//                     type:"key", 
//                     val:_text[i]
//                 });
//             word = '';
//         }
//     }
//     console.log(Strings);
//     return splited.clean('');
// }