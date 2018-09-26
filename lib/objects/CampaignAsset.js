const {promiseToCallback} = require('../helpers');


/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/campaign-asset-create.htm
*/

class CampaignAsset {

  constructor(restClient, options) {
    this.restClient = restClient;
    this.endpoint = `${restClient.origin}/hub/v1/campaigns/{id}/assets`;
    this.config = options;
  }

  post(cb) {

    const uri = this.endpoint.replace('{id}', this.config.props.id);
    const body = {ids: this.config.props.ids, type: this.config.props.type};
    const options = {
      uri: uri,
      body: JSON.stringify(body)
    };

    promiseToCallback(this.restClient.post(options), cb);

  }

  get(cb) {

    let uri = this.endpoint.replace('{id}', this.config.props.id);
    if (this.config.props.campaignAssetId) uri += '/' + this.config.props.campaignAssetId;
    const options = {
      uri: uri
    };

    promiseToCallback(this.restClient.get(options), cb);

  }

  delete(cb) {

    if (!this.config.props.id || !this.config.props.assetId) {
      cb({
        error: 'Campaign and Asset IDs are required for asset deletion.',
        documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/campaign-assets/campaign-asset-delete.html'
      });
    } else {
      const uri = this.endpoint.replace('{id}', this.config.props.id) + '/' + this.config.props.assetId;
      const options = {
        uri: uri
      };

      promiseToCallback(this.restClient.delete(options), cb);
    }
  }

}


module.exports = CampaignAsset;
