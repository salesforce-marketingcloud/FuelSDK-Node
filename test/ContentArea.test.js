const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin, soapOrigin, authOptions, globalReqOptions} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('ContentArea', function () {

    this.timeout(10000);
    let client, createdContentAreaId;

    before(() => {
        client = new ET_Client(clientId, clientSecret, null, {origin, authOrigin, soapOrigin, authOptions, globalReqOptions});
    });

    describe('Post', () => {
        it('should create', done => {
            const props = {
                CustomerKey: 'CustomerKey12',
                Name: 'Some content area name12',
                Content: 'Some content area description'
            };
            client.contentArea({props}).post((err, response) => {
                if (err) throw new Error(err);
                createdContentAreaId = response.body.Results[0].NewID;
                const {CustomerKey, Name, Content} = response.body.Results[0].Object;
                assert.equal(response.res.statusCode, 200);
                assert.equal(CustomerKey, props.CustomerKey);
                assert.equal(Name, props.Name);
                assert.equal(Content, props.Content);
                done();
            });
        });
    });

    describe('Get', () => {
        const props = ['ID'];
        it('should get it if createdContentAreaId is passed', done => {
            const filter = {
                leftOperand: 'ID',
                operator: 'equals',
                rightOperand: createdContentAreaId
            };
            client.contentArea({props, filter}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(response.body.Results.length, 1);
                assert.equal(response.body.Results[0].ID, createdContentAreaId);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            const filter = {
                leftOperand: 'ID',
                operator: 'equals',
                rightOperand: 1234567890
            };
            client.contentArea({props, filter}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.body.Results.length, 0);
                done();
            });
        });
    });

    describe('Delete', () => {
        it('should delete it if createdContentAreaId is passed', done => {
            const props = {ID: createdContentAreaId};
            client.contentArea({props}).delete((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            client.contentArea({ID: 1234567890}).delete(err => {
                assert(err);
                done();
            });
        });
    });

});