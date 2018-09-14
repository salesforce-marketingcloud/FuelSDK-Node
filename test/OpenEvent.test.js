const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('OpenEvent', function () {

    this.timeout(5000);
    let client;

    before(() => {
        client = new ET_Client(clientId, clientSecret, origin, authOrigin);
    });

    describe('Get', () => {
        it('should return an object with items', done => {
            const props = ['ID'];
            client.openEvent({props}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert(Array.isArray(response.body.Results));
                done();
            });
        });
    });

});