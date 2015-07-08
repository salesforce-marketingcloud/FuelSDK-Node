var util = require('util');
var querystring = require('querystring');
var helpers = require('../helpers');
	
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/campaigns/campaign-create.html
http://help.exacttarget.com/en/technical_library/web_service_guide/objects/campaign/
*/	
	
var Campaign = function (parent, options) {
	
	this.parent = parent;
	this.endpoint = 'https://www.exacttargetapis.com/hub/v1/campaigns';
	
	this.config = options;
	

};

Campaign.prototype.post = function(cb) {

	var id = this.config.id ? this.config.id : '';
	var options = {
		uri: this.endpoint + '/' + id
		,body: JSON.stringify(this.config.props)
	};
	
	this.parent.RestClient
		.post(options)
		.then(function(response) {
			cb(null,response); 
		}.bind(this))
		.catch(function(err) {
			cb(err,null); 
		}.bind(this));

};

Campaign.prototype.get = function(cb) {
			
	var id = this.config.id ? this.config.id : '';
	var options = {
		uri: this.endpoint + '/' + id
	};
	if (this.config.props) options.uri += '?' + querystring.stringify(this.config.props);

	this.parent.RestClient
		.get(options)
		.then(function(response) {
			cb(null,response); 
		}.bind(this))
		.catch(function(err) {
			cb(err,null); 
		}.bind(this));		
		
};

Campaign.prototype.patch = function(cb) {
	//patch is not implemented in v1 REST, use post instead.
	this.post(cb);		
};

Campaign.prototype.delete = function(cb) {

	if (!this.config.id) {
		cb({error: 'An id is required for campaign deletion.', documentation: 'https://code.exacttarget.com/apis-sdks/rest-api/v1/hub/campaigns/deleteCampaign.html'});
	} else {	
		var options = {
			uri: this.endpoint + '/' + this.config.id
		};

		this.parent.RestClient
			.delete(options)
			.then(function(response) {
				cb(null,response); 
			}.bind(this))
			.catch(function(err) {
				cb(err,null); 
			}.bind(this));
	}
		
};



module.exports = Campaign;