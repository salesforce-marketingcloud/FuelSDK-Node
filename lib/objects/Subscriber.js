const helpers = require('../helpers');


/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/subscriber-create.htm
*/

class Subscriber {
  
  constructor(soapClient, options) {
    this.soapClient = soapClient;
    this.objName = 'Subscriber';
  
    this.config = options;
    options = options || {};
    this.options = options.options || {};
    this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.
  }
  
  post(cb) {
    this.soapClient.create(
      this.objName,
      this.props,
      this.options,
      cb
    );
  }
  
  get(cb) {
    const filter = {filter: this.config.filter} || null;
  
    if (!this.props || helpers.isEmpty(this.props)) {
      cb({
        error: 'A property list is required for Subscriber retrieval.',
        documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/subscribers/subscriber-retrieve.html'
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
  
  patch(cb) {
    this.soapClient.update(
      this.objName,
      this.props,
      this.options,
      cb
    );
  }
  
  delete(cb) {
    this.soapClient.delete(
      this.objName,
      this.props,
      this.options,
      cb
    );
  }

}


module.exports = Subscriber;
