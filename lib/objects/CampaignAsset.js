/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/campaign-asset-create.htm
*/

const CampaignAsset = function (parent, options = {}) {
    this.parent = parent;
    this.endpoint = `${this.parent.restClient.origin}/hub/v1/campaigns/{id}/assets`;
    this.options = options;
    this.options.props = this.options.props || {};
};

CampaignAsset.prototype.list = function (cb) {

    const uri = this.endpoint.replace('{id}', this.options.props.id);
    this.parent.restClient
        .get({uri})
        .then(function (response) {
            cb(null, response);
        })
        .catch(function (err) {
            cb(err, null);
        });

};

CampaignAsset.prototype.post = function (cb) {

    const {id, ids, type} = this.options.props;
    const uri = this.endpoint.replace('{id}', id);
    const body = JSON.stringify({ids, type});

    this.parent.restClient
        .post({uri, body})
        .then(function (response) {
            cb(null, response);
        })
        .catch(function (err) {
            cb(err, null);
        });

};

CampaignAsset.prototype.get = function (cb) {

    let uri = this.endpoint.replace('{id}', this.options.props.id);
    uri += '/' + this.options.props.campaignAssetId;

    this.parent.restClient
        .get({uri})
        .then(function (response) {
            cb(null, response);
        })
        .catch(function (err) {
            cb(err, null);
        });

};

CampaignAsset.prototype.delete = function (cb) {

    if (!this.options.props.id || !this.options.props.assetId) {
        return cb({
            error: 'Campaign and Asset IDs are required for asset deletion.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/campaign-assets/campaign-asset-delete.html'
        });
    }

    const uri = this.endpoint.replace('{id}', this.options.props.id) + '/' + this.options.props.assetId;
    this.parent.restClient
        .delete({uri})
        .then(function (response) {
            cb(null, response);
        })
        .catch(function (err) {
            cb(err, null);
        });
};


module.exports = CampaignAsset;