var util = require('util');
var querystring = require('querystring');
var helpers = require('../helpers');
	
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/campaign-assets/campaign-asset-create.html
*/	
	
var CampaignAsset = function (parent, options) {
	
	this.parent = parent;
	this.endpoint = 'https://www.exacttargetapis.com/hub/v1/campaigns/{id}/assets';
	
	this.config = options;
	

};

CampaignAsset.prototype.post = function(cb) {

	var uri = this.endpoint.replace('{id}',this.config.props.id);
	var body = {ids: this.config.props.ids, type: this.config.props.type};
	var options = {
		uri: uri
		,body: JSON.stringify(body)
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

CampaignAsset.prototype.get = function(cb) {
			
	var uri = this.endpoint.replace('{id}',this.config.props.id);
	if (this.config.props.assetId) uri += '/' + this.config.props.assetId;
	var options = {
		uri: uri
	};

	this.parent.RestClient
		.get(options)
		.then(function(response) {
			cb(null,response); 
		}.bind(this))
		.catch(function(err) {
			cb(err,null); 
		}.bind(this));		
		
};


CampaignAsset.prototype.delete = function(cb) {

	if (!this.config.props.id || !this.config.props.assetId) {
		cb({error: 'Campaign and Asset IDs are required for asset deletion.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/campaign-assets/campaign-asset-delete.html'});
	} else {	
		var uri = this.endpoint.replace('{id}',this.config.props.id) + '/' + this.config.props.assetId;
		var options = {
			uri: uri
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



module.exports = CampaignAsset;