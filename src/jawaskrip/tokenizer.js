const fs = require('fs')
const beautify = require('js-beautify').js_beautify

const { constant, symbol, handler, keyword } = require('./types')

const {
    info,
    logExec,
    chalk: { gray }
} = require('./utils')

class Tokenizer {
    constructor() {
        this.error
    }

    toke(type, value, line) {
        return { type, value, line }
    }

    tokenize(code, callback) {
        logExec('tokenizer.Tokenizer.tokenize')

        let tokens = []
        let index = 0
        let lineNumber = 1

        info(
            'Tokenizer.tokenize',
            'start tokenizing, code length:',
            gray(code.length)
        )

        while (index < code.length) {
            if (this.error) break

            const currentChar = code[index]
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
            if (currentChar == '\n') {
                tokens.push(
                    this.toke(constant.NEWLINE, currentChar, lineNumber)
                )
                lineNumber++
            } else if (
                currentChar == ' ' ||
                currentChar == String.fromCharCode(13)
            );
            else if (!currentChar.isEmpty() && !isNaN(currentChar)) {
                // Integer
                let number = ''
                while (!isNaN(code[index])) {
                    number += code[index++]
                }
                index--
                tokens.push(this.toke(constant.NUM, number, lineNumber))
            } else if (currentChar.isAlphaNumeric() || currentChar == '_') {
                //Kata dan Keyword
                let word = ''

                while (
                    index < code.length &&
                    (code[index].isAlphaNumeric() ||
                        code[index] == '' ||
                        code[index] == '_')
                ) {
                    word += code[index++]
                }
                index--

                // cek jika token terakhir bukan keyword
                if (handler.includes(word) && !lastTokenIsKeyword) {
                    let key = word

                    while (code[index] != ')' && index < code.length) {
                        key += code[++index]
                    }

                    tokens.push(this.toke(word.toUpperCase(), key, lineNumber))
                } else if (word == 'impor' && !lastTokenIsKeyword) {
                    let expression = word

                    while (
                        !(code[index] == ';' || code[index] == '\n') &&
                        index < code.length
                    ) {
                        expression += code[++index]
                    }
                    tokens.push(
                        this.toke(word.toUpperCase(), expression, lineNumber)
                    )
                } else if (word == 'adalah') {
                    tokens.push(this.toke(constant.IS, symbol.IS, lineNumber))
                } else if (word == 'var')
                    tokens.push(
                        this.toke(constant.VAR, keyword.VAR, lineNumber)
                    )
                else if (word == 'masukan')
                    tokens.push(
                        this.toke(constant.INPUT, keyword.INPUT, lineNumber)
                    )
                else if (word == 'fungsi')
                    tokens.push(
                        this.toke(
                            constant.FUNCTION,
                            keyword.FUNCTION,
                            lineNumber
                        )
                    )
                else if (word == 'kelas')
                    tokens.push(
                        this.toke(constant.CLASS, keyword.CLASS, lineNumber)
                    )
                else if (word == 'konstruksi' || word == 'konstruktor')
                    tokens.push(
                        this.toke(
                            constant.CONSTRUCT,
                            keyword.CONSTRUCT,
                            lineNumber
                        )
                    )
                else if (word == 'turunan')
                    tokens.push(
                        this.toke(constant.EXTENDS, keyword.EXTENDS, lineNumber)
                    )
                else if (word == 'buat')
                    tokens.push(
                        this.toke(constant.NEW, keyword.NEW, lineNumber)
                    )
                else if (word == 'ini')
                    tokens.push(
                        this.toke(constant.THIS, keyword.THIS, lineNumber)
                    )
                else if (word == 'kembalikan')
                    tokens.push(
                        this.toke(constant.RETURN, keyword.RETURN, lineNumber)
                    )
                else if (word == 'Angka')
                    tokens.push(
                        this.toke(constant.NUMBER, keyword.NUMBER, lineNumber)
                    )
                else if (word == 'Teks')
                    tokens.push(
                        this.toke(constant.STRING, keyword.STRING, lineNumber)
                    )
                else if (word == 'jika')
                    tokens.push(this.toke(constant.IF, keyword.IF, lineNumber))
                else if (word == 'jikaTidak' || word == 'jikatidak')
                    tokens.push(
                        this.toke(constant.ELSE, keyword.ELSE, lineNumber)
                    )
                else if (word == 'lakukan')
                    tokens.push(this.toke(constant.DO, keyword.DO, lineNumber))
                else if (word == 'selama')
                    tokens.push(
                        this.toke(constant.WHILE, keyword.WHILE, lineNumber)
                    )
                else if (word == 'untuk')
                    tokens.push(
                        this.toke(constant.FOR, keyword.FOR, lineNumber)
                    )
                else if (word == 'tunggu')
                    tokens.push(
                        this.toke(constant.AWAIT, keyword.AWAIT, lineNumber)
                    )
                else if (word == 'tidak' || word == 'bukan')
                    tokens.push(this.toke(constant.NOT, symbol.NOT, lineNumber))
                else if (word == 'dan')
                    tokens.push(this.toke(constant.AND, symbol.AND, lineNumber))
                else if (word == 'atau')
                    tokens.push(this.toke(constant.OR, symbol.OR, lineNumber))
                else if (word == 'tulis' || word == 'tampilkan')
                    tokens.push(
                        this.toke(constant.PRINT, keyword.PRINT, lineNumber)
                    )
                else if (word == 'masukan')
                    tokens.push(
                        this.toke(constant.INPUT, keyword.INPUT, lineNumber)
                    )
                else if (word == 'benar')
                    tokens.push(
                        this.toke(constant.TRUE, keyword.TRUE, lineNumber)
                    )
                else if (word == 'salah')
                    tokens.push(
                        this.toke(constant.FALSE, keyword.FALSE, lineNumber)
                    )
                else if (word == 'ditambah')
                    // teks operator
                    tokens.push(
                        this.toke(constant.PLUS, symbol.PLUS, lineNumber)
                    )
                else if (word == 'dikurangi')
                    tokens.push(
                        this.toke(constant.MINUS, symbol.MINUS, lineNumber)
                    )
                else if (word == 'dikali')
                    tokens.push(
                        this.toke(constant.TIMES, symbol.TIMES, lineNumber)
                    )
                else if (word == 'dibagi')
                    tokens.push(
                        this.toke(constant.DIVIDE, symbol.DIVIDE, lineNumber)
                    )
                else if (word == 'modulo')
                    tokens.push(this.toke(constant.MOD, symbol.MOD, lineNumber))
                else if (word == 'kurangdari' || word == 'kurangDari')
                    tokens.push(
                        this.toke(constant.LESS, symbol.LESS, lineNumber)
                    )
                else if (word == 'lebihdari' || word == 'lebihDari')
                    tokens.push(
                        this.toke(constant.GREATER, symbol.GREATER, lineNumber)
                    )
                else if (word == 'samadengan' || word == 'samaDengan')
                    tokens.push(
                        this.toke(constant.EQUAL, symbol.EQUAL, lineNumber)
                    )
                else if (word == 'setop')
                    tokens.push(
                        this.toke(constant.BREAK, keyword.BREAK, lineNumber)
                    )
                else if (word == 'lewati')
                    tokens.push(
                        this.toke(
                            constant.CONTINUE,
                            keyword.CONTINUE,
                            lineNumber
                        )
                    )
                // bukan keyword kemungkinan nama variabel
                else tokens.push(this.toke(constant.VARNAME, word, lineNumber))
            } else if (currentChar == '/' && code[index + 1] == '/') {
                // comment
                let comment = ''

                while (code[index] != '\n' && index < code.length) {
                    comment += code[index++]
                }

                tokens.push(
                    this.toke(constant.COMMENT, `\n${comment}\n`, lineNumber)
                )
            } else if (currentChar == '+' || currentChar == '-') {
                // postfix or prefix
                let expression = currentChar
                if (currentChar == code[index + 1]) {
                    expression += code[index + 1]

                    tokens.push(
                        this.toke(constant.PFIX, expression, lineNumber)
                    )

                    index++
                } else if (code[index + 1] == '=') {
                    expression += code[index + 1]
                    tokens.push(
                        this.toke(constant.ASSIGNMENT, expression, lineNumber)
                    )
                } else {
                    tokens.push(
                        this.toke(
                            expression == '+' ? constant.PLUS : constant.MINUS,
                            expression,
                            lineNumber
                        )
                    )
                }
            } else if ('*/%'.includes(currentChar)) {
                let assignment = currentChar

                if (code[index + 1] == '=') {
                    assignment += code[index + 1]

                    tokens.push(
                        this.toke(constant.ASSIGNMENT, assignment, lineNumber)
                    )

                    index++
                } else {
                    tokens.push(
                        this.toke(constant.ARITHMATIC, currentChar, lineNumber)
                    )
                }
            } else if (currentChar == '<' || currentChar == '>') {
                if (code[index + 1] == '=') {
                    tokens.push(
                        this.toke(
                            currentChar == '>' ? constant.GTOQ : constant.LTOQ,
                            currentChar + '=',
                            lineNumber
                        )
                    )
                    index++
                } else if (currentChar == '<')
                    tokens.push(
                        this.toke(constant.LESS, currentChar, lineNumber)
                    )
                else
                    tokens.push(
                        this.toke(constant.GREATER, currentChar, lineNumber)
                    )
            } else if (currentChar == '=') {
                // cek jika = bagian dari pfix
                if ('-+*/%'.includes(code[index - 1])) {
                    index++
                } else if (code[index + 1] == '>') {
                    tokens.push(
                        this.toke(
                            constant.ARROW,
                            currentChar + code[index + 1],
                            lineNumber
                        )
                    )
                    index++
                } else if (code[index + 1] == '=') {
                    tokens.push(this.toke(constant.IS, symbol.IS, lineNumber))
                    index++
                } else {
                    tokens.push(
                        this.toke(constant.ASSIGN, currentChar, lineNumber)
                    )
                }
            } else if (currentChar == '.')
                // Penutup
                tokens.push(this.toke(constant.DOT, currentChar, lineNumber))
            else if (currentChar == ',')
                tokens.push(this.toke(constant.COMMA, currentChar, lineNumber))
            else if (currentChar == ':')
                tokens.push(this.toke(constant.COLON, currentChar, lineNumber))
            else if (currentChar == ';')
                tokens.push(this.toke(constant.SCOLON, currentChar, lineNumber))
            else if (currentChar == '(')
                tokens.push(this.toke(constant.LPAREN, currentChar, lineNumber))
            else if (currentChar == ')')
                tokens.push(this.toke(constant.RPAREN, currentChar, lineNumber))
            else if (currentChar == '{')
                tokens.push(this.toke(constant.LBRACE, currentChar, lineNumber))
            else if (currentChar == '}')
                tokens.push(this.toke(constant.RBRACE, currentChar, lineNumber))
            else if (`'"\``.includes(currentChar)) {
                // String
                index++
                let quote = ''

                while (code[index] != currentChar) {
                    quote += code[index++]

                    if (index >= code.length) {
                        this.throwError(
                            lineNumber,
                            'Tanda Kutip Tidak Terselesaikan'
                        )
                        break
                    }
                }
                tokens.push(
                    this.toke(
                        constant.QUOTE,
                        `${currentChar}${quote}${currentChar}`,
                        lineNumber
                    )
                )
            } else
                tokens.push(
                    this.toke(constant.UNKNOWN, currentChar, lineNumber)
                )

            index++

            if (index == code.length && !this.error) {
                info(
                    'Tokenizer.tokenize',
                    'done tokenizing, tokens length:',
                    gray(tokens.length)
                )

                return callback(tokens, null)
            }
        }

        return callback('', this.error)
    }
    throwError(line, mess) {
        info('Tokenizer.error', 'error:', `${line}):${mess}`)
        this.error = new Error(`Error: (${line}):\n${mess}`)
    }
}

exports.lex = (filepath, callback) => {
    logExec('tokenizer.lex')

    const code = beautify(fs.readFileSync(filepath, 'utf8'), {
        end_with_newline: true
    })

    this.lexString(code, callback)
}

exports.lexString = (code, callback) => {
    logExec('tokenizer.lexString')
    new Tokenizer().tokenize(code, callback)
}

String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim()
}

String.prototype.isAlphaNumeric = function() {
    let code, index, length

    for (index = 0, length = this.length; index < length; index++) {
        code = this.charCodeAt(index)

        if (!(code > 64 && code < 91) && !(code > 96 && code < 123)) {
            return false
        }
    }

    return true
}
