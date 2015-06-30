var FuelAuth = require( 'fuel-auth' );
var FuelRest = require('fuel-rest');
var FuelSoap = require( 'fuel-soap' );

var pkg     = require( '../package.json' );

var Campaign = require('./objects/Campaign');
var CampaignAsset = require('./objects/CampaignAsset');
var ContentArea = require('./objects/ContentArea');
var DataExtension = require('./objects/DataExtension');
var DataExtensionColumn = require('./objects/DataExtensionColumn');
var DataExtensionRow = require('./objects/DataExtensionRow');
var Email = require('./objects/Email');
var Folder = require('./objects/Folder');
var List = require('./objects/List');
var ListSubscriber = require('./objects/ListSubscriber');
var Subscriber = require('./objects/Subscriber');
var TriggeredSend = require('./objects/TriggeredSend');
var BounceEvent = require('./objects/BounceEvent');
var ClickEvent = require('./objects/ClickEvent');
var OpenEvent = require('./objects/OpenEvent');
var SentEvent = require('./objects/SentEvent');
var UnsubEvent = require('./objects/UnsubEvent');



function modifyOptions(options) {
	//allow options to just be a uri
	if (typeof(options) === 'string') options = {uri:options, headers:{}};
	if (!options.headers) options.headers = {};
	//add a special header here indicating call is from this sdk.
	options.headers[pkg.name] = 'rest-' + pkg.version;
	return options;
};


//****************************************************************************************
//								Overrides
//****************************************************************************************

// Override the instance methods
var orig_Get = FuelRest.prototype.get;
FuelRest.prototype.get = function(options, callback){
	options = modifyOptions(options);
	return orig_Get.call(this, options, callback);
};

var orig_Post = FuelRest.prototype.post;
FuelRest.prototype.post = function(options, callback){
	options = modifyOptions(options);
	return orig_Post.call(this, options, callback);
};

var orig_Put = FuelRest.prototype.put;
FuelRest.prototype.put = function(options, callback){
	options = modifyOptions(options);
	return orig_Put.call(this, options, callback);
};

var orig_Patch = FuelRest.prototype.patch;
FuelRest.prototype.patch = function(options, callback){
	options = modifyOptions(options);
	return orig_Patch.call(this, options, callback);
};

var orig_Delete = FuelRest.prototype.delete;
FuelRest.prototype.delete = function(options, callback){
	options = modifyOptions(options);
	return orig_Delete.call(this, options, callback);
};



//****************************************************************************************
//								ET_Client
//****************************************************************************************

var ET_Client = function(id, secret, stack) {
	
	this.FuelAuthClient = this.initAuth(id, secret);
	this.RestClient = this.initRest(this.FuelAuthClient);
	this.SoapClient = this.initSoap(this.FuelAuthClient, stack);
	
};

ET_Client.prototype.initAuth = function(id, secret) {

	// Initialization with extra options
	var accessToken  = "";
	var refreshToken = "";

	return new FuelAuth({
		clientId: id // required
		, clientSecret: secret // required
		, accessToken: accessToken
		, refreshToken: refreshToken
	});
};
	
ET_Client.prototype.initRest = function() {
	var options;
	if (typeof(arguments[0]) === 'object') {
		options = {auth:arguments[0]};
	} else {
		options  = {
			auth: {
				// options you want passed when Fuel Auth is initialized
				clientId: arguments[0]
				,clientSecret: arguments[1]
			}
		};		
	}
	return new FuelRest(options);
};
	
ET_Client.prototype.initSoap = function(id, secret, stack) {
	var options, stack;
	if (typeof(arguments[0]) === 'object') {
		options = {auth:arguments[0]};
		stack = arguments[1];
		stack = stack ? stack + '.' : '';
		options.soapEndpoint = 'https://webservice.'+ stack +'exacttarget.com/Service.asmx';
	} else {
		stack = arguments[2];
		stack = stack ? stack + '.' : '';		
		options  = {
			auth: {
				// options you want passed when Fuel Auth is initialized
				clientId: arguments[0]
				,clientSecret: arguments[1]
			}
			,soapEndpoint: 'https://webservice.'+ stack +'exacttarget.com/Service.asmx'
		};		
	}

	return new FuelSoap( options );	
};




//****************************************************************************************
//								Object Factory
//****************************************************************************************

ET_Client.prototype.Campaign = function(options) {
	return new Campaign(this, options);
};

ET_Client.prototype.CampaignAsset = function(options) {
	return new CampaignAsset(this, options);
};

ET_Client.prototype.ContentArea = function(options) {
	return new ContentArea(this, options);
};

ET_Client.prototype.DataExtension = function(options) {
	return new DataExtension(this, options);
};
	
ET_Client.prototype.DataExtensionColumn = function(options) {
	return new DataExtensionColumn(this, options);
};	

ET_Client.prototype.DataExtensionRow = function(options) {
	return new DataExtensionRow(this, options);
};

ET_Client.prototype.Email = function(options) {
	return new Email(this, options);
};

ET_Client.prototype.Folder = function(options) {
	return new Folder(this, options);
};

ET_Client.prototype.List = function(options) {
	return new List(this, options);
};

ET_Client.prototype.ListSubscriber = function(options) {
	return new ListSubscriber(this, options);
};

ET_Client.prototype.Subscriber = function(options) {
	return new Subscriber(this, options);
};

ET_Client.prototype.TriggeredSend = function(options) {
	return new TriggeredSend(this, options);
};

ET_Client.prototype.BounceEvent = function(options) {
	return new BounceEvent(this, options);
};

ET_Client.prototype.ClickEvent = function(options) {
	return new ClickEvent(this, options);
};

ET_Client.prototype.OpenEvent = function(options) {
	return new OpenEvent(this, options);
};

ET_Client.prototype.SentEvent = function(options) {
	return new SentEvent(this, options);
};

ET_Client.prototype.UnsubEvent = function(options) {
	return new UnsubEvent(this, options);
};


module.exports = ET_Client;