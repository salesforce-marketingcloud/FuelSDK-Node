const helpers = require('../helpers');


/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/click-tracking.html
*/

const ClickEvent = function (parent, options = {}) {

    this.parent = parent;
    this.objName = 'ClickEvent';

    this.options = options.options || {};
    this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};


ClickEvent.prototype.get = function (cb) {
    if (!this.props || helpers.isEmpty(this.props)) {
        return cb({
            error: 'A property list is required for ClickEvent retrieval.',
            documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/click-tracking.html'
        });
    }
    this.parent.soapClient.retrieve(
        this.objName,
        this.props,
        filter,
        cb
    );
};


module.exports = ClickEvent;