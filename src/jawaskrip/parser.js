/**
 * @author indmind <mail.indmind@gmail.com>
 * @file parsing process
 * @version 0.0.2
 * 
 */

// const {constant} = require("./variable");

// class Parser{
//     constructor(_token){
//         this.tokens = _token;
//         this.token_handler = {
//             T_WORD: this.handle_word,
//             T_MAKE: this.handle_make,
//             T_LBRACE: this.handle_brace,
//             T_LPAREN: this.handle_paren,
//             T_IF: this.handle_if,
//             T_MOD: this.handle_mod,
//             T_FOR: this.handle_for,
//             T_WHILE: this.handle_while,
//             T_PRINT: this.handle_print,
//             T_TRUE: this.handle_true,
//             T_FALSE: this.handle_false,
//             T_NOT: this.handle_not,
//             T_QUOTE: this.handle_quote,
//             T_NUM: this.handle_num
//         };
//     }

//     parse(){
//         this.tokens.forEach((token) => {
//             console.log(token.type);
//         });
//     }

//     getValueFromWord(_tokens){
//         const token = this.consume(_tokens, constant.T_WORD);
//         console.log(token);
//     }

//     peek(_tokens){
//         return _tokens[0].type;
//     }

//     onLine(_tokens){
//         return _tokens[0].line;
//     }

//     consume(_tokens, _t_type){
//         if(this.peek(_tokens) == _t_type) return _tokens.pop();
//         else console.log(`gagal consume ${_t_type}, mendapat ${this.peek(_tokens)} di baris ${this.onLine(_tokens)}`);
//     }

//     getParsed(){
//         return this.getValueFromWord(this.tokens);
//     }
// }
const beautify = require('js-beautify').js_beautify;

let addition = {};

exports.parse = (_tokens, _callback) => {

    const token_handler = {
        ULANGI: ulangi_handler,
        SETIAP: setiap_handler
    };

    let resultJS = ``;
    let keyProcessed = 0;
    _tokens.forEach(_token => {
        // cek jika ada fungsi untuk handel token
        if(Object.keys(token_handler).includes(_token.type)){
            resultJS += token_handler[_token.type](_token);
        }else{
            resultJS += _token.value + " ";
        }
        keyProcessed++;
        if(keyProcessed == _tokens.length){
            let allResult = "";
            let allProcessed = 0;
            if(Object.keys(addition).length <= 0) _callback(resultJS);
            Object.keys(addition).forEach(a => {
                allResult += addition[a];
                allProcessed++;
                if(allProcessed == Object.keys(addition).length)
                    _callback(allResult + resultJS);
            });
        }
    });
};

// addition string

const range = `function range(len){
    return [...Array(len).keys()];
}`;

// handler untuk fungsi kustom

/**
 * transform ulangi menjadi for loop
 * @param {Object} token 
 * jika input ulangi(var i sebanyak 10 kali);
 * result harus for(var i in range(10));
 * dan sudah terdapat fungsi range();
 */
function ulangi_handler(token){
    let valArr = beautify(token.value, {indent_level:4}).split(" ");
    if(valArr.length < 5){
        triggerError("Syntax 'ulangi' error", token.line);
        process.exit();
    }

    // cek jika ada addition function range
    if(addition.range == undefined) addition.range = range;

    var parsedJS = `for(${valArr[0].split('(')[1]} ${valArr[1]} in range(${valArr[3]}))`;
    return parsedJS;

}


/**
 * transform setiap menjadi forEach
 * @param {Object} token 
 */
function setiap_handler(token){
    let val = beautify(token.value, {indent_level:4}).split(" ");
    return parsedJS = `for(var ${val[2].slice(0, -1)} of ${val[0].split("(")[1]})`;
}

function createAddition(id, data){
    return {id: id, data: data};
}

function triggerError(mess, line){
    throw `Error pada baris ${line}: "${mess}"`;
}


// exec function by name
/**
 * @tutorial https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
 */
function executeFunctionByName(functionName, context /*, args */) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}