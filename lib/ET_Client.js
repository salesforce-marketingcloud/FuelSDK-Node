var FuelAuth = require( 'fuel-auth' );
var FuelRest = require('fuel-rest');
var FuelSoap = require( 'fuel-soap' );

var pkg = require( '../package.json' );

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

var request = require('request');
var merge = require('lodash.merge');
var CacheService = require('./services/CacheService');

//****************************************************************************************
//								REST/SOAP Lib. Overrides
//****************************************************************************************

		//***************** REST ***********************************

function modifyRestOptions(options) {
	//allow options to just be a uri
	if (typeof(options) === 'string') options = {uri:options, headers:{}};
	if (!options.headers) options.headers = {};
	return options;
}

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

function _modifySoapOptions() {
    const args = Array.prototype.slice.call(arguments);
    if (args[2] === null) args.splice(2, 1);
    if (args.length < 4) args.splice(2, 0, {reqOptions: {headers: {}}});
    if (!args[2].reqOptions) args[2].reqOptions = {};
    if (!args[2].reqOptions.headers) args[2].reqOptions.headers = {};
    return args;
}

function _getSoapBaseUrl(client, origin, stack, soapOrigin, auth, globalReqOptions, callback) {    
    const defaultSoapOrigin = 'https://webservice.exacttarget.com/Service.asmx';
    if(auth.authVersion === 2){ // For OAuth2, we will get soap url from the token call 
        callback();
        return;
    }  
    if (soapOrigin) { // if base url fetched, run callback  
        client.requestOptions.uri = soapOrigin;
        callback();
    } else if(typeof stack === 'string') {
        client.requestOptions.uri = `https://webservice.${stack ? stack + '.' : ''}exacttarget.com/Service.asmx`;
        callback();
    } else { // if not, get access token and then the base url
        const cache = new CacheService(client.AuthClient);
        cache.get().then(({url}) => {
            if (url) {
                client.requestOptions.uri = url;
                callback();
            } else {
                const options = merge({}, globalReqOptions);
                client.AuthClient.getAccessToken(options, (err, data) => {
                    if (err) {
                        throw new Error(err);
                    }

                    const {accessToken} = data;
                    client.AuthClient.accessToken = accessToken;
                    const options = merge({}, globalReqOptions, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        },
                        uri: `${client.origin}/platform/v1/endpoints/soap`,
                        method: 'GET',
                        json: true
                    });

                    request(options, (err, response) => {
                        if (err) {
                            throw new Error(err);
                        }
                        let uri = response.body.url;
                        if (err || !response.body.url) {
                            uri = defaultSoapOrigin;
                        }
                        client.requestOptions.uri = uri;
                        cache.write(uri);
                        callback();
                    });
                });
            }
        });
    }
}


//****************************************************************************************
//								ET_Client
//****************************************************************************************
var _id='';
var _secret='';
var _stack='';

var ET_Client = function(clientId, clientSecret, stack, {origin, authOrigin, soapOrigin, authOptions = {}, globalReqOptions = {}} = {}) {

    if (!clientId || !clientSecret) {
        throw new Error('The client clientId and clientSecret props are required.');
    }

    if(authOptions && authOptions.authVersion === 2){
        if(!authOrigin)
            throw new Error('authOrigin (Auth TSE) is mandatory for Auth Version 2 (OAuth2 Authentication)');
    }
    
    if (!origin) {
        origin = 'https://www.exacttargetapis.com';
    }

    if (!authOrigin) {
        authOrigin = 'https://auth.exacttargetapis.com';
    } else {
        stack = undefined; // empty stack if authOrigin is defined
    }

    if (typeof stack === 'string') {
        console.warn('The stack is deprecated. Will be removed on future release. Please use authOrigin property instead.')
    }

	// add user agent globally to the headers
    globalReqOptions.headers = merge({}, globalReqOptions.headers, {'User-Agent': `FuelSDK-Node/${pkg.version}`});

	_id=clientId;
	_secret=clientSecret;
    _stack=stack;
    
    this.FuelAuthClient = this.initAuth(clientId, clientSecret, authOrigin, authOptions, globalReqOptions);
	this.RestClient = this.initRest(this.FuelAuthClient, origin, globalReqOptions);
	this.SoapClient = this.initSoap(this.FuelAuthClient, origin, stack, soapOrigin, globalReqOptions);
};

ET_Client.prototype.initAuth = function(clientId, clientSecret, authOrigin, authOptions, globalReqOptions) {
    var authUrl = '';
    if(authOptions && authOptions.authVersion === 2){
        authUrl = `${authOrigin}/v2/token`;
    } else {
        authUrl = `${authOrigin}/v1/requestToken`;
    }

	// Initialization with extra options
	var accessToken  = "";
	var refreshToken = ""; 

	return new FuelAuth({
		clientId // required
		, clientSecret // required
		, accessToken: accessToken
		, refreshToken: refreshToken
		, globalReqOptions
        , authUrl
        , authOptions: authOptions
	});
};

ET_Client.prototype.initRest = function(auth, origin, globalReqOptions) {
	var client =  new FuelRest({
        auth,
        globalReqOptions,
        headers: globalReqOptions.headers
    });
    client.origin = origin;
	return client;
};

ET_Client.prototype.initSoap = function(auth, origin, stack, soapOrigin, globalReqOptions) {
    const client = new FuelSoap({
		auth,
		headers: globalReqOptions.headers,
		globalReqOptions
    });
    client.origin = origin;
    // OVERRIDE METHODS
    ['create', 'retrieve', 'update', 'delete'].forEach(method => { // for each method
        client[method] = function () {
            const args = _modifySoapOptions.apply(client, arguments); // get modified arguments
            _getSoapBaseUrl(client, origin, stack, soapOrigin, auth, globalReqOptions, () => { // get the custom base url
                FuelSoap.prototype[method].apply(client, args); // override the method
            })
        };
    });

    return client;
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
