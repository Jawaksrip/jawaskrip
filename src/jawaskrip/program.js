/**
 * @author indmind <mail.indmind@gmail.com>
 * @file proses compiling
 * @version 0.0.2
 */

const compiler = require("./compiler");
const parser = require("./parser");
const fs = require("fs");
const childProcess = require('child_process');
const path = require("path");
const ncp = require("ncp").ncp;
const beautify = require('js-beautify').js_beautify;

const tempDir = "/../../temp/";

exports.compile = (_filepath, _callback) => {
    compiler.lex(_filepath, _token => {
        parser.parse(_token, compiled => {
            _callback(compiled);
        });
    });
};

exports.token = (_filepath, _callback) => {
    compiler.lex(_filepath, (_token) => {
        _callback(_token);
    });
};

exports.clean = _callback => {
    let fileRemoved = 0;
    fs.readdir(path.join(__dirname, tempDir), (err, files) => {
        if(err) throw err;
        if(files.length <= 0) _callback("No file on temp directory");
        files.forEach((_file) => {
        if(_file == "temp") return;
            fs.unlink(path.join(__dirname, tempDir, _file), _err => {
                if(_err) throw _err;
                fileRemoved++;
            });
            if(fileRemoved == files.length) _callback("All file cleaned");
        });
    });
};

exports.run = (parsed, callback) => {
    const tempFile = path.join(__dirname, tempDir, generateName());
    fs.writeFile(tempFile, beautify(parsed, {indent_size: 4}), (err) => {
        if(err) throw err;
        runScript(tempFile, code => {
            try{
                if(code) throw code;
            }finally{
                this.clean();
                callback();
            }
        });
    });
};

exports.runLocal = (compiled, callback) => {
    const compiledPath = global.userFilePath + ".compiled.js";
    fs.writeFile(compiledPath,
        beautify(compiled, {indent_size: 4}),
        err => {
            if(err) throw err;
            runScript(compiledPath, errCode => {
                try{
                    if(errCode) throw errCode;
                }finally{
                    fs.unlink(compiledPath , _err => {
                        if(_err) throw _err;
                        callback();
                    });
                }
            });
        }
    );
}

exports.copyExample = (out, callback) => {
    const exampleFolder = path.join(__dirname, "../../example/");
    ncp(exampleFolder, out, callback);
}
function runScript(_scriptPath, _callback){
    let invoked = false;
    let process = childProcess.fork(_scriptPath);

    process.on('exit', code => {
        if(invoked) return;
        invoked = true;
        let err = code == 0 ? null : new Error("exit code " + code);
        _callback(err);
    });
}

function generateName(_length = 10){
    let text = '';
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for(let i = 0;i < _length;i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
