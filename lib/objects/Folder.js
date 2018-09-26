const helpers = require('../helpers');


/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/folder-create.htm
*/

class Folder {
  
  constructor(soapClient, options) {
    this.soapClient = soapClient;
    this.objName = 'DataFolder';
  
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
        error: 'A property list is required for Folder retrieval.',
        documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/folders/folder-retrieve.html'
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


module.exports = Folder;
