const helpers = require('../helpers');


/*
http://help.exacttarget.com/en/technical_library/web_service_guide/objects/dataextensionfield/
*/

const DataExtensionColumn = function (parent, options = {}) {

    this.parent = parent;
    this.objName = 'DataExtensionField';

    this.options = options.options || {};
    this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

DataExtensionColumn.prototype.get = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for DE column retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extension-columns/data-extension-column-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};


module.exports = DataExtensionColumn;