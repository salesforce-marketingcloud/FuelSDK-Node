const querystring = require('querystring');
const {promiseToCallback} = require('../helpers');


/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/campaign-create.htm
*/

class Campaign {

  constructor(restClient, options) {
    this.restClient = restClient;
    this.endpoint = `${restClient.origin}/hub/v1/campaigns`;
    this.config = options;
  }

  post(cb) {

    const id = this.config.id ? this.config.id : '';
    const options = {
      uri: this.endpoint + '/' + id
      , body: JSON.stringify(this.config.props)
    };

    promiseToCallback(this.restClient.post(options), cb);

  }

  get(cb) {

    const id = this.config.id ? this.config.id : '';
    const options = {
      uri: this.endpoint + '/' + id
    };
    if (this.config.props) options.uri += '?' + querystring.stringify(this.config.props);

    promiseToCallback(this.restClient.get(options), cb);

  }

  patch(cb) { // patch is not implemented in v1 REST, use post instead.
    this.post(cb);
  }

  delete(cb) {

    if (!this.config.id) {
      cb({
        error: 'An id is required for campaign deletion.',
        documentation: 'https://code.exacttarget.com/apis-sdks/rest-api/v1/hub/campaigns/deleteCampaign.html'
      });
    } else {
      const options = {
        uri: this.endpoint + '/' + this.config.id
      };
      promiseToCallback(this.restClient.delete(options)
        .catch(function (err) {
          if (err.message === 'API did not return JSON') { // should be fixed on fuel-rest package instead
            return Promise.resolve({});
          }
          return Promise.reject(err)
        }), cb);
    }

  }

}


module.exports = Campaign;
