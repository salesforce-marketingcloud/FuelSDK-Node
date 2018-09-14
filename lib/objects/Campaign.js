const querystring = require('querystring');


/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/campaign-create.htm
*/

const Campaign = function (parent, options = {}) {
    this.parent = parent;
    this.endpoint = `${this.parent.restClient.origin}/hub/v1/campaigns`;
    this.config = options;
};

Campaign.prototype.list = function (cb) {

    this.parent.restClient
        .get({uri: this.endpoint})
        .then(function (response) {
            cb(null, response);
        })
        .catch(function (err) {
            cb(err, null);
        });

};

Campaign.prototype.post = function (cb) {

    const id = this.config.id ? this.config.id : '';
    const options = {
        uri: `${this.endpoint}/${id}`,
        body: JSON.stringify(this.config.props)
    };

    this.parent.restClient
        .post(options)
        .then(function (response) {
            cb(null, response);
        })
        .catch(function (err) {
            cb(err, null);
        });

};

Campaign.prototype.get = function (cb) {

    const id = this.config.id ? this.config.id : '';
    const options = {
        uri: this.endpoint + '/' + id
    };
    if (this.config.props) options.uri += '?' + querystring.stringify(this.config.props);

    this.parent.restClient
        .get(options)
        .then(function (response) {
            cb(null, response);
        })
        .catch(function (err) {
            cb(err, null);
        });

};

Campaign.prototype.patch = function (cb) {
    //patch is not implemented in v1 REST, use post instead.
    this.post(cb);
};

Campaign.prototype.delete = function (cb) {

    if (!this.config.id) {
        cb({
            error: 'An id is required for campaign deletion.',
            documentation: 'https://code.exacttarget.com/apis-sdks/rest-api/v1/hub/campaigns/deleteCampaign.html'
        });
    } else {
        const options = {
            uri: this.endpoint + '/' + this.config.id
        };

        this.parent.restClient
            .delete(options)
            .then(function (response) {
                cb(null, response);
            })
            .catch(function (err) {
                if (err.message === 'API did not return JSON') { // should be fixed on fuel-rest package instead
                    return cb(null, {});
                }
                cb(err, null);
            });
    }

};


module.exports = Campaign;