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

exports.parse = (_tokens, _callback) => {
    let resultJS = ``;
    _tokens.forEach(_token => {
        resultJS += _token.type + " ";
    });
    _callback(resultJS);
};