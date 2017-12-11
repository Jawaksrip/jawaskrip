/**
 * @author indmind <mail.indmind@gmail.com>
 * @file deklarasi variabel
 * @version 0.0.2
 */

const constant = {
    T_END: -1,
    T_PLUS: "+", // +
    T_MINUS: "-", // -
    T_TIMES: "*", // *
    T_DIVIDE: "/", // /
    T_MOD: "%", // %
    T_LESS: "<", // <
    T_GREATER: ">", // >
    T_ASSIGN: "=",
    T_SCOLON: ";", // ;
    T_LPAREN: "(", // (
    T_RPAREN: ")", // )
    T_LBRACE: "{", // {
    T_RBRACE: "}", // }
    T_IS: "==", // ==
    T_IF: "if",
    T_ELSE: "else if",

    T_TRUE: "true",
    T_FALSE: "false",
    T_AND: "&&", // &&
    T_OR: "||", // ||
    T_NOT: "!=", // !

    T_FUNCTION: "function",
    T_VAR: "var",
    T_WORD: "variable",
    T_NUM: "number",
    T_QUOTE: "string", // String

    T_PRINT: "console.log", // console.log
    T_WHILE: "while",
    T_FOR: "for",
    T_INPUT: 55,

    ERROR_CODE: {

    }
};

module.exports = {
    constant: constant
};
