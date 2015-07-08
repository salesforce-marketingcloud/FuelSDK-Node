var util = require('util');
var helpers = require('../helpers');
	
/*
http://help.exacttarget.com/en/technical_library/web_service_guide/objects/dataextension/
*/	
	
var DataExtension = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'DataExtension';
	
	this.config = options;
	options = options || {};
	this.options = options.options || {};
	this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.
	
	//translate columns to Fields:
	if (options.columns) {		 
		var cols = options.columns;
		this.props.Fields = {Field:[]};
		for (var i=0, len=cols.length; i<len; i++) {
			var fld = {};
			for (key in cols[i]) {
				fld[key] = cols[i][key]; 
			}
			
			this.props.Fields.Field.push(fld);
		}
	}	

};

DataExtension.prototype.post = function(cb) {
	this.parent.SoapClient.create(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

DataExtension.prototype.get = function(cb) {
	var filter = {filter: this.config.filter} || null;

	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for DE retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extensions/data-extension-retrieve.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			filter,
			cb
		);
	}		
};

DataExtension.prototype.patch = function(cb) {
	this.parent.SoapClient.update(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

DataExtension.prototype.delete = function(cb) {
	this.parent.SoapClient.delete(
		this.objName,
		this.props,
		this.options,
		cb
	);
};



module.exports = DataExtension;