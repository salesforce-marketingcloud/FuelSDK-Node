var util = require('util');
var helpers = require('../helpers');
	
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/emails/email-create.html
*/	
	
var Email = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'Email';
	
	this.config = options;
	options = options || {};
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

Email.prototype.post = function(cb) {
	this.parent.SoapClient.create(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

Email.prototype.get = function(cb) {
	var filter = {filter: this.config.filter} || null;

	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for Email retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/emails/email-retrieve.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			filter,
			cb
		);
	}		
};

Email.prototype.patch = function(cb) {
	this.parent.SoapClient.update(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

Email.prototype.delete = function(cb) {
	this.parent.SoapClient.delete(
		this.objName,
		this.props,
		this.options,
		cb
	);
};



module.exports = Email;