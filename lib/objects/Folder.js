const helpers = require('../helpers');


/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/folders/folder-create.html
*/

const Folder = function (parent, options = {}) {

    this.parent = parent;
    this.objName = 'DataFolder';

    this.options = options.options || {};
    this.props = options.props || {};   // props corresponds to the Objects attribute in the SOAP envelope.

};

Folder.prototype.list = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for Folder retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/folders/folder-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

Folder.prototype.post = function (cb) {
    this.parent.soapClient.create(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

Folder.prototype.get = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for Folder retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/folders/folder-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

Folder.prototype.patch = function (cb) {
    this.parent.soapClient.update(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

Folder.prototype.delete = function (cb) {
    this.parent.soapClient.delete(
        this.objName,
        this.props,
        this.options,
        cb
    );
};


module.exports = Folder;