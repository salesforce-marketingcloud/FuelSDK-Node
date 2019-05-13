const assert = require('assert');
const uuidv1 = require('uuid/v1');
const {clientId, clientSecret, origin, authOrigin, soapOrigin, authOptions, globalReqOptions} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('Folder', function () {

    this.timeout(10000);
    let client, createdFolderId, firstFolderInList;

    before(done => {
        client = new ET_Client(clientId, clientSecret, null, {origin, authOrigin, soapOrigin, authOptions, globalReqOptions});
        client.folder({props: ['ID']}).get((err, response) => {
            if (err) throw new Error(err);
            firstFolderInList = response.body.Results[0].ID;
            done();
        });
    });

    describe('Post', () => {
        it('should create', done => {
            const guid = uuidv1();
            const props = {
                CustomerKey: guid,
                Name: 'Some folder ' + guid,
                Description: 'Some folder description',
                ContentType: 'EMAIL',
                ParentFolder: {ID: firstFolderInList}
            };
            client.folder({props}).post((err, response) => {
                if (err) throw new Error(err);
                createdFolderId = response.body.Results[0].NewID;
                assert.equal(response.res.statusCode, 200);
                done();
            });
        });
    });

    describe('Get', () => {
        const props = ['ID'];
        it('should get it if createdFolderId is passed', done => {
            const filter = {
                leftOperand: 'ID',
                operator: 'equals',
                rightOperand: createdFolderId
            };
            client.folder({props, filter}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(response.body.Results.length, 1);
                assert.equal(response.body.Results[0].ID, createdFolderId);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            const filter = {
                leftOperand: 'ID',
                operator: 'equals',
                rightOperand: 1234567890
            };
            client.folder({props, filter}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.body.Results.length, 0);
                done();
            });
        });
    });

    describe('Delete', () => {
        it('should delete it if createdFolderId is passed', done => {
            const props = {ID: createdFolderId};
            client.folder({props}).delete((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            client.folder({ID: 1234567890}).delete(err => {
                assert(err);
                done();
            });
        });
    });

});