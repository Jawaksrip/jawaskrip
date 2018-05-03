const chalk = require('chalk')

/* eslint-disable no-console*/
exports.info = (parent, text, ...args) => {
    if (global.verbose) {
        console.info(
            `${chalk.green.bold('INFO')}: [${chalk.magenta(
                parent
            )}] ${chalk.blue(text)}`,
            ...args
        )
    }
}

exports.logExec = (...args) => {
    if (global.verbose) {
        console.info(`${chalk.yellow.bold('EXEC')}:`, chalk.green(...args))
    }
}

exports.chalk = chalk
