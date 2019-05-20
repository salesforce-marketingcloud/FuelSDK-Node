const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin, soapOrigin, authOptions, globalReqOptions} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('DataExtensionRow', function () {

    this.timeout(10000);
    const dataExtensionName = 'TestDataExtensionName1';
    const dataExtensionRowKey = 'Some key value';
    let client, createdDataExtensionId;

    before(done => {
        client = new ET_Client(clientId, clientSecret, null, {origin, authOrigin, soapOrigin, authOptions, globalReqOptions});
        const keyField = {Name: 'Key', FieldType: 'Text', IsPrimaryKey: true, IsRequired: true, MaxLength: 100};
        const props = {Name: dataExtensionName, Fields: {Field: [keyField]}};
        client.dataExtension({props}).post((err, response) => {
            if (err) throw new Error(err);
            createdDataExtensionId = response.body.Results[0].NewObjectID;
            done();
        });
    });

    describe('Post', () => {
        it('should create', done => {
            const Name = dataExtensionName;
            const props = {
                Key: dataExtensionRowKey
            };
            client.dataExtensionRow({Name, props}).post((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                done();
            });
        });
    });

    describe('Get', () => {
        const props = ['Key'];
        it('should get it if createdDataExtensionRowId is passed', done => {
            const filter = {
                leftOperand: 'Key',
                operator: 'equals',
                rightOperand: dataExtensionRowKey
            };
            client.dataExtensionRow({props, Name: dataExtensionName, filter}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(response.body.Results.length, 1);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            const filter = {
                leftOperand: 'Key',
                operator: 'equals',
                rightOperand: 'Some other value'
            };
            client.dataExtensionRow({props, Name: dataExtensionName, filter}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.body.Results.length, 0);
                done();
            });
        });
    });

    describe('Delete', () => {
        it('should delete it if createdDataExtensionRowId is passed', done => {
            const props = {
                Key: dataExtensionRowKey
            };
            client.dataExtensionRow({props, Name: dataExtensionName}).delete((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            client.dataExtensionRow({ID: 1234567890}).delete(err => {
                assert(err);
                done();
            });
        });
    });

    after(done => {
        const props = {ObjectID: createdDataExtensionId};
        client.dataExtension({props}).delete(err => {
            if (err) throw new Error(err);
            done();
        });
    })

});