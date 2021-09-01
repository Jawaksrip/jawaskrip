const program = require('../src/jawaskrip/program')
const fs = require('fs')
const pmock = require('pmock')
const rimraf = require('rimraf')

const masukan_token = require('./__data__/tokens/masukan_token')
const tangga_token = require('./__data__/tokens/tangga_token')

function getExample(name) {
    return __dirname + '/../example/' + name
}

function readData(name) {
    return fs.readFileSync(__dirname + '/__data__/' + name, 'utf8')
}

describe('program test', () => {
    beforeEach(() => {
        this.cwd = pmock.cwd(__dirname)
    })

    it('should compile a file', () => {
        program.compile(getExample('fungsi.jw'), result => {
            expect(result).toBe(readData('results/fungsi.txt'))
        })

        program.compile(getExample('impor.jw'), result => {
            expect(result).toBe(readData('results/impor.txt'))
        })
    })

    it('should get token from file', () => {
        program.token(getExample('masukan.jw'), result => {
            expect(result).toEqual(masukan_token)
        })

        program.token(getExample('tangga.jw'), result => {
            expect(result).toEqual(tangga_token)
        })
    })

    it('should clean temp directory', () => {
        program.clean()
        program.clean(res => {
            expect(res).toBe('No file on temp directory')
        })

        const tempDir = __dirname + '/../temp/'

        for (let i = 0; i < 10; i++) {
            fs.writeFileSync(tempDir + 'test' + i, 'test' + i)
        }

        program.clean(res => {
            expect(res).toBe('All file cleaned')
        })
    })

    it('should run javascript', async () => {
        return new Promise((resolve, reject) => {
            program.run('console.log("running for testing!")', resolve)
        }).catch(err => {
            expect(err).toBe(undefined)
        })
    })

    // wrong test, fix it later
    // it('should run javascript locally', () => {
    //     const angkaLocation = getExample('halo_dunia.jw')

    //     global.userFilePath = angkaLocation

    //     program.runLocal(angkaLocation)
    // })

    it('should run from given file path', () => {
        const fileLocation = getExample('pyramid.jw')

        program.runFile(fileLocation)
    })

    it('should run from relative file path', () => {
        const fileLocation = '../example/pyramid.jw'

        program.runFile(fileLocation)
    })

    it('should create temp dir if not exist', () => {
        const tempPath = __dirname + '/../temp/'

        rimraf(tempPath, () => {
            expect(fs.existsSync(tempPath)).toBeFalsy()

            program.checkTempDir()

            expect(fs.existsSync(tempPath)).toBeTruthy()
        })
    })

    afterEach(() => {
        this.cwd.reset()
    })
})
