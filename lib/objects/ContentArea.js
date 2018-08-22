const helpers = require('../helpers');


/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/content-areas/content-area-create.html
*/

const ContentArea = function (parent, {options, props} = {}) {

    this.parent = parent;
    this.objName = 'ContentArea';

    this.options = options || {};
    this.props = props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

ContentArea.prototype.list = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for Content Area retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/content-areas/content-area-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

ContentArea.prototype.post = function (cb) {
    this.parent.soapClient.create(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

ContentArea.prototype.get = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for Content Area retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/content-areas/content-area-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

ContentArea.prototype.patch = function (cb) {
    this.parent.soapClient.update(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

ContentArea.prototype.delete = function (cb) {
    this.parent.soapClient.delete(
        this.objName,
        this.props,
        this.options,
        cb
    );
};


module.exports = ContentArea;