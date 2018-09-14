const helpers = require('../helpers');


/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/triggered-sends/triggered-send-create.html
*/

const TriggeredSend = function (parent, options = {}) {

    this.parent = parent;
    this.objName = 'TriggeredSendDefinition';

    this.options = options.options || {};
    this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

TriggeredSend.prototype.list = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for TriggeredSend retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/triggered-sends/triggered-send-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

TriggeredSend.prototype.post = function (cb) {
    this.parent.soapClient.create(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

TriggeredSend.prototype.get = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for TriggeredSend retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/triggered-sends/triggered-send-retrieve.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

TriggeredSend.prototype.patch = function (cb) {
    this.parent.soapClient.update(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

TriggeredSend.prototype.delete = function (cb) {
    this.parent.soapClient.delete(
        this.objName,
        this.props,
        this.options,
        cb
    );
};

TriggeredSend.prototype.send = function (cb) {
    this.parent.soapClient.create(
        'TriggeredSend',
        this.props,
        this.options,
        cb
    );

    // const endpoint = `${this.parent.restClient.origin}/messaging/v1/messageDefinitionSends/{guid}/send`;
    // //const endpoint = 'https://www.exacttargetapis.com/messaging/v1/messageDefinitionSends/{key:cust_key}/send';
    // const options = {
    //         uri: this.endpoint.replace()
    //         ,props: {"CustomerKey" : "1859"}
    //     };
    //
    // this.parent.restClient
    //     .post(options)
    //     .then(function(response) {
    //         cb(null,response);
    //     })
    //     .catch(function(err) {
    //         cb(err,null);
    //     });
};


module.exports = TriggeredSend;