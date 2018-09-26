const helpers = require('../helpers');


/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/open-tracking.htm
*/

class OpenEvent {

  constructor(soapClient, options) {
    this.soapClient = soapClient;
    this.objName = 'OpenEvent';

    this.config = options;
    options = options || {};
    this.options = options.options || {};
    this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.
  }

  get(cb) {
    const filter = {filter: this.config.filter} || null;

    if (!this.props || helpers.isEmpty(this.props)) {
      cb({
        error: 'A property list is required for OpenEvent retrieval.',
        documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/open-tracking.html'
      });
    } else {
      this.soapClient.retrieve(
        this.objName,
        this.props,
        filter,
        cb
      );
    }
  }

}


module.exports = OpenEvent;
