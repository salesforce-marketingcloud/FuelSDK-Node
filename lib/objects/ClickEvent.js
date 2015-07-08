var util = require('util');
var helpers = require('../helpers');
	
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/click-tracking.html
*/	
	
var ClickEvent = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'ClickEvent';
	
	this.config = options;
	options = options || {};
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};


ClickEvent.prototype.get = function(cb) {
	var filter = {filter: this.config.filter} || null;

	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for ClickEvent retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/tracking/click-tracking.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			filter,
			cb
		);
	}		
};




module.exports = ClickEvent;