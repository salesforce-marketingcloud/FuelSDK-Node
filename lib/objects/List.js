var util = require('util');
var helpers = require('../helpers');
	
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/lists/list-create.html
*/	
	
var List = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'List';
	
	this.config = options;
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

List.prototype.get = function(cb) {
	var filter = this.config.filter ? {filter: this.config.filter} : null;

	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for List retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/lists/list-retrieve.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,		
			filter,
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