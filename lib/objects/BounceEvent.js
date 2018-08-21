const helpers = require('../helpers');


/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/bounce-tracking.html
*/

const BounceEvent = function (parent, options) {

    this.parent = parent;
    this.objName = 'BounceEvent';

    this.config = options;
    options = options || {};
    this.options = options.options || {};
    this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

BounceEvent.prototype.get = function (cb) {
    const filter = {filter: this.config.filter} || null;
    if (!this.props || helpers.isEmpty(this.props)) {
        cb({
            error: 'A property list is required for BounceEvent retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/bounce-tracking.html'
        });
    } else {
        this.parent.soapClient.retrieve(
            this.objName,
            this.props,
            filter,
            cb
        );
    }
};


module.exports = BounceEvent;