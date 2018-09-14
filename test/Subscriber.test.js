const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('Subscriber', function () {

    this.timeout(5000);
    let client, createdSubscriberId;

    before(() => {
        client = new ET_Client(clientId, clientSecret, origin, authOrigin);
    });

    describe('List', () => {
        it('should return an object with items', done => {
            const props = ['ID'];
            client.subscriber({props}).list((err, response) => {
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
                SubscriberKey: 'SubscriberKey',
                EmailAddress: 'sdk-node-test@gmail.com'
            };
            client.subscriber({props}).post((err, response) => {
                if (err) throw new Error(err);
                createdSubscriberId = response.body.Results[0].NewID;
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
            client.subscriber().get(err => {
                assert(err);
                done();
            });
        });
        it('should get it if createdSubscriberId is passed', done => {
            const filter = {
                leftOperand: 'ID',
                operator: 'equals',
                rightOperand: createdSubscriberId
            };
            client.subscriber({props, options: {filter}}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(response.body.Results.length, 1);
                assert.equal(response.body.Results[0].ID, createdSubscriberId);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            const filter = {
                leftOperand: 'ID',
                operator: 'equals',
                rightOperand: 1234567890
            };
            client.subscriber({props, options: {filter}}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.body.Results.length, 0);
                done();
            });
        });
    });

    describe('Delete', () => {
        it('should fail if no props passed', done => {
            client.subscriber().delete(err => {
                assert(err);
                done();
            });
        });
        it('should delete it if createdSubscriberId is passed', done => {
            const props = {ID: createdSubscriberId};
            client.subscriber({props}).delete((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            client.subscriber({ID: 1234567890}).delete(err => {
                assert(err);
                done();
            });
        });
    });

});