var util = require('util');
var helpers = require('../helpers');
	
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/list-subscribers/list-subscriber-retrieve.html
*/	
	
/**
 * ListSubscriber constructor
 * @param {Object} parent ET_Client Parent
 * @param {Object} [options] - Configuration options
 * @param [options.clientIDs] - Will be used in body as `ClientIDs` under `RetrieveRequestMsg.RetrieveRequest`
 * @param [options.filter] - Will be used in body as `Filter` under `RetrieveRequestMsg.RetrieveRequest`
 * @param [options.continueRequest] - Will be used in body as `ContinueRequest` under `RetrieveRequestMsg.RetrieveRequest`
 */
var ListSubscriber = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'ListSubscriber';
	
	options = options || {};
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

/**
 * Retrieves ListSubscribers
 * @param {(error, response) => {}} cb Callback
 */
ListSubscriber.prototype.get = function(cb) {
	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for ListSubscriber retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/list-subscribers/list-subscriber-retrieve.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			this.options,
			cb
		);
	}
};

module.exports = ListSubscriber;