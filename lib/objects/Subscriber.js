const helpers = require('../helpers');


/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/subscribers/subscriber-create.html
*/

const Subscriber = function (parent, options = {}) {

    this.parent = parent;
    this.objName = 'Subscriber';

    this.options = options.options || {};
    this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

Subscriber.prototype.list = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for Subscriber retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/subscribers/subscriber-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

Subscriber.prototype.post = function (cb) {
    this.parent.soapClient.create(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

Subscriber.prototype.get = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for Subscriber retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/subscribers/subscriber-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

Subscriber.prototype.patch = function (cb) {
    this.parent.soapClient.update(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

Subscriber.prototype.delete = function (cb) {
    this.parent.soapClient.delete(
        this.objName,
        this.props,
        this.options,
        cb
    );
};


module.exports = Subscriber;