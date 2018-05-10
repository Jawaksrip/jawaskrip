const fs = require('fs')
const childProcess = require('child_process')
const path = require('path')
const ncp = require('ncp').ncp
const beautify = require('js-beautify').js_beautify

const tokenizer = require('./tokenizer')
const transformer = require('./transformer')

const {
    info,
    logExec,
    chalk: { gray }
} = require('./utils')

const tempDir = '/../../temp/'

exports.compile = (filepath, callback) => {
    logExec('program.compile')

    tokenizer.lex(filepath, token => {
        transformer.parse(token, compiled => {
            callback(beautify(compiled), {
                end_with_newline: true
            })
        })
    })
}

exports.token = (filepath, callback) => {
    logExec('program.token')

    tokenizer.lex(filepath, token => {
        callback(token)
    })
}

exports.clean = callback => {
    logExec('program.clean')

    this.checkTempDir()

    const tempPath = path.join(__dirname, tempDir)
    const files = fs.readdirSync(tempPath)

    info('clean', 'temp path:', gray(tempPath))
    info('clean', 'files length:', gray(files.length))

    if (files.length <= 0) {
        return callback instanceof Function
            ? callback('No file on temp directory')
            : null
    }

    for (let file of files) {
        const fileLocation = path.join(tempPath, file)
        info('clean', 'delete file:', gray(file))
        if (fs.existsSync(fileLocation)) fs.unlinkSync(fileLocation)
    }

    return callback instanceof Function ? callback('All file cleaned') : null
}

exports.run = script => {
    logExec('program.run')
    this.checkTempDir()
    const tempFile = path.join(__dirname, tempDir, generateRandomName())
    info('run', 'temp file:', tempFile)
    fs.writeFileSync(tempFile, script)

    runScript(tempFile, this.clean)
}

exports.runLocal = (compiled, original) => {
    logExec('program.runLocal')

    const compiledPath = this.getCompiledPath()

    info('runLocal', 'compiled path:', gray(compiledPath))

    fs.writeFileSync(compiledPath, compiled)

    runScript(compiledPath, () => this.recover(compiledPath, original))
}

exports.runFile = filepath => {
    logExec('program.runFile')

    const realPath = this.getRealPath(filepath)
    const original = fs.readFileSync(realPath, 'utf8')

    info('runFile', 'real path:', gray(realPath))

    this.compile(realPath, result => {
        this.runLocal(result, original)
    })
}

exports.getRealPath = filePath => {
    logExec('program.getRealPath')

    info('getRealPath', 'process cwd:', gray(process.cwd()))
    info('getRealPath', 'path:', gray(filePath))
    info('getRealPath', 'path exist normal:', gray(fs.existsSync(filePath)))
    info(
        'getRealPath',
        'path exist relative:',
        gray(fs.existsSync(path.resolve(process.cwd(), filePath)))
    )

    if (fs.existsSync(filePath)) {
        global.userFilePath = filePath
    } else if (fs.existsSync(path.resolve(process.cwd(), filePath))) {
        global.userFilePath = path.resolve(process.cwd(), filePath)
    } else {
        info('getRealPath', 'Invalid file specified')
        process.exit()
    }

    return global.userFilePath
}

exports.getCompiledPath = () => {
    logExec('program.getCompiledPath')

    return this.renameToJs(global.userFilePath)
}

exports.renameToJs = filePath => {
    logExec('program.renameToJs')

    return filePath.replace(/\.[^\.]+$/, '.js')
}

exports.recover = (compiledPath, original) => {
    logExec('program.recover')

    if (compiledPath === global.userFilePath) {
        info('recover', 'compiled path is user file path')

        return fs.writeFileSync(global.userFilePath, original)
    } else if (fs.existsSync(compiledPath)) {
        info('recover', 'compiled path have different name')

        return fs.unlinkSync(compiledPath)
    }

    info('recover', 'compiled path does not exist')
}

exports.copyExample = (out, callback) => {
    logExec('program.copyExample')

    const exampleFolder = path.join(__dirname, '../../example/')
    ncp(exampleFolder, out, callback)
}

function runScript(scriptPath, callback) {
    logExec('program.runScript')

    let invoked = false
    let process = childProcess.fork(scriptPath)

    process.on('exit', code => {
        if (invoked) return

        invoked = true

        let err = code == 0 ? null : new Error('exit code ' + code)

        callback(err)
    })
}

function generateRandomName(length = 10) {
    logExec('program.generateRandomName')

    let text = ''
    let possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'

    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

    info('generateRandomName', 'result:', gray(text))

    return text
}

exports.checkTempDir = () => {
    logExec('program.checkTempDir')

    if (!fs.existsSync(path.join(__dirname, tempDir))) {
        fs.mkdirSync(path.join(__dirname, tempDir))
    }
}
