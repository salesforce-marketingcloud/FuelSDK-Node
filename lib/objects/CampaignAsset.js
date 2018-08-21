/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/campaign-asset-create.htm
*/

const CampaignAsset = function (parent, options) {
    this.parent = parent;
    this.endpoint = `${this.parent.restClient.origin}/hub/v1/campaigns/{id}/assets`;
    this.config = options;
};

CampaignAsset.prototype.list = function (cb) {

    const uri = this.endpoint.replace('{id}', this.config.props.id);
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

    const {id, ids, type} = this.config.props;
    const uri = this.endpoint.replace('{id}', id);
    const body = JSON.stringify({ids, type});

    this.parent.restClient
        .post({uri, body})
        .then(function (response) {
            cb(null, response);
        }.bind(this))
        .catch(function (err) {
            cb(err, null);
        }.bind(this));

};

CampaignAsset.prototype.get = function (cb) {

    let uri = this.endpoint.replace('{id}', this.config.props.id);
    if (this.config.props.assetId) uri += '/' + this.config.props.assetId;
    const options = {
        uri: uri
    };

    this.parent.restClient
        .get(options)
        .then(function (response) {
            cb(null, response);
        }.bind(this))
        .catch(function (err) {
            cb(err, null);
        }.bind(this));

};


CampaignAsset.prototype.delete = function (cb) {

    if (!this.config.props.id || !this.config.props.assetId) {
        cb({
            error: 'Campaign and Asset IDs are required for asset deletion.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/campaign-assets/campaign-asset-delete.html'
        });
    } else {
        const uri = this.endpoint.replace('{id}', this.config.props.id) + '/' + this.config.props.assetId;
        const options = {
            uri
        };

        this.parent.restClient
            .delete(options)
            .then(function (response) {
                cb(null, response);
            }.bind(this))
            .catch(function (err) {
                cb(err, null);
            }.bind(this));
    }
};


module.exports = CampaignAsset;