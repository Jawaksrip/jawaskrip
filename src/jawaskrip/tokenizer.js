/**
 * @author indmind <mail.indmind@gmail.com>
 * @file Tokenize the script
 * @version 0.0.2
 */

const fs = require("fs");
const path = require("path");
const {constant, native} = require("./var");

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
     * @return {Function} - callback
     */
    tokenize(_code, _callback){
        /**
         * @var tokens {Object} - hasil tokenize
         * @var line {Number} - jumlah baris code
         */
        let tokens = [];
        let line = 1;
        let i = 0;

        while(i < _code.length){

            /**
             * @const {String} c - huruf jaman now
             */
            const c = _code[i];

            // cek newline
            if(c == "\n") line++;

            else if(c == " " || c == String.fromCharCode(13));

            // Operator
            // else if(c == "+") tokens.push(this.toke(constant.T_PLUS, null, line));
            // else if(c == "-") tokens.push(this.toke(constant.T_MINUS, null, line));
            else if(c == "+" || c == "-"){
                // postfix or prefix
                let fix = c;
                if(c == _code[i+1]){
                    fix += _code[i+1];
                    tokens.push(this.toke(constant.T_PFIX, fix, line));
                    i++;
                }else if(_code[i + 1] == "="){
                    fix +=  _code[i + 1];
                    tokens.push(this.toke(constant.T_ASSIGNMENT, fix, line));
                }else{
                    tokens.push(this.toke(fix == "+"? constant.T_PLUS: constant.T_MINUS, fix, line));
                }
            }

            else if("*/%".includes(c)){
                let assignment = c;
                if(_code[i + 1] == "="){
                    assignment += _code[i + 1];
                    tokens.push(this.toke(constant.T_ASSIGNMENT, assignment, line));
                    i++;
                }else{
                    tokens.push(this.toke(constant.T_ARITHMATIC, c, line));
                }
            }

            else if(c == "<") tokens.push(this.toke(constant.T_LESS, c, line));
            else if(c == ">") tokens.push(this.toke(constant.T_GREATER, c, line));

            // cek jika = bukan bagian dari pfix
            else if(c == "="){
                if(!"-+*/%".includes(_code[i - 1])) tokens.push(this.toke(constant.T_ASSIGN, c, line));
                else i++;
            }

            // Penutup
            else if(c == ".") tokens.push(this.toke(constant.T_DOT, c, line));
            else if(c == ",") tokens.push(this.toke(constant.T_COMMA, c, line));
            else if(c == ":") tokens.push(this.toke(constant.T_COLON, c, line));
            else if(c == ";") tokens.push(this.toke(constant.T_SCOLON, c, line));
            else if(c == "(") tokens.push(this.toke(constant.T_LPAREN, c, line));
            else if(c == ")") tokens.push(this.toke(constant.T_RPAREN, c, line));
            else if(c == "{") tokens.push(this.toke(constant.T_LBRACE, c, line));
            else if(c == "}") tokens.push(this.toke(constant.T_RBRACE, c, line));

            // Integer
            else if(!c.isEmpty() && !isNaN(c)){
                let num = "";
                while(!isNaN(_code[i])){
                    num += _code[i];
                    i++;
                }
                i--; 
                tokens.push(this.toke(constant.T_NUM, num, line));
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

                if(word == "adalah") tokens.push(this.toke(constant.T_IS, native.IS, line));
                else if(word == "var") tokens.push(this.toke(constant.T_VAR, native.VAR, line));
                else if(word == "fungsi") tokens.push(this.toke(constant.T_FUNCTION, native.FUNCTION, line));
                else if(word == "jika") tokens.push(this.toke(constant.T_IF, native.IF, line));
                else if(word == "jikaTidak" || word == "jikatidak") tokens.push(this.toke(constant.T_ELSE, native.ELSE, line));
                else if(word == "sementara") tokens.push(this.toke(constant.T_WHILE, native.WHILE, line));
                else if(word == "untuk") tokens.push(this.toke(constant.T_FOR, native.FOR, line));
                else if(word == "tidak") tokens.push(this.toke(constant.T_NOT, native.NOT, line));
                else if(word == "dan") tokens.push(this.toke(constant.T_AND, native.AND, line));
                else if(word == "atau") tokens.push(this.toke(constant.T_OR, native.OR, line));
                else if(word == "tulis" || word == "tampilkan") tokens.push(this.toke(constant.T_PRINT, native.PRINT, line));
                else if(word == "masukan") tokens.push(this.toke(constant.T_INPUT, native.INPUT, line));
                else if(word == "benar") tokens.push(this.toke(constant.T_TRUE, native.TRUE, line));
                else if(word == "salah") tokens.push(this.toke(constant.T_FALSE, native.FALSE, line));

                // teks operator
                else if(word == "ditambah") tokens.push(this.toke(constant.T_PLUS, native.PLUS, line));
                else if(word == "dikurangi") tokens.push(this.toke(constant.T_MINUS, native.MINUS, line));
                else if(word == "dikali") tokens.push(this.toke(constant.T_TIMES, native.TIMES, line));
                else if(word == "dibagi") tokens.push(this.toke(constant.T_DIVIDE, native.DIVIDE, line));
                else if(word == "modulus") tokens.push(this.toke(constant.T_MOD, native.MOD, line));
                else if(word == "kurangdari" || word == "kurangDari") tokens.push(this.toke(constant.T_LESS, native.LESS, line));
                else if(word == "lebihdari" || word == "lebihDari") tokens.push(this.toke(constant.T_GREATER, native.GREATER, line));

                // bukan keyword kemungkinan nama variabel
                else tokens.push(this.toke(constant.T_VARNAME, word, line));
            }

            // double quote
            else if(c == '"'){
                i++;
                let quote = "";
                while(_code[i] != '"'){
                    quote += _code[i];
                    i++;
                    if(i >= _code.length) this.error(line, "Tanda Kutip Tidak Terselesaikan");
                }
                tokens.push(this.toke(constant.T_DQUOTE, `"${quote}"`, line));
            }
            // single quote
            else if(c == "'"){
                i++;
                let quote = "";
                while(_code[i] != "'"){
                    quote += _code[i];
                    i++;
                    if(i >= _code.length) this.error(line, "Tanda Kutip Tidak Terselesaikan");
                }
                tokens.push(this.toke(constant.T_QUOTE, `'${quote}'`, line));
            }
            // backtick
            else if(c == '`'){
                i++;
                let quote = "";
                while(_code[i] != '`'){
                    quote += _code[i];
                    i++;
                    if(i >= _code.length) this.error(line, "Tanda Kutip Tidak Terselesaikan");
                }
                tokens.push(this.toke(constant.T_BTICK, "`"+quote+"`", line));
            }

            else this.error(line, "at " + c);
            i++;
            if(i == _code.length){
                _callback(tokens);
            }
        }
    }
    /**
     * Fungsi untuk menampilkan error programm
     * @param {Number} _line - baris terjadinya error
     * @param {String} _mess - pesan error yang akan di tampilkan
     * @throws {Error} Program Error
     */
    error(_line, _mess){
        //console.log(global.userFilePath)
        throw `Error: ${global.userFilePath} (${_line}):\n${_mess}`;
    }
}

exports.lex = (_filepath, _callback) => {
    // const lineReader = require('readline').createInterface({
    //     input: fs.createReadStream(_filepath)
    // });

    // // membaca file baris perbaris
    // lineReader.on('line', function (line) {
    //     console.log(lexer(line));
    //     //console.log('Line from file:', line);
    // });
    const file = fs.readFileSync(_filepath, "utf8");
    const Tokenize = new Tokenizer();
    Tokenize.tokenize(file, (res) => {
        _callback(res);
    });
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