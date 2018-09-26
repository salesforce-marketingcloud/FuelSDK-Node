const helpers = require('../helpers');


/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/data-extension-row-create.htm
*/

class DataExtensionRow {
  
  constructor(soapClient, options) {
    this.soapClient = soapClient;
    this.objName = 'DataExtensionObject';
  
    options = options || {};
  
    this.props = {};
    this.options = options.options || {};
    this.config = options;
  }

  post(cb) {
  
    const flds = [];
    for (const key in this.config.props) {
      flds.push({'Name': key, 'Value': this.config.props[key]});
    }
    if (this.config.CustomerKey) this.props.CustomerKey = this.config.CustomerKey;
    if (this.config.Name) this.props.Name = this.config.Name;
    this.props.Properties = {};
    this.props.Properties.Property = flds;
  
    this.soapClient.create(
      this.objName,
      this.props,
      this.options,
      cb
    );
  }
  
  get(cb) {
  
    this.props = this.config.props || {};
    const filter = {filter: this.config.filter} || null;
  
    if (!this.props || helpers.isEmpty(this.props)) {
      cb({
        error: 'A property list is required for DE Row retrieval.',
        documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extension-rows/data-extension-row-retrieve.html'
      });
    } else {
      this.soapClient.retrieve(
        this.objName + '[' + this.config.Name + ']',
        this.props,
        filter,
        cb
      );
    }
  }
  
  patch(cb) {
  
    const flds = [];
    for (const key in this.config.props) {
      flds.push({'Name': key, 'Value': this.config.props[key]});
    }
    if (this.config.CustomerKey) this.props.CustomerKey = this.config.CustomerKey;
    if (this.config.Name) this.props.Name = this.config.Name;
    this.props.Properties = {};
    this.props.Properties.Property = flds;
  
    this.soapClient.update(
      this.objName,
      this.props,
      this.options,
      cb
    );
  }
  
  delete(cb) {
  
    const flds = [];
    for (const key in this.config.props) {
      flds.push({'Name': key, 'Value': this.config.props[key]});
    }
    if (this.config.CustomerKey) this.props.CustomerKey = this.config.CustomerKey;
    if (this.config.Name) this.props.Name = this.config.Name;
    this.props.Keys = {};
    this.props.Keys.Key = flds;
  
    this.soapClient.delete(
      this.objName,
      this.props,
      this.options,
      cb
    );
  }

}


module.exports = DataExtensionRow;
