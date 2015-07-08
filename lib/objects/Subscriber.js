var util = require('util');
var helpers = require('../helpers');
	
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/subscribers/subscriber-create.html
*/	
	
var Subscriber = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'Subscriber';
	
	this.config = options;
	options = options || {};
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

Subscriber.prototype.post = function(cb) {
	this.parent.SoapClient.create(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

Subscriber.prototype.get = function(cb) {
	var filter = {filter: this.config.filter} || null;

	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for Subscriber retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/subscribers/subscriber-retrieve.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			filter,
			cb
		);
	}		
};

Subscriber.prototype.patch = function(cb) {
	this.parent.SoapClient.update(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

Subscriber.prototype.delete = function(cb) {
	this.parent.SoapClient.delete(
		this.objName,
		this.props,
		this.options,
		cb
	);
};



module.exports = Subscriber;