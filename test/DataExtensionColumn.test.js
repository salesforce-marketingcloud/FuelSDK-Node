const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin, soapOrigin, authOptions, globalReqOptions} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('DataExtensionColumn', function () {

    this.timeout(10000);
    let client;

    before(() => {
        client = new ET_Client(clientId, clientSecret, null, {origin, authOrigin, soapOrigin, authOptions, globalReqOptions});
    });

    describe('Get', () => {
        it('should return an object with items', done => {
            const props = ['ObjectID'];
            client.dataExtensionColumn({props}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert(Array.isArray(response.body.Results));
                done();
            });
        });
    });

});