const utils = require('../src/jawaskrip/utils')
const chalk = require('chalk')

describe('utils test', () => {
    it('should also import chalk', () => {
        expect(utils.chalk).toEqual(chalk)
    })

    it('should have `info` function', () => {
        expect(utils.info).toBeDefined()
    })

    it('should have `logExec` function', () => {
        expect(utils.logExec).toBeDefined()
    })

    it('should log info and exec', () => {
        global.verbose = true
        utils.logExec('utils.test.log')
        utils.info('testing', 'utils test', 'params')
    })
})
