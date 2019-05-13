const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin, soapOrigin, authOptions, globalReqOptions} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('ET_Client', function () {

    it('should throw error if no params provided', () => {
        assert.throws(() => {
            new ET_Client();
        })
    });

    it('should not throw error if all params defined', () => {
        assert.doesNotThrow(() => {
            new ET_Client(clientId, clientSecret, null, {origin, authOrigin});
        })
    });

    it('should not throw error if all params defined in old shape', () => {
        assert.doesNotThrow(() => {
            const stack = '';
            new ET_Client(clientId, clientSecret, stack);
        })
    });

});