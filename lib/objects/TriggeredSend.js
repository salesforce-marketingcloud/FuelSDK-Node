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
		function( err, response ) {
			if ( err ) {
				cb( err );
			}
			cb(response);
		}
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
			function( err, response ) {
				if ( err ) {
					cb( err );
				}
				cb(response);
			}
		);
	}		
};

TriggeredSend.prototype.patch = function(cb) {
	this.parent.SoapClient.update(
		this.objName,
		this.props,
		this.options,
		function( err, response ) {
			if ( err ) {
				cb( err );
			}
			cb(response);
		}
	);
};

TriggeredSend.prototype.delete = function(cb) {
	this.parent.SoapClient.delete(
		this.objName,
		this.props,
		this.options,
		function( err, response ) {
			if ( err ) {
				cb( err );
			}
			cb(response);
		}
	);
};

TriggeredSend.prototype.send = function(cb) {
	this.post(cb);
};



module.exports = TriggeredSend;