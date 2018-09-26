const helpers = require('../helpers');


/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/click-tracking.htm
*/

class ClickEvent {

  constructor(soapClient, options) {
    this.soapClient = soapClient;
    this.objName = 'ClickEvent';

    this.config = options;
    options = options || {};
    this.options = options.options || {};
    this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.
  }

  get(cb) {
    const filter = {filter: this.config.filter} || null;

    if (!this.props || helpers.isEmpty(this.props)) {
      cb({
        error: 'A property list is required for ClickEvent retrieval.',
        documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/click-tracking.html'
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


module.exports = ClickEvent;
