/**
 * @author indmind <mail.indmind@gmail.com>
 * @file deklarasi variabel
 * @version 0.0.1
 */

const constant = {
    T_END: -1,
    T_PLUS: 0, // +
    T_MINUS: 1, // -
    T_TIMES: 2, // *
    T_DIVIDE: 3, // /
    T_LESS: 4, // <
    T_GREATER: 5, // >
    T_SCOLON: 6, // ;
    T_LPAREN: 10, // (
    T_RPAREN: 11, // )
    T_LBRACE: 12, // {
    T_RBRACE: 13, // }
    T_IS: 20, // ==
    T_IF: 21, 
    T_ELSE: 22,
    
    T_TRUE: 30,
    T_FALSE: 31,
    T_AND: 32, // &&
    T_OR: 33, // ||
    T_NOT: 34, // !
    
    T_WORD: 40,
    T_NUM: 41,
    T_QUOTE: 42, // String
    
    T_MAKE: 50, // var
    T_QUESTION: 51,
    T_PRINT: 52, // console.log
    T_WHILE: 53,
    T_FOR: 54,
    T_INPUT: 55,
    
    T_MOD: 56, // %

    ERROR_CODE: {
        
    }
};

module.exports = {
    constant: constant
};