const helpers = require('../helpers');


/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/lists/list-create.html
*/

const List = function (parent, options = {}) {

    this.parent = parent;
    this.objName = 'List';

    this.options = options.options || {};
    this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

List.prototype.list = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        cb({
            error: 'A property list is required for List retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/lists/list-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

List.prototype.post = function (cb) {
    this.parent.soapClient.create(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

List.prototype.get = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        cb({
            error: 'A property list is required for List retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/lists/list-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

List.prototype.patch = function (cb) {
    this.parent.soapClient.update(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

List.prototype.delete = function (cb) {
    this.parent.soapClient.delete(
        this.objName,
        this.props,
        this.options,
        cb
    );
};


module.exports = List;