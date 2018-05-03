const beautify = require('js-beautify').js_beautify

const tokenizer = require('../src/jawaskrip/tokenizer')
const transformer = require('../src/jawaskrip/transformer')
const program = require('../src/jawaskrip/program')

async function compile(_code) {
    return new Promise((resolve, reject) => {
        tokenizer.lexString(_code, (token, error) => {
            if (error) return reject(error)

            transformer.parse(token, compiled => {
                resolve(beautify(compiled))
            })
        })
    })
}

async function run(_code) {
    return new Promise((resolve, reject) => {
        tokenizer.lexString(_code, (token, error) => {
            if (error) return reject(error)

            transformer.parse(token, compiled => {
                program.run(compiled, resolve)
            })
        })
    })
}

module.exports = { compile, run }
