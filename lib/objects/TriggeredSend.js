var util = require('util');
var helpers = require('../helpers');
	
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/triggered-sends/triggered-send-create.html
*/	
	
var TriggeredSend = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'TriggeredSendDefinition';
	
	this.config = options;
	options = options || {};
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

TriggeredSend.prototype.post = function(cb) {
	this.parent.SoapClient.create(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

TriggeredSend.prototype.get = function(cb) {
	var filter = {filter: this.config.filter} || null;

	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for TriggeredSend retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/triggered-sends/triggered-send-retrieve.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			filter,
			cb
		);
	}		
};

TriggeredSend.prototype.patch = function(cb) {
	this.parent.SoapClient.update(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

TriggeredSend.prototype.delete = function(cb) {
	this.parent.SoapClient.delete(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

TriggeredSend.prototype.send = function(cb) {
	this.parent.SoapClient.create(
		'TriggeredSend',
		this.props,
		this.options,
		cb
	);
	
	/*
	var endpoint = 'https://www.exacttargetapis.com/messaging/v1/messageDefinitionSends/{guid}/send';
	//var endpoint = 'https://www.exacttargetapis.com/messaging/v1/messageDefinitionSends/{key:cust_key}/send';
	var options = {
			uri: this.endpoint.replace()
			,props: {"CustomerKey" : "1859"}
		};		
	
	this.parent.RestClient
		.post(options)
		.then(function(response) {
			cb(null,response); 
		}.bind(this))
		.catch(function(err) {
			cb(err,null); 
		}.bind(this));	
	*/	
};



module.exports = TriggeredSend;