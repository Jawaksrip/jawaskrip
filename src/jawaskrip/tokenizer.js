const fs = require('fs')
const beautify = require('js-beautify').js_beautify

const { constant, symbol, handler, keyword } = require('./types')

class Tokenizer {
    /**
     *  mapping token yang diberikan
     *  @param {Any} _type - tipe token
     *  @param {Any} _value - value token
     *  @param {number} _line - baris token
     *  @return {Object} - objek hasil mapping token
     */
    toke(_type, _value, _line) {
        return {
            type: _type,
            value: _value,
            line: _line
        }
    }

    /**
     * membuat token dari value yang diberikan
     * @param {String} _code - teks code yang aka di tokenize
     * @return {Function} - callback
     */
    tokenize(_code, _callback) {
        /**
         * @var tokens {Object} - hasil tokenize
         * @var line {Number} - jumlah baris code
         */
        let tokens = []
        let line = 1
        let i = 0

        while (i < _code.length) {
            /**
             * @const {String} c - huruf jaman now
             */
            const c = _code[i]
            const lastKey = tokens[tokens.length - 1]

            let lastTokenIsKeyword = false

            if (lastKey != undefined) {
                if (
                    Object.keys(keyword).includes(
                        tokens[tokens.length - 1].value.toUpperCase()
                    )
                ) {
                    lastTokenIsKeyword = true
                }
            }

            // cek newline
            if (c == '\n') {
                tokens.push(this.toke(constant.T_NEWLINE, c, line))
                line++
            } else if (c == ' ' || c == String.fromCharCode(13));
            else if (!c.isEmpty() && !isNaN(c)) {
                // Integer
                let num = ''
                while (!isNaN(_code[i])) {
                    num += _code[i]
                    i++
                }
                i--
                tokens.push(this.toke(constant.T_NUM, num, line))
            } else if (c.isAlphaNumeric() || c == '_') {
                //Kata dan Keyword
                let word = ''

                while (
                    i < _code.length &&
                    (_code[i].isAlphaNumeric() ||
                        _code[i] == '' ||
                        _code[i] == '_')
                ) {
                    word += _code[i]
                    i++
                }
                i--

                // cek jika token terakhir bukan keyword
                if (handler.includes(word) && !lastTokenIsKeyword) {
                    let key = word

                    while (_code[i] != ')' && i < _code.length) {
                        i++
                        key += _code[i]
                    }
                    tokens.push(this.toke(word.toUpperCase(), key, line))
                } else if (word == 'impor' && !lastTokenIsKeyword) {
                    let allSyntax = word

                    while (
                        !(_code[i] == ';' || _code[i] == '\n') &&
                        i < _code.length
                    ) {
                        i++
                        allSyntax += _code[i]
                    }
                    tokens.push(this.toke(word.toUpperCase(), allSyntax, line))
                } else if (word == 'adalah')
                    tokens.push(this.toke(constant.T_IS, keyword.IS, line))
                else if (word == 'var')
                    tokens.push(this.toke(constant.T_VAR, keyword.VAR, line))
                else if (word == 'masukan')
                    tokens.push(
                        this.toke(constant.T_INPUT, keyword.INPUT, line)
                    )
                else if (word == 'fungsi')
                    tokens.push(
                        this.toke(constant.T_FUNCTION, keyword.FUNCTION, line)
                    )
                else if (word == 'kelas')
                    tokens.push(
                        this.toke(constant.T_CLASS, keyword.CLASS, line)
                    )
                else if (word == 'konstruksi')
                    tokens.push(
                        this.toke(constant.T_CONSTRUCT, keyword.CONSTRUCT, line)
                    )
                else if (word == 'turunan')
                    tokens.push(
                        this.toke(constant.T_EXTENDS, keyword.EXTENDS, line)
                    )
                else if (word == 'buat')
                    tokens.push(this.toke(constant.T_NEW, keyword.NEW, line))
                else if (word == 'ini')
                    tokens.push(this.toke(constant.T_THIS, keyword.THIS, line))
                else if (word == 'kembalikan')
                    tokens.push(
                        this.toke(constant.T_RETURN, keyword.RETURN, line)
                    )
                else if (word == 'Angka')
                    tokens.push(
                        this.toke(constant.T_NUMBER, keyword.NUMBER, line)
                    )
                else if (word == 'Teks')
                    tokens.push(
                        this.toke(constant.T_STRING, keyword.STRING, line)
                    )
                else if (word == 'jika')
                    tokens.push(this.toke(constant.T_IF, keyword.IF, line))
                else if (word == 'jikaTidak' || word == 'jikatidak')
                    tokens.push(this.toke(constant.T_ELSE, keyword.ELSE, line))
                else if (word == 'lakukan')
                    tokens.push(this.toke(constant.T_DO, keyword.DO, line))
                else if (word == 'selama')
                    tokens.push(
                        this.toke(constant.T_WHILE, keyword.WHILE, line)
                    )
                else if (word == 'untuk')
                    tokens.push(this.toke(constant.T_FOR, keyword.FOR, line))
                else if (word == 'tidak' || word == 'bukan')
                    tokens.push(this.toke(constant.T_NOT, keyword.NOT, line))
                else if (word == 'dan')
                    tokens.push(this.toke(constant.T_AND, keyword.AND, line))
                else if (word == 'atau')
                    tokens.push(this.toke(constant.T_OR, keyword.OR, line))
                else if (word == 'tulis' || word == 'tampilkan')
                    tokens.push(
                        this.toke(constant.T_PRINT, keyword.PRINT, line)
                    )
                else if (word == 'masukan')
                    tokens.push(
                        this.toke(constant.T_INPUT, keyword.INPUT, line)
                    )
                else if (word == 'benar')
                    tokens.push(this.toke(constant.T_TRUE, keyword.TRUE, line))
                else if (word == 'salah')
                    tokens.push(
                        this.toke(constant.T_FALSE, keyword.FALSE, line)
                    )
                else if (word == 'ditambah')
                    // teks operator
                    tokens.push(this.toke(constant.T_PLUS, symbol.PLUS, line))
                else if (word == 'dikurangi')
                    tokens.push(this.toke(constant.T_MINUS, symbol.MINUS, line))
                else if (word == 'dikali')
                    tokens.push(this.toke(constant.T_TIMES, symbol.TIMES, line))
                else if (word == 'dibagi')
                    tokens.push(
                        this.toke(constant.T_DIVIDE, symbol.DIVIDE, line)
                    )
                else if (word == 'modulo')
                    tokens.push(this.toke(constant.T_MOD, symbol.MOD, line))
                else if (word == 'kurangdari' || word == 'kurangDari')
                    tokens.push(this.toke(constant.T_LESS, symbol.LESS, line))
                else if (word == 'lebihdari' || word == 'lebihDari')
                    tokens.push(
                        this.toke(constant.T_GREATER, symbol.GREATER, line)
                    )
                // bukan keyword kemungkinan nama variabel
                else tokens.push(this.toke(constant.T_VARNAME, word, line))
            } else if (c == '/' && _code[i + 1] == '/') {
                // comment
                let comment = ''

                while (_code[i] != '\n' && i < _code.length) {
                    comment += _code[i]
                    i++
                }

                tokens.push(
                    this.toke(constant.T_COMMENT, `\n${comment}\n`, line)
                )
            } else if (c == '+' || c == '-') {
                // postfix or prefix
                let fix = c
                if (c == _code[i + 1]) {
                    fix += _code[i + 1]
                    tokens.push(this.toke(constant.T_PFIX, fix, line))
                    i++
                } else if (_code[i + 1] == '=') {
                    fix += _code[i + 1]
                    tokens.push(this.toke(constant.T_ASSIGNMENT, fix, line))
                } else {
                    tokens.push(
                        this.toke(
                            fix == '+' ? constant.T_PLUS : constant.T_MINUS,
                            fix,
                            line
                        )
                    )
                }
            } else if ('*/%'.includes(c)) {
                let assignment = c
                if (_code[i + 1] == '=') {
                    assignment += _code[i + 1]
                    tokens.push(
                        this.toke(constant.T_ASSIGNMENT, assignment, line)
                    )
                    i++
                } else {
                    tokens.push(this.toke(constant.T_ARITHMATIC, c, line))
                }
            } else if (c == '<' || c == '>') {
                if (_code[i + 1] == '=') {
                    tokens.push(
                        this.toke(
                            c == '>' ? constant.T_GTOQ : constant.T_LTOQ,
                            c + '=',
                            line
                        )
                    )
                    i++
                } else if (c == '<')
                    tokens.push(this.toke(constant.T_LESS, c, line))
                else tokens.push(this.toke(constant.T_GREATER, c, line))
            } else if (c == '=') {
                // cek jika = bagian dari pfix
                if ('-+*/%'.includes(_code[i - 1])) {
                    i++
                } else if (_code[i + 1] == '>') {
                    tokens.push(
                        this.toke(constant.T_ARROW, c + _code[i + 1], line)
                    )
                    i++
                } else if (_code[i + 1] == '=') {
                    tokens.push(this.toke(constant.T_IS, keyword.IS, line))
                    i++
                } else {
                    tokens.push(this.toke(constant.T_ASSIGN, c, line))
                }
            } else if (c == '.')
                // Penutup
                tokens.push(this.toke(constant.T_DOT, c, line))
            else if (c == ',') tokens.push(this.toke(constant.T_COMMA, c, line))
            else if (c == ':') tokens.push(this.toke(constant.T_COLON, c, line))
            else if (c == ';')
                tokens.push(this.toke(constant.T_SCOLON, c, line))
            else if (c == '(')
                tokens.push(this.toke(constant.T_LPAREN, c, line))
            else if (c == ')')
                tokens.push(this.toke(constant.T_RPAREN, c, line))
            else if (c == '{')
                tokens.push(this.toke(constant.T_LBRACE, c, line))
            else if (c == '}')
                tokens.push(this.toke(constant.T_RBRACE, c, line))
            else if (`'"\``.includes(c)) {
                // String
                i++
                let quote = ''
                while (_code[i] != c) {
                    quote += _code[i]
                    i++
                    if (i >= _code.length)
                        this.error(line, 'Tanda Kutip Tidak Terselesaikan')
                }
                tokens.push(
                    this.toke(constant.T_QUOTE, `${c}${quote}${c}`, line)
                )
            } else tokens.push(this.toke(constant.T_UNKNOWN, c, line))
            i++
            if (i == _code.length) {
                _callback(tokens)
            }
        }
    }
    /**
     * Fungsi untuk menampilkan error programm
     * @param {Number} _line - baris terjadinya error
     * @param {String} _mess - pesan error yang akan di tampilkan
     * @throws {Error} Program Error
     */
    error(_line, _mess) {
        //console.log(global.userFilePath)
        throw `Error: ${global.userFilePath} (${_line}):\n${_mess}`
    }
}

exports.lex = (_filepath, _callback) => {
    const file = beautify(fs.readFileSync(_filepath, 'utf8'), {
        end_with_newline: true
    })

    const Tokenize = new Tokenizer()

    Tokenize.tokenize(file, res => {
        _callback(res)
    })
}

exports.lexString = (_code, _callback) => {
    new Tokenizer().tokenize(_code, res => {
        _callback(res)
    })
}

String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim()
}

String.prototype.isAlphaNumeric = function() {
    let code, i, len
    for (i = 0, len = this.length; i < len; i++) {
        code = this.charCodeAt(i)
        if (
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)
        ) {
            // lower alpha (a-z)
            return false
        }
    }

    return true
}
