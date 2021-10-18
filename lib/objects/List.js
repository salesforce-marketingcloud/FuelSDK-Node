var util = require('util');
var helpers = require('../helpers');
	
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/lists/list-create.html
*/	
	
/**
 * List constructor
 * @param {Object} parent ET_Client Parent
 * @param {Object} [options] - Configuration options
 * @param [options.clientIDs] - Will be used in body as `ClientIDs` under `RetrieveRequestMsg.RetrieveRequest`
 * @param [options.filter] - Will be used in body as `Filter` under `RetrieveRequestMsg.RetrieveRequest`
 * @param [options.continueRequest] - Will be used in body as `ContinueRequest` under `RetrieveRequestMsg.RetrieveRequest`
 */
var List = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'List';
	
	options = options || {};
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

List.prototype.post = function(cb) {
	this.parent.SoapClient.create(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

/**
 * Retrieves Lists
 * @param {(error, response) => {}} cb Callback
 */
List.prototype.get = function(cb) {
	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for List retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/lists/list-retrieve.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			this.options,
			cb
		);
	}
};

List.prototype.patch = function(cb) {
	this.parent.SoapClient.update(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

List.prototype.delete = function(cb) {
	this.parent.SoapClient.delete(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

module.exports = List;