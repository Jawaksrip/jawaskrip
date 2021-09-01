const { js_beautify } = require('js-beautify')
const { constant } = require('./types')

const {
    info,
    logExec,
    chalk: { gray }
} = require('./utils')

exports.parse = (tokens, callback) => {
    logExec('transformer.parse')

    const token_handler = {
        ULANGI: ulangi_handler,
        SETIAP: setiap_handler,
        IMPOR: impor_handler,
        [constant.INPUT]: masukan_handler
    }

    let transformed = ''
    let transformTrace = []

    for (let token of tokens) {
        transformTrace.push(`${token.type}:${token.line}`)

        if (token.type.toString() in token_handler) {
            transformed += token_handler[token.type](token)
        } else {
            transformed += token.value + ' '
        }
    }

    info('parse', 'transforming:', gray(transformTrace.join(',')))

    if (Object.keys(additions).length <= 0) return callback(transformed)

    let additionsString = ''

    for (let key in additions) additionsString += additions[key] + '\n'

    info('parse', 'remove all additions')
    additions = {}

    callback(`${additionsString}\n${transformed}`)
}

let additions = {}

const INPUT = `const readlineSync = require("${require.resolve(
    'readline-sync'
).replace(/\\/g, "\\\\")}");`

function ulangi_handler(token) {
    logExec('transformer.ulangi_handler', gray(token.line))

    let valArr = js_beautify(token.value).split(' ')

    info('ulangi_handler', 'array value:', valArr)
    info('ulangi_handler', 'array length:', valArr.length)

    if (valArr.length < 5) {
        triggerError("Syntax 'ulangi' error", token.line)
        process.exit()
    }

    const intvar = valArr[1]

    info('ulangi_handler', 'variable interation:', intvar)

    var parsedJS = `for(var ${intvar} = 0; ${intvar} < ${
        valArr[3]
    }; ${intvar}++)`

    return parsedJS
}

function setiap_handler(token) {
    logExec('transformer.setiap_handler', gray(token.line))

    const parsed = js_beautify(token.value, {
        indent_level: 4
    }).trim().split(' ')

    info('setiap_handler', 'parsed:', parsed)

    return `for(var ${parsed[2].slice(0, -1)} of ${parsed[0].split('(')[1]})`
}

function masukan_handler(token) {
    logExec('transformer.masukan_handler', gray(token.line))

    additions.input = INPUT

    return token.value
}

function impor_handler(token) {
    logExec('transformer.impor_handler', gray(token.line))

    const parsed = token.value
        .replace('impor', 'const')
        .replaceLast('dari', '=')
    let packageName = parsed.match(/['`"]([^'`"]+)['`"]/)[0]

    info('impor_handler', 'parsed:', parsed.trim())
    info('impor_handler', 'package:', packageName)

    return parsed.replaceLast(packageName, `require(${packageName})`)
}

function triggerError(mess, line) {
    logExec('transformer.triggerError', gray(line))
    throw `Error pada baris ${line}: "${mess}"`
}

String.prototype.reverse = function() {
    return this.split('')
        .reverse()
        .join('')
}

String.prototype.replaceLast = function(what, replacement) {
    return this.reverse()
        .replace(new RegExp(what.reverse()), replacement.reverse())
        .reverse()
}
