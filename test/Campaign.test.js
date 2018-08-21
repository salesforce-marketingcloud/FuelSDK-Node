const assert = require('assert');
const {clientId, clientSecret, origin} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('Campaign', function () {

    this.timeout(5000);
    let client, createdCampaignId;

    before(() => {
        client = new ET_Client(clientId, clientSecret, origin);
    });

    describe('List', () => {
        it('should return an object with items', done => {
            client.campaign().list((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(typeof response.body, 'object');
                assert.equal(Array.isArray(response.body.items), true);
                done();
            });
        });
    });

    describe('Post', () => {
        it('should create', done => {
            const props = {
                name: 'Some test campaign name',
                description: 'Campaign description',
            };
            client.campaign({props}).post((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(typeof response.body, 'object');
                assert.equal(response.body.name, props.name);
                assert.equal(response.body.description, props.description);
                createdCampaignId = response.body.id;
                done();
            });
        });
    });

    describe('Get', () => {
        it('should fail if no props passed', done => {
            client.campaign().get(err => {
                assert(!!err);
                done();
            });
        });
        it('should get it if createdCampaignId is passed', done => {
            client.campaign({id: createdCampaignId}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(typeof response.body, 'object');
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            client.campaign({id: 1234567890}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 400); // api is wrong
                done();
            });
        });
    });

    describe('Delete', () => {
        it('should fail if no props passed', done => {
            client.campaign().delete(err => {
                assert(err);
                done();
            });
        });
        it('should delete it if createdCampaignId is passed', done => {
            client.campaign({id: createdCampaignId}).delete(err => {
                if (err) throw new Error(err);
                assert(!err);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            client.campaign({id: 1234567890}).delete((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 400); // api is wrong
                done();
            });
        });
    });

});