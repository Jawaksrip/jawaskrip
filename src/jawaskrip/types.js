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

    T_FUNCTION: 21,
    T_VAR: 22,
    T_WORD: 23,
    T_NUM: 24,
    T_QUOTE: 25, // String

    T_PRINT: 26, // console.log
    T_WHILE: 27,
    T_FOR: 28,
    T_INPUT: 29,
    T_ASSIGNMENT: 30,
    T_PFIX: 31,
    T_ARITHMATIC: 32,
    T_VARNAME: 33,
    T_DOT: 34,
    T_COMMA: 35,
    T_COLON: 36,
    T_NEW: 39,
    T_THIS: 40,
    T_RETURN: 41,
    T_UNKNOWN: 42,
    T_CLASS: 43,
    T_CONSTRUCT: 44,
    T_EXTENDS: 45,
    T_COMMENT: 46,
    T_GTOQ: 47,
    T_LTOQ: 48,
    T_ARROW: 49,
    T_NEWLINE: 50,
    T_NUMBER: 51,
    T_STRING: 52,
    T_DO: 53,
    T_EQUAL: 54,
    T_BREAK: 55,
    T_CONTINUE: 56
}

const symbol = {
    END: -1,
    PLUS: '+', // +
    MINUS: '-', // -
    TIMES: '*', // *
    DIVIDE: '/', // /
    MOD: '%', // %
    LESS: '<', // <
    GREATER: '>', // >
    ASSIGN: '=',
    SCOLON: ';', // ;
    LPAREN: '(', // (
    RPAREN: ')', // )
    LBRACE: '{', // {
    RBRACE: '}', // }
    COMMENT: '//',
    EQUAL: '==',
    IS: '===', // ==
    AND: '&&', // &&
    OR: '||', // ||
    NOT: '!=' // !
}

const keyword = {
    IF: 'if',
    ELSE: 'else if',

    TRUE: 'true',
    FALSE: 'false',

    FUNCTION: 'function',
    NEW: 'new',
    RETURN: 'return',
    THIS: 'this',
    VAR: 'var',
    WORD: 'variable',
    NUM: 'number',

    PRINT: 'console.log', // console.log
    WHILE: 'while',
    FOR: 'for',
    CLASS: 'class',
    EXTENDS: 'extends',
    CONSTRUCT: 'constructor',
    INPUT: 'readlineSync.question',
    NUMBER: 'Number',
    STRING: 'String',
    DO: 'do',

    BREAK: 'break',
    CONTINUE: 'continue'
}

const handler = ['ulangi', 'setiap']

module.exports = {
    constant,
    symbol,
    handler,
    keyword
}
