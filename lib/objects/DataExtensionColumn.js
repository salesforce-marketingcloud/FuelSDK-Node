var util = require('util');
var helpers = require('../helpers');
	
/*
http://help.exacttarget.com/en/technical_library/web_service_guide/objects/dataextensionfield/
*/	
	
var DataExtensionColumn = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'DataExtensionField';
	
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

DataExtensionColumn.prototype.get = function(cb) {
	var filter = {filter: this.config.filter} || null;
	
	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for DE column retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extension-columns/data-extension-column-retrieve.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName,
			this.props,
			filter,
			cb
		);
	}		
};





module.exports = DataExtensionColumn;