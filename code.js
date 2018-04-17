const jw = require('./program/main')

jw.compile('var j %= i;var d *= b;var n -= u;var z += y;').then(console.log)
