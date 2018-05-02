const fs = require('fs')
const childProcess = require('child_process')
const path = require('path')
const ncp = require('ncp').ncp
const beautify = require('js-beautify').js_beautify

const tokenizer = require('./tokenizer')
const transformer = require('./transformer')

const tempDir = '/../../temp/'

exports.compile = (_filepath, _callback) => {
    tokenizer.lex(_filepath, _token => {
        transformer.parse(_token, compiled => {
            _callback(beautify(compiled), {
                end_with_newline: true
            })
        })
    })
}

exports.token = (_filepath, _callback) => {
    tokenizer.lex(_filepath, _token => {
        _callback(_token)
    })
}

exports.clean = _callback => {
    checkTempDir()

    const tempPath = path.join(__dirname, tempDir)
    const files = fs.readdirSync(tempPath)

    if (files.length <= 0) {
        return _callback ? _callback('No file on temp directory') : null
    }

    let fileRemoved = 0

    for (let file of files) {
        const fileLocation = path.join(tempPath, file)
        if (fs.existsSync(fileLocation)) fs.unlinkSync(fileLocation)
    }

    return _callback ? _callback('All file cleaned') : null
}

exports.run = parsed => {
    checkTempDir()
    const tempFile = path.join(__dirname, tempDir, generateName())

    fs.writeFileSync(tempFile, parsed)

    runScript(tempFile, this.clean)
}

exports.runLocal = (compiled, original) => {
    const compiledPath = this.getCompiledPath()

    fs.writeFileSync(compiledPath, compiled)

    runScript(compiledPath, () => this.recover(compiledPath, original))
}

exports.getCompiledPath = () => {
    return global.userFilePath.replace(path.extname(global.userFilePath), '.js')
}

exports.recover = (compiledPath, original) => {
    if (compiledPath === global.userFilePath) {
        fs.writeFileSync(global.userFilePath, original)
    } else {
        if (fs.existsSync(compiledPath)) fs.unlinkSync(compiledPath)
    }
}

exports.copyExample = (out, callback) => {
    const exampleFolder = path.join(__dirname, '../../example/')
    ncp(exampleFolder, out, callback)
}

function runScript(_scriptPath, _callback) {
    let invoked = false
    let process = childProcess.fork(_scriptPath)

    process.on('exit', code => {
        if (invoked) return

        invoked = true

        let err = code == 0 ? null : new Error('exit code ' + code)

        _callback(err)
    })
}

function generateName(_length = 10) {
    let text = ''
    let possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'

    for (let i = 0; i < _length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
}

function checkTempDir() {
    if (!fs.existsSync(path.join(__dirname, tempDir))) {
        fs.mkdirSync(path.join(__dirname, tempDir))
    }
}
