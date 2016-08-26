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

var https = require('https');
var request = require('request');

//****************************************************************************************
//								REST/SOAP Lib. Overrides
//****************************************************************************************

		//***************** REST ***********************************

function modifyRestOptions(options) {
	//allow options to just be a uri
	if (typeof(options) === 'string') options = {uri:options, headers:{}};
	if (!options.headers) options.headers = {};
	//add a special header here indicating call is from this sdk.
	options.headers[pkg.name] = 'rest-' + pkg.version;
	return options;
};

// Override the instance methods
var orig_Get = FuelRest.prototype.get;
FuelRest.prototype.get = function(options, callback){
	options = modifyRestOptions(options);
	return orig_Get.call(this, options, callback);
};

var orig_Post = FuelRest.prototype.post;
FuelRest.prototype.post = function(options, callback){
	options = modifyRestOptions(options);
	return orig_Post.call(this, options, callback);
};

var orig_Put = FuelRest.prototype.put;
FuelRest.prototype.put = function(options, callback){
	options = modifyRestOptions(options);
	return orig_Put.call(this, options, callback);
};

var orig_Patch = FuelRest.prototype.patch;
FuelRest.prototype.patch = function(options, callback){
	options = modifyRestOptions(options);
	return orig_Patch.call(this, options, callback);
};

var orig_Delete = FuelRest.prototype.delete;
FuelRest.prototype.delete = function(options, callback){
	options = modifyRestOptions(options);
	return orig_Delete.call(this, options, callback);
};


		//***************** SOAP ***********************************

function modifySoapOptions() {
	//add a special header here indicating call is from this sdk.
	var _et = new ET_Client(_id,_secret,_stack);
	_et.FuelAuthClient.getAccessToken(_et.FuelAuthClient,function(res){
		request({
			headers:{'User-Agent':'FuelSDK-Node/soap-'+pkg.version, 'Content-Type' : 'application/json'},
			uri:'https://www.exacttargetapis.com/platform/v1/endpoints/soap?access_token='+_et.FuelAuthClient.accessToken,
			method:'GET'
		});
	});
	var args = Array.prototype.slice.call(arguments);
	if (args[2] === null) args.splice(2,1);
	if (args.length < 4) args.splice(2, 0,{reqOptions:{headers:{}}});
	if (!args[2].reqOptions) args[2].reqOptions = {};
	if (!args[2].reqOptions.headers) args[2].reqOptions.headers = {};
	args[2].reqOptions.headers[pkg.name] = 'soap-' + pkg.version;
	return args;
};

var orig_soapCreate = FuelSoap.prototype.create;
FuelSoap.prototype.create = function(){
	args = modifySoapOptions.apply(this,arguments);
	return orig_soapCreate.apply(this, args);
};

var orig_soapRetrieve = FuelSoap.prototype.retrieve;
FuelSoap.prototype.retrieve = function(){
	args = modifySoapOptions.apply(this,arguments);
	return orig_soapRetrieve.apply(this, args);
};

var orig_soapUpdate = FuelSoap.prototype.update;
FuelSoap.prototype.update = function(){
	args = modifySoapOptions.apply(this,arguments);
	return orig_soapUpdate.apply(this, args);
};

var orig_soapDelete = FuelSoap.prototype.delete;
FuelSoap.prototype.delete = function(){
	args = modifySoapOptions.apply(this,arguments);
	console.log(args);
	return orig_soapDelete.apply(this, args);
};



//****************************************************************************************
//								ET_Client
//****************************************************************************************
var _id='';
var _secret='';
var _stack='';

var ET_Client = function(id, secret, stack) {
	_id=id;
	_secret=secret;
	_stack=stack;
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

ET_Client.prototype.campaign = function(options) {
	return new Campaign(this, options);
};

ET_Client.prototype.campaignAsset = function(options) {
	return new CampaignAsset(this, options);
};

ET_Client.prototype.contentArea = function(options) {
	return new ContentArea(this, options);
};

ET_Client.prototype.dataExtension = function(options) {
	return new DataExtension(this, options);
};
	
ET_Client.prototype.dataExtensionColumn = function(options) {
	return new DataExtensionColumn(this, options);
};	

ET_Client.prototype.dataExtensionRow = function(options) {
	return new DataExtensionRow(this, options);
};

ET_Client.prototype.email = function(options) {
	return new Email(this, options);
};

ET_Client.prototype.folder = function(options) {
	return new Folder(this, options);
};

ET_Client.prototype.list = function(options) {
	return new List(this, options);
};

ET_Client.prototype.listSubscriber = function(options) {
	return new ListSubscriber(this, options);
};

ET_Client.prototype.subscriber = function(options) {
	return new Subscriber(this, options);
};

ET_Client.prototype.triggeredSend = function(options) {
	return new TriggeredSend(this, options);
};

ET_Client.prototype.bounceEvent = function(options) {
	return new BounceEvent(this, options);
};

ET_Client.prototype.clickEvent = function(options) {
	return new ClickEvent(this, options);
};

ET_Client.prototype.openEvent = function(options) {
	return new OpenEvent(this, options);
};

ET_Client.prototype.sentEvent = function(options) {
	return new SentEvent(this, options);
};

ET_Client.prototype.unsubEvent = function(options) {
	return new UnsubEvent(this, options);
};


module.exports = ET_Client;