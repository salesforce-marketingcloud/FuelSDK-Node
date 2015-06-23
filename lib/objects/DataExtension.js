var util = require('util');
var helpers = require('../helpers');
	
var DataExtension = function (parent, options) {
	
	this.parent = parent;
	
	options = options || {};
	this.options = options || {};
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
		'DataExtension',
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

DataExtension.prototype.retrieve = function(cb) {
	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for DE retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extensions/data-extension-retrieve.html'});
	} else {
		this.parent.SoapClient.retrieve(
			'DataExtension',
			this.props,
			this.options,
			function( err, response ) {
				if ( err ) {
					cb( err );
				}
				cb(response);
			}
		);
	}		
};

DataExtension.prototype.update = function(cb) {
	this.parent.SoapClient.update(
		'DataExtension',
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

DataExtension.prototype.delete = function(cb) {
	this.parent.SoapClient.delete(
		'DataExtension',
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



module.exports = DataExtension;