const helpers = require('../helpers');


/*
http://help.exacttarget.com/en/technical_library/web_service_guide/objects/dataextension/
*/

const DataExtension = function (parent, options = {}) {

    this.parent = parent;
    this.objName = 'DataExtension';

    this.options = options.options || {};
    this.props = options.props || {}; // props corresponds to the Objects attribute in the SOAP envelope.

};

DataExtension.prototype.list = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for DE retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extensions/data-extension-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

DataExtension.prototype.post = function (cb) {
    this.parent.soapClient.create(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

DataExtension.prototype.get = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for DE retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extensions/data-extension-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

DataExtension.prototype.patch = function (cb) {
    this.parent.soapClient.update(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

DataExtension.prototype.delete = function (cb) {
    this.parent.soapClient.delete(
        this.objName,
        this.props,
        this.options,
        cb
    );
};


module.exports = DataExtension;