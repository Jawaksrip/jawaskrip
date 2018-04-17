const program = require('../src/jawaskrip/program.js')
const fs = require('fs')

const masukan_token = require('./__data__/masukan_token')
const tangga_token = require('./__data__/tangga_token')

function getExample(name) {
    return __dirname + '/../example/' + name
}

function readData(name) {
    return fs.readFileSync(__dirname + '/__data__/' + name, 'utf8')
}

describe('program test', () => {
    it('should compile a file', () => {
        program.compile(getExample('fungsi.jwsl'), result => {
            expect(result).toBe(readData('fungsi.txt'))
        })

        program.compile(getExample('impor.jwsl'), result => {
            expect(result).toBe(readData('impor.txt'))
        })
    })

    it('should get token from file', () => {
        program.token(getExample('masukan.jwsl'), result => {
            expect(result).toEqual(masukan_token)
        })

        program.token(getExample('tangga.jwsl'), result => {
            expect(result).toEqual(tangga_token)
        })
    })
})
