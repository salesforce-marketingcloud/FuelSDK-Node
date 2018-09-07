const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('Campaign', function () {

    this.timeout(5000);
    let client, createdCampaignId;

    before(() => {
        client = new ET_Client({clientId, clientSecret, origin, authOrigin});
    });

    describe('List', () => {
        it('should return an object with items', async () => {
            const {items} = await client.campaign.list();
            assert(Array.isArray(items));
        });
    });

    describe('Create', () => {
        const data = {
            name: 'Some test campaign name',
            description: 'Campaign description'
        };
        it('should fail if no props passed', async () => {
            await assert.rejects(() => client.campaign.create());
        });
        it('should create', async () => {
            const body = await client.campaign.create(data);
            assert.equal(body.name, data.name);
            assert.equal(body.description, data.description);
            createdCampaignId = body.id;
        });
    });

    describe('Get', () => {
        it('should fail if no props passed', async () => {
            await assert.rejects(() => client.campaign.get());
        });
        it('should error 404 if random id is passed', async () => {
            await assert.rejects(() => client.campaign.get(1234567890));
        });
        it('should get it if createdCampaignId is passed', async () => {
            const body = await client.campaign.get(createdCampaignId);
            assert.equal(body.id, createdCampaignId);
        });
    });

    describe('Update', () => {
        const newData = {
            name: 'Modified campaign name',
            description: 'Modified campaign description'
        };
        it('should fail if no props passed', async () => {
            await assert.rejects(() => client.campaign.update());
        });
        it('should error 404 if random id is passed', async () => {
            await assert.rejects(() => client.campaign.update(1234567890, newData));
        });
        it('should update it if createdCampaignId is passed', async () => {
            const body = await client.campaign.update(createdCampaignId, newData);
            assert.equal(body.name, newData.name);
            assert.equal(body.description, newData.description);
        });
    });

    describe('Delete', () => {
        it('should fail if no props passed', async () => {
            await assert.rejects(() => client.campaign.delete());
        });
        it('should error 404 if random id is passed', async () => {
            await assert.rejects(() => client.campaign.delete(1234567890));
        });
        it('should delete it if createdCampaignId is passed', async () => {
            await assert.doesNotReject(() => client.campaign.delete(createdCampaignId));
        });
    });

});