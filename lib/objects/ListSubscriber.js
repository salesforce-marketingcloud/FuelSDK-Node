const helpers = require('../helpers');
	

/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/list-subscribers/list-subscriber-retrieve.html
*/	
	
const ListSubscriber = function (parent, options = {}) {
	
	this.parent = parent;
	this.objName = 'ListSubscriber';
	
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.

};

ListSubscriber.prototype.get = function(cb) {
	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for ListSubscriber retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/list-subscribers/list-subscriber-retrieve.html'});
	} else {
		this.parent.soapClient.retrieve(
			this.objName,
			this.props,
			this.options,
			cb
		);
	}		
};


module.exports = ListSubscriber;