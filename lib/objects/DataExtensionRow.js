var util = require('util');
var helpers = require('../helpers');
	
/*
http://help.exacttarget.com/en/technical_library/web_service_guide/objects/dataextensionobject/
https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extension-rows/data-extension-row-retrieve.html
*/	
	
var DataExtensionRow = function (parent, options) {
	
	this.parent = parent;
	this.objName = 'DataExtensionObject';
	
	options = options || {};
	
    this.props = {};
    this.options = options.options || {};
    this.config = options;

};

DataExtensionRow.prototype.post = function(cb) {

	var flds = [];
    for (key in this.config.props) {
    	flds.push({"Name" : key, "Value" : this.config.props[key]});
    }
    if (this.config.CustomerKey) this.props.CustomerKey = this.config.CustomerKey;
    if (this.config.Name) this.props.Name = this.config.Name;
    this.props.Properties = {};
    this.props.Properties.Property = flds;

	this.parent.SoapClient.create(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

DataExtensionRow.prototype.get = function(cb) {

	this.props = this.config.props || {};
	var filter = {filter: this.config.filter} || null;
	
	if (!this.props || helpers.isEmpty(this.props)) {
		cb({error: 'A property list is required for DE Row retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/data-extension-rows/data-extension-row-retrieve.html'});
	} else {
		this.parent.SoapClient.retrieve(
			this.objName + '[' + this.config.Name + ']',
			this.props,
			filter,
			cb
		);
	}		
};

DataExtensionRow.prototype.patch = function(cb) {

	var flds = [];
    for (key in this.config.props) {
    	flds.push({"Name" : key, "Value" : this.config.props[key]});
    }
    if (this.config.CustomerKey) this.props.CustomerKey = this.config.CustomerKey;
    if (this.config.Name) this.props.Name = this.config.Name;
    this.props.Properties = {};
    this.props.Properties.Property = flds;
	
	this.parent.SoapClient.update(
		this.objName,
		this.props,
		this.options,
		cb
	);
};

DataExtensionRow.prototype.delete = function(cb) {

	var flds = [];
    for (key in this.config.props) {
    	flds.push({"Name" : key, "Value" : this.config.props[key]});
    }
    if (this.config.CustomerKey) this.props.CustomerKey = this.config.CustomerKey;
    if (this.config.Name) this.props.Name = this.config.Name;
    this.props.Keys = {};
    this.props.Keys.Key = flds;

	this.parent.SoapClient.delete(
		this.objName,
		this.props,
		this.options,
		cb
	);
};



module.exports = DataExtensionRow;