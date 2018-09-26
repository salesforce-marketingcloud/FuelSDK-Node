const helpers = require('../helpers');


/*
https://developer.salesforce.com/docs/atlas.en-us.mc-sdks.meta/mc-sdks/data-extension-column-retrieve.htm
*/

class DataExtensionColumn {

  constructor(soapClient, options) {
    this.soapClient = soapClient;
    this.objName = 'DataExtensionField';

    this.config = options;
    options = options || {};
    this.options = options.options || {};
    this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

    //translate columns to Fields:
    if (options.columns) {
      const cols = options.columns;
      this.props.Fields = {Field: []};
      for (const i = 0, len = cols.length; i < len; i++) {
        const fld = {};
        for (const key in cols[i]) {
          fld[key] = cols[i][key];
        }

        this.props.Fields.Field.push(fld);
      }
    }
  }

  get(cb) {
    const filter = {filter: this.config.filter} || null;

    if (!this.props || helpers.isEmpty(this.props)) {
      cb({
        error: 'A property list is required for DE column retrieval.',
        documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extension-columns/data-extension-column-retrieve.html'
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


module.exports = DataExtensionColumn;
