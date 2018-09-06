const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('Folder', function () {

    this.timeout(5000);
    let client, createdFolderId, firstFolderInList;

    before(() => {
        client = new ET_Client({clientId, clientSecret, origin, authOrigin});
    });

    describe('List', () => {
        it('should return an object with items', done => {
            const props = ['ID', 'Name'];
            client.folder({props}).list((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert(Array.isArray(response.body.Results));
                firstFolderInList = response.body.Results[0].ID;
                done();
            });
        });
    });

    describe('Post', () => {
        it('should create', done => {
            const props = {
                CustomerKey: 'CustomerKey124',
                Name: 'Some folder name124',
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
        it('should fail if no props passed', done => {
            client.folder().get(err => {
                assert(err);
                done();
            });
        });
        it('should get it if createdFolderId is passed', done => {
            const filter = {
                leftOperand: 'ID',
                operator: 'equals',
                rightOperand: createdFolderId
            };
            client.folder({props, options: {filter}}).get((err, response) => {
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
            client.folder({props, options: {filter}}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.body.Results.length, 0);
                done();
            });
        });
    });

    describe('Delete', () => {
        it('should fail if no props passed', done => {
            client.folder().delete(err => {
                assert(err);
                done();
            });
        });
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