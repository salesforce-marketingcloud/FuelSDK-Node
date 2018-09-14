const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('Email', function () {

    this.timeout(5000);
    let client, createdEmailId;

    before(() => {
        client = new ET_Client(clientId, clientSecret, origin, authOrigin);
    });

    describe('List', () => {
        it('should return an object with items', done => {
            const props = ['ID'];
            client.email({props}).list((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert(Array.isArray(response.body.Results));
                done();
            });
        });
    });

    describe('Post', () => {
        it('should create', done => {
            const props = {
                CustomerKey: 'CustomerKey',
                Name: 'Some email name',
                Subject: 'Some email subject',
                HTMLBody: 'Some email content'
            };
            client.email({props}).post((err, response) => {
                if (err) throw new Error(err);
                createdEmailId = response.body.Results[0].NewID;
                const {CustomerKey, Name, Subject, HTMLBody} = response.body.Results[0].Object;
                assert.equal(response.res.statusCode, 200);
                assert.equal(CustomerKey, props.CustomerKey);
                assert.equal(Name, props.Name);
                assert.equal(Subject, props.Subject);
                assert.equal(HTMLBody, props.HTMLBody);
                done();
            });
        });
    });

    describe('Get', () => {
        const props = ['ID'];
        it('should fail if no props passed', done => {
            client.email().get(err => {
                assert(err);
                done();
            });
        });
        it('should get it if createdEmailId is passed', done => {
            const filter = {
                leftOperand: 'ID',
                operator: 'equals',
                rightOperand: createdEmailId
            };
            client.email({props, options: {filter}}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(response.body.Results.length, 1);
                assert.equal(response.body.Results[0].ID, createdEmailId);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            const filter = {
                leftOperand: 'ID',
                operator: 'equals',
                rightOperand: 1234567890
            };
            client.email({props, options: {filter}}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.body.Results.length, 0);
                done();
            });
        });
    });

    describe('Delete', () => {
        it('should fail if no props passed', done => {
            client.email().delete(err => {
                assert(err);
                done();
            });
        });
        it('should delete it if createdEmailId is passed', done => {
            const props = {ID: createdEmailId};
            client.email({props}).delete((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            client.email({ID: 1234567890}).delete(err => {
                assert(err);
                done();
            });
        });
    });

});