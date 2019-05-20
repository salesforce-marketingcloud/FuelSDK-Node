const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin, soapOrigin, authOptions, globalReqOptions} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('DataExtension', function () {

    this.timeout(10000);
    let client, createdDataExtensionId;

    before(() => {
        client = new ET_Client(clientId, clientSecret, null, {origin, authOrigin, soapOrigin, authOptions, globalReqOptions});
    });

    describe('Post', () => {
        it('should create', done => {
            const props = {
                Name: 'Some dataExtension name',
                Description: 'Some dataExtension subject',
                Fields: {
                    Field: [
                        {
                            Name: 'Key',
                            FieldType: 'Text',
                            IsPrimaryKey: true,
                            MaxLength: 100,
                            IsRequired: true
                        }
                    ]
                }
            };
            client.dataExtension({props}).post((err, response) => {
                if (err) throw new Error(err);
                createdDataExtensionId = response.body.Results[0].NewObjectID;
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
        it('should get it if createdDataExtensionId is passed', done => {
            const filter = {
                leftOperand: 'ObjectID',
                operator: 'equals',
                rightOperand: createdDataExtensionId
            };
            client.dataExtension({props, filter}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(response.body.Results.length, 1);
                assert.equal(response.body.Results[0].ObjectID, createdDataExtensionId);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            const filter = {
                leftOperand: 'ObjectID',
                operator: 'equals',
                rightOperand: 1234567890
            };
            client.dataExtension({props, filter}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.body.Results.length, 0);
                done();
            });
        });
    });

    describe('Delete', () => {
        it('should delete it if createdDataExtensionId is passed', done => {
            const props = {ObjectID: createdDataExtensionId};
            client.dataExtension({props}).delete((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            client.dataExtension({ObjectID: 1234567890}).delete(err => {
                assert(err);
                done();
            });
        });
    });

});