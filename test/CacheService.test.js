const assert = require('assert');
const CacheService = require('../lib/services/CacheService');


describe('CacheService', function () {

    const url = 'http://www.test.com';

    it('It should work correctly', () => {
        const clientId = new Date().getTime();
        const clientSecret = new Date().getTime();
        const cacheService = new CacheService({clientId, clientSecret});
        return cacheService.get()
            .then(data => { // initial data should not exist
                assert.ok(!data.expires);
                assert.ok(!data.url);
            })
            .then(() => cacheService.write(url))
            .then(() => cacheService.get())
            .then(data => { // getting data from cache should work correctly
                assert.equal(data.url, url);
            })
            .then(() => cacheService.clear())
            .then(() => cacheService.get())
            .then(data => { // clearing data from cache should work correctly
                assert.ok(!data.expires);
                assert.ok(!data.url);
            })
            .then(() => cacheService.clear());
    });

});