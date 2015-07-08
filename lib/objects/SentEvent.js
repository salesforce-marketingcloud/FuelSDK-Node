var util = require('util');
var helpers = require('../helpers');
	
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/sent-tracking.html
*/	
	
var SentEvent = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'SentEvent';
	
	this.config = options;
	options = options || {};
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};


SentEvent.prototype.get = function(cb) {
	var filter = {filter: this.config.filter} || null;

	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for SentEvent retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/sent-tracking.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			filter,
			cb
		);
	}		
};




module.exports = SentEvent;