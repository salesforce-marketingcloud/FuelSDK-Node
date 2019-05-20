const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin, soapOrigin, authOptions, globalReqOptions} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('List', function () {

    this.timeout(10000);
    let client, createdListId;

    before(() => {
        client = new ET_Client(clientId, clientSecret, null, {origin, authOrigin, soapOrigin, authOptions, globalReqOptions});
    });

    describe('Post', () => {
        it('should create', done => {
            const props = {
                ListName: 'Some list name',
                Description: 'Some list description'
            };
            client.list({props}).post((err, response) => {
                if (err) throw new Error(err);
                createdListId = response.body.Results[0].NewID;
                const {ListName, Description} = response.body.Results[0].Object;
                assert.equal(response.res.statusCode, 200);
                assert.equal(ListName, props.ListName);
                assert.equal(Description, props.Description);
                done();
            });
        });
    });

    describe('Get', () => {
        const props = ['ID'];
        it('should get it if createdListId is passed', done => {
            const filter = {
                leftOperand: 'ID',
                operator: 'equals',
                rightOperand: createdListId
            };
            client.list({props, filter}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(response.body.Results.length, 1);
                assert.equal(response.body.Results[0].ID, createdListId);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            const filter = {
                leftOperand: 'ID',
                operator: 'equals',
                rightOperand: 1234567890
            };
            client.list({props, filter}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.body.Results.length, 0);
                done();
            });
        });
    });

    describe('Delete', () => {
        it('should delete it if createdListId is passed', done => {
            const props = {ID: createdListId};
            client.list({props}).delete((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            client.list({ID: 1234567890}).delete(err => {
                assert(err);
                done();
            });
        });
    });

});