var util = require('util');
var helpers = require('../helpers');
	
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/list-subscribers/list-subscriber-retrieve.html
*/	
	
var ListSubscriber = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'ListSubscriber';
	
	this.config = options;
	options = options || {};
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};


ListSubscriber.prototype.get = function(cb) {
	var filter = {filter: this.config.filter} || null;

	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for ListSubscriber retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/list-subscribers/list-subscriber-retrieve.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			filter,
			cb
		);
	}		
};




module.exports = ListSubscriber;