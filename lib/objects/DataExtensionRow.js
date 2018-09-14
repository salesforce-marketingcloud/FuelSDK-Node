const helpers = require('../helpers');


/*
http://help.exacttarget.com/en/technical_library/web_service_guide/objects/dataextensionobject/
https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extension-rows/data-extension-row-retrieve.html
*/

const DataExtensionRow = function (parent, options = {}) {

    this.parent = parent;
    this.objName = 'DataExtensionObject';

    this.options = options.options || {};
    this.config = options;

};

DataExtensionRow.prototype.list = function (cb) {

    this.props = this.config.props || {};

    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for DE Row retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extension-rows/data-extension-row-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName + '[' + this.config.Name + ']',
        this.props,
        this.options,
        cb
    );
};

DataExtensionRow.prototype.post = function (cb) {

    this._setProps();

    this.parent.soapClient.create(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

DataExtensionRow.prototype.get = function (cb) {

    this.props = this.config.props || {};

    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for DE Row retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extension-rows/data-extension-row-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName + '[' + this.config.Name + ']',
        this.props,
        this.options,
        cb
    );
};

DataExtensionRow.prototype.patch = function (cb) {

    this._setProps();

    this.parent.soapClient.update(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

DataExtensionRow.prototype.delete = function (cb) {

    this._setProps(true);

    this.parent.soapClient.delete(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

DataExtensionRow.prototype._setProps = function(isDelete) {
    this.props = {};
    this.config.props = this.config.props || {};
    if (this.config.CustomerKey) this.props.CustomerKey = this.config.CustomerKey;
    if (this.config.Name) this.props.Name = this.config.Name;
    const listName = isDelete ? 'Keys' : 'Properties';
    const itemName = isDelete ? 'Key' : 'Property';
    this.props[listName] = {};
    this.props[listName][itemName] = Object.entries(this.config.props).map(([Name, Value]) => ({Name, Value}));
};


module.exports = DataExtensionRow;