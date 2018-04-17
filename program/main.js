const beautify = require('js-beautify').js_beautify

const tokenizer = require('../src/jawaskrip/tokenizer')
const transformer = require('../src/jawaskrip/transformer')
const program = require('../src/jawaskrip/program')

async function compile(_code) {
    return new Promise(resolve => {
        tokenizer.lexString(_code, token => {
            transformer.parse(token, compiled => {
                resolve(beautify(compiled))
            })
        })
    })
}

async function run(_code) {
    return new Promise(resolve => {
        tokenizer.lexString(_code, token => {
            transformer.parse(token, compiled => {
                program.run(compiled, resolve)
            })
        })
    })
}

async function runJS(_code) {
    return new Promise(resolve => {
        program.run(_code, () => resolve())
    })
}

module.exports = {
    compile,
    run,
    runJS
}
