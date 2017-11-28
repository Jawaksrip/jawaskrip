/**
 * @author indmind <mail.indmind@gmail.com>
 * @file deklarasi variabel
 * @version 0.0.3
 */

const constant = {
    T_END: -1,
    T_PLUS: 0, // +
    T_MINUS: 1, // -
    T_TIMES: 2, // *
    T_DIVIDE: 3, // /
    T_MOD: 4,
    T_LESS: 5, // <
    T_GREATER: 6, // >
    T_ASSIGN: 7,
    T_SCOLON: 8, // ;
    T_LPAREN: 9, // (
    T_RPAREN: 10, // )
    T_LBRACE: 11, // {
    T_RBRACE: 12, // }
    T_IS: 13, // ==
    T_IF: 14, 
    T_ELSE: 15,
    
    T_TRUE: 16,
    T_FALSE: 17,
    T_AND: 18, // &&
    T_OR: 19, // ||
    T_NOT: 20, // !
    
    T_FUNCTION:21,
    T_VAR: 22,
    T_WORD: 23,
    T_NUM: 24,
    T_QUOTE: 25, // String

    T_PRINT: 26, // console.log
    T_WHILE: 27,
    T_FOR: 28,
    T_INPUT: 29,

    ERROR_CODE: {
        
    }
};

module.exports = {
    constant: constant
};