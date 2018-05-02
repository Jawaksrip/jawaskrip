const jawaskrip = require('../')

describe('api.test', () => {
    it('should compile', async () => {
        const result = await jawaskrip.compile('tulis("hallo")')
        expect(result).toBe('console.log("hallo")')
    })

    it('should run jawaskrip code', async () => {
        jawaskrip.run('tulis("running from api testing")')
    })
})
