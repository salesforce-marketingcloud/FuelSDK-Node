const helpers = require('../helpers');


/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/unsubscribe-tracking.html
*/

const UnsubEvent = function (parent, options = {}) {

    this.parent = parent;
    this.objName = 'UnsubEvent';

    this.options = options.options || {};
    this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

UnsubEvent.prototype.get = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for UnsubEvent retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/unsubscribe-tracking.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        this.options,
        cb
    );
};


module.exports = UnsubEvent;