const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('TriggeredSend', function () {

    this.timeout(10000);
    let client, createdTriggeredSendId, createdEmailId;

    before(done => {
        client = new ET_Client(clientId, clientSecret, origin, authOrigin);
        client.email({props: {CustomerKey: 'CK', Name: 'Nm', Subject: 'Sj', HTMLBody: 'HB'}}).post((err, response) => {
            if (err) throw new Error(err);
            createdEmailId = response.body.Results[0].NewID;
            done();
        });
    });

    describe('List', () => {
        it('should return an object with items', done => {
            const props = ['ObjectID'];
            client.triggeredSend({props}).list((err, response) => {
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
                Name: 'Some triggered send name',
                Description: 'Some triggered send description',
                Email: {ID: createdEmailId},
                SendClassification: {CustomerKey: 'Default Transactional'}
            };
            client.triggeredSend({props}).post((err, response) => {
                if (err) throw new Error(err);
                createdTriggeredSendId = response.body.Results[0].NewObjectID;
                const {Name, Description} = response.body.Results[0].Object;
                assert.equal(response.res.statusCode, 200);
                assert.equal(Name, props.Name);
                assert.equal(Description, props.Description);
                done();
            });
        });

    });

    describe('Get', () => {
        const props = ['ObjectID'];
        it('should fail if no props passed', done => {
            client.triggeredSend().get(err => {
                assert(err);
                done();
            });
        });
        it('should get it if createdTriggeredSendId is passed', done => {
            const filter = {
                leftOperand: 'ObjectID',
                operator: 'equals',
                rightOperand: createdTriggeredSendId
            };
            client.triggeredSend({props, options: {filter}}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(response.body.Results.length, 1);
                assert.equal(response.body.Results[0].ObjectID, createdTriggeredSendId);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            const filter = {
                leftOperand: 'ObjectID',
                operator: 'equals',
                rightOperand: 1234567890
            };
            client.triggeredSend({props, options: {filter}}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.body.Results.length, 0);
                done();
            });
        });
    });

    describe('Delete', () => {
        it('should fail if no props passed', done => {
            client.triggeredSend().delete(err => {
                assert(err);
                done();
            });
        });
        it('should delete it if createdTriggeredSendId is passed', done => {
            const props = {ObjectID: createdTriggeredSendId};
            client.triggeredSend({props}).delete((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            client.triggeredSend({ObjectID: 1234567890}).delete(err => {
                assert(err);
                done();
            });
        });
    });

    after(done => {
        client.email({props: {ID: createdEmailId}}).delete(err => {
            if (err) throw new Error(err);
            done();
        });
    });

});