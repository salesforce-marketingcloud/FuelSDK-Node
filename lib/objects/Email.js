const helpers = require('../helpers');


/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/email-create.htm
*/

class Email {
  
  constructor(soapClient, options) {
    this.soapClient = soapClient;
    this.objName = 'Email';
  
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
        error: 'A property list is required for Email retrieval.',
        documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/emails/email-retrieve.html'
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


module.exports = Email;
