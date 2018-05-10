const constant = {
    END: -1,
    PLUS: 0, // +
    MINUS: 1, // -
    TIMES: 2, // *
    DIVIDE: 3, // /
    MOD: 4,
    LESS: 5, // <
    GREATER: 6, // >
    ASSIGN: 7,
    SCOLON: 8, // ;
    LPAREN: 9, // (
    RPAREN: 10, // )
    LBRACE: 11, // {
    RBRACE: 12, // }
    IS: 13, // ==
    IF: 14,
    ELSE: 15,

    TRUE: 16,
    FALSE: 17,
    AND: 18, // &&
    OR: 19, // ||
    NOT: 20, // !

    FUNCTION: 21,
    VAR: 22,
    WORD: 23,
    NUM: 24,
    QUOTE: 25, // String

    PRINT: 26, // console.log
    WHILE: 27,
    FOR: 28,
    INPUT: 29,
    ASSIGNMENT: 30,
    PFIX: 31,
    ARITHMATIC: 32,
    VARNAME: 33,
    DOT: 34,
    COMMA: 35,
    COLON: 36,
    NEW: 39,
    THIS: 40,
    RETURN: 41,
    UNKNOWN: 42,
    CLASS: 43,
    CONSTRUCT: 44,
    EXTENDS: 45,
    COMMENT: 46,
    GTOQ: 47,
    LTOQ: 48,
    ARROW: 49,
    NEWLINE: 50,
    NUMBER: 51,
    STRING: 52,
    DO: 53,
    EQUAL: 54,
    BREAK: 55,
    CONTINUE: 56,
    AWAIT: 57
}

const symbol = {
    END: -1,
    PLUS: '+',
    MINUS: '-',
    TIMES: '*',
    DIVIDE: '/',
    MOD: '%',
    LESS: '<',
    GREATER: '>',
    ASSIGN: '=',
    SCOLON: ';',
    LPAREN: '(',
    RPAREN: ')',
    LBRACE: '{',
    RBRACE: '}',
    COMMENT: '//',
    EQUAL: '==',
    IS: '===',
    AND: '&&',
    OR: '||',
    NOT: '!='
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

    PRINT: 'console.log',
    WHILE: 'while',
    FOR: 'for',
    AWAIT: 'await',
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
