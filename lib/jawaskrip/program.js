/**
 * @author indmind <mail.indmind@gmail.com>
 * @file proses compiling
 * @version 0.0.2
 */

const tokenizer = require("./tokenizer");
const parser = require("./parser");
const fs = require("fs");
const childProcess = require('child_process');

exports.compile = _filepath => {
    global.userFilePath = _filepath;
    const token = tokenizer.lex(_filepath);
    const parsed = parser.parse(token);
    return parsed;
};

exports.run = parsed => {
    const tempFile = __dirname + "/../../temp/" + generateName();
    fs.writeFile(tempFile, parsed, (err) => {
        if(err) throw err;
        runScript(tempFile, code => {
            if(code) throw code;
            fs.unlink(tempFile, _err => {
                if(_err) throw _err;
            });
        });
    });
};

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