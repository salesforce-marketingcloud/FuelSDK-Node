const helpers = require('../helpers');


/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/emails/email-create.html
*/

const Email = function (parent, options = {}) {

    this.parent = parent;
    this.objName = 'Email';

    this.options = options.options || {};
    this.props = options.props || {};   // props corresponds to the Objects attribute in the SOAP envelope.

};

Email.prototype.list = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for Email retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/emails/email-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

Email.prototype.post = function (cb) {
    this.parent.soapClient.create(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

Email.prototype.get = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for Email retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/emails/email-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

Email.prototype.patch = function (cb) {
    this.parent.soapClient.update(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

Email.prototype.delete = function (cb) {
    this.parent.soapClient.delete(
        this.objName,
        this.props,
        this.options,
        cb
    );
};


module.exports = Email;