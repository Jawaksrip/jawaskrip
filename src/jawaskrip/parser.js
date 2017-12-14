/**
 * @author indmind <mail.indmind@gmail.com>
 * @file parsing process
 * @version 0.0.2
 *
 */

const beautify = require('js-beautify').js_beautify;
const {
    constant
} = require("./var");

let addition = {};

exports.parse = (_tokens, _callback) => {

    const token_handler = {
        ULANGI: ulangi_handler,
        SETIAP: setiap_handler,
        IMPOR: impor_handler,
    };
    token_handler[constant.T_INPUT] = masukan_handler;

    let resultJS = ``;
    let keyProcessed = 0;
    _tokens.forEach(_token => {
        // cek jika ada fungsi untuk handel token
        if (Object.keys(token_handler).includes(_token.type.toString())) {
            resultJS += token_handler[_token.type](_token);
        } else {
            resultJS += _token.value + " ";
        }
        keyProcessed++;
        if (keyProcessed == _tokens.length) {
            let allResult = "";
            let allProcessed = 0;
            if (Object.keys(addition).length <= 0) _callback(resultJS);
            Object.keys(addition).forEach(a => {
                allResult += addition[a];
                allProcessed++;
                if (allProcessed == Object.keys(addition).length)
                _callback(beautify(allResult + resultJS, {end_with_newline: true, indent_size:4}));
            });
        }
    });
};

// addition string

const RANGE = `function range(len){
    return [...Array(len).keys()];
}`;
const INPUT = `const readlineSync = require('${require.resolve("readline-sync")}');`

// handler untuk fungsi kustom

/**
 * transform ulangi menjadi for loop
 * @param {Object} token
 * jika input ulangi(var i sebanyak 10 kali);
 * result harus for(var i in range(10));
 * dan sudah terdapat fungsi range();
 */
function ulangi_handler(token) {
    let valArr = beautify(token.value, {
        indent_level: 4
    }).split(" ");
    if (valArr.length < 5) {
        triggerError("Syntax 'ulangi' error", token.line);
        process.exit();
    }

    const usrVar = valArr[1];
    var parsedJS = `for(var ${usrVar} = 0; ${usrVar} < ${valArr[3]}; ${usrVar}++)`;
    return parsedJS;
}


/**
 * transform setiap menjadi forEach
 * @param {Object} token
 */
function setiap_handler(token) {
    const val = beautify(token.value, {
        indent_level: 4
    }).split(" ");
    return parsedJS = `for(var ${val[2].slice(0, -1)} of ${val[0].split("(")[1]})`;
}

function masukan_handler(token) {
    addition.input = INPUT;
    return token.value;
}

/**
 * input = impor x from 'y';
 * output = const x = require('y');
 */
function impor_handler(token) {
    const parsedJS = token.value
        .replace("impor", "const")
        .replaceLast("dari", "=");
    let packageName = (parsedJS.match(/'([^']+)'/) || parsedJS.match(/(?:"[^"]*"|^[^"]*$)/))[0];
    return parsedJS.replaceLast(packageName, `require(${packageName})`);
}

function createAddition(id, data) {
    return {
        id: id,
        data: data
    };
}

function triggerError(mess, line) {
    throw `Error pada baris ${line}: "${mess}"`;
}


// exec function by name
/**
 * @tutorial https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
 */
function executeFunctionByName(functionName, context /*, args */ ) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

function getFirstWord(str) {
    let spacePosition = str.indexOf(' ');
    if (spacePosition === -1)
        return str;
    else
        return str.substr(0, spacePosition);
};

String.prototype.replaceLast = function (what, replacement) {
    return this.split(' ').reverse().join(' ').replace(new RegExp(what), replacement).split(' ').reverse().join(' ');
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
