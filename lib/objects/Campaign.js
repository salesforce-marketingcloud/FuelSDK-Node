const {MissingArgumentError}  = require('../errors');
const {validateData}  = require('../helpers');


const Campaign = function (restClient) {
    this.restClient = restClient;
};

Campaign.prototype.list = async function (params) {
    const uri = `/hub/v1/campaigns`;
    const response = await this.restClient.get({uri, params});
    return response.body;
};

Campaign.prototype.create = async function (data) {
    const docUrl = 'https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/campaign-create.htm';
    if (!data) {
        throw new MissingArgumentError('data', docUrl);
    }
    _validateCreateUpdateData(data);
    const uri = `/hub/v1/campaigns`;
    const response = await this.restClient.post({uri, data});
    if (!response.body.id) return Promise.reject(response.body.validationErrors[0].message);
    return response.body;
};

Campaign.prototype.get = async function (id) {
    const docUrl = 'https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/campaign-retrieve.htm';
    if (!id) {
        throw new MissingArgumentError('id', docUrl);
    }
    let uri = `/hub/v1/campaigns/${id}`;
    const response = await this.restClient.get({uri});
    return response.body;
};

Campaign.prototype.update = async function (id, data) {
    const docUrl = 'https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/campaign-update.htm';
    if (!id) {
        throw new MissingArgumentError('id', docUrl);
    }
    _validateCreateUpdateData(data);
    const uri = `/hub/v1/campaigns/${id}`;
    const response = await this.restClient.post({uri, data});
    return response.body;
};

Campaign.prototype.delete = async function (id) {
    const docUrl = 'https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/campaign-delete.htm';
    if (!id) {
        throw new MissingArgumentError('id', docUrl);
    }
    const uri = `/hub/v1/campaigns/${id}`;
    await this.restClient.delete({uri});
};

function _validateCreateUpdateData(data) {
    validateData(data, {
        name: false,
        description: false,
        campaignCode: false,
        color: false,
        favorite: false
    });
}


module.exports = Campaign;