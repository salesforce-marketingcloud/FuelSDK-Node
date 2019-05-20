const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin, soapOrigin, authOptions, globalReqOptions} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('CampaignAsset', function () {

    this.timeout(10000);
    let client, createdCampaignId, createdAssetId, createdCampaignAssetId;

    before(done => {
        client = new ET_Client(clientId, clientSecret, null, {origin, authOrigin, soapOrigin, authOptions, globalReqOptions});
        Promise.all([
            createCampaign(client),
            createAsset(client)
        ]).then(([campaignId, assetId]) => {
            createdCampaignId = campaignId;
            createdAssetId = assetId;
        }).catch(err => {
            throw new Error(err);
        }).finally(done);
    });

    describe('Post', () => {
        it('should create', done => {
            const props = {
                id: createdCampaignId,
                ids: [createdAssetId],
                type: 'CMS_ASSET'
            };
            client.campaignAsset({props}).post((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                createdCampaignAssetId = response.body[0].id;
                done();
            });
        });
    });

    describe('Get', () => {
        it('should get it if createdCampaignId is passed', done => {
            const props = {id: createdCampaignId, campaignAssetId: createdCampaignAssetId};
            client.campaignAsset({props}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                console.log(`response.body`, response.body);
                assert.equal(response.body.id, createdCampaignAssetId);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            const props = {id: 1234567890, campaignAssetId: 1234567890};
            client.campaignAsset({props}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 400); // api is wrong
                done();
            });
        });
    });

    describe('Delete', () => {
        it('should delete it if createdCampaignId is passed', done => {
            const props = {id: createdCampaignId, assetId: createdAssetId};
            client.campaignAsset({props}).delete(err => {
                if (err) throw new Error(err);
                assert(!err);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            const props = {id: 1234567890, assetId: 1234567890};
            client.campaignAsset({props}).delete((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 400); // api is wrong
                done();
            });
        });
    });

    after(done => {
        Promise.all([
            deleteCampaign(client, createdCampaignId),
            deleteAsset(client, createdAssetId)
        ]).catch(err => {
            throw new Error(err);
        }).finally(done);
    })

});


// HELPER FUNCTIONS
function createAsset(client) {
    const uri = `${client.RestClient.origin}/asset/v1/content/assets`;
    const uniqueString = new Date().getTime();
    const body = JSON.stringify({name: `NTO Welcome Series Email ${uniqueString}`, assetType: {name: 'templatebasedemail', id: 207}});
    return client.RestClient.post({uri, body}).then(response => {
        if (!response.body.id) return Promise.reject(response.body.validationErrors[0].message);
        return response.body.id;
    });
}

function createCampaign(client) {
    return new Promise((resolve, reject) => {
        client.campaign({props: {name: 'Name', description: 'Description'}}).post((err, response) => {
            if (err) return reject(err);
            if (!response.body.id) return reject(response.body.validationErrors[0].message);
            resolve(response.body.id);
        });
    })
}

function deleteAsset(client, assetId) {
    const uri = `${client.RestClient.origin}/asset/v1/content/assets/${assetId}`;
    return client.RestClient.delete({uri});
}

function deleteCampaign(client, campaignId) {
    return new Promise((resolve, reject) => {
        client.campaign({id: campaignId}).delete(err => {
            if (err) return reject(err);
            resolve();
        });
    })
}