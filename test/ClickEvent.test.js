const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('ClickEvent', function () {

    this.timeout(10000);
    let client;

    before(() => {
        client = new ET_Client(clientId, clientSecret, origin, authOrigin);
    });

    describe('Get', () => {
        it('should return an object with items', done => {
            const props = ['ID'];
            client.clickEvent({props}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert(Array.isArray(response.body.Results));
                done();
            });
        });
    });

});