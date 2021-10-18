var util = require('util');
var helpers = require('../helpers');
	
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/click-tracking.html
*/	
	
/**
 * ClickEvent constructor
 * @param {Object} parent ET_Client Parent
 * @param {Object} [options] - Configuration options
 * @param [options.clientIDs] - Will be used in body as `ClientIDs` under `RetrieveRequestMsg.RetrieveRequest`
 * @param [options.filter] - Will be used in body as `Filter` under `RetrieveRequestMsg.RetrieveRequest`
 * @param [options.continueRequest] - Will be used in body as `ContinueRequest` under `RetrieveRequestMsg.RetrieveRequest`
 */
var ClickEvent = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'ClickEvent';
	
	options = options || {};
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

/**
 * Retrieves ClickEvents
 * @param {(error, response) => {}} cb Callback
 */
ClickEvent.prototype.get = function(cb) {
	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for ClickEvent retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/click-tracking.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			this.options,
			cb
		);
	}
};

module.exports = ClickEvent;