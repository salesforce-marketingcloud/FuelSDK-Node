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

function _modifySoapOptions() {
    const args = Array.prototype.slice.call(arguments);
    if (args[2] === null) args.splice(2, 1);
    if (args.length < 4) args.splice(2, 0, {reqOptions: {headers: {}}});
    if (!args[2].reqOptions) args[2].reqOptions = {};
    if (!args[2].reqOptions.headers) args[2].reqOptions.headers = {};
    args[2].reqOptions.headers[pkg.name] = 'soap-' + pkg.version;
    return args;
}

function _getSoapBaseUrl(client, stack, proxy, callback) {
    if (client.baseUrlFetched) { // if base url fetched, run callback
        callback();
    } else if(typeof stack === 'string') {
        client.requestOptions.uri = `https://webservice.${stack ? stack + '.' : ''}exacttarget.com/Service.asmx`;
        callback();
    } else { // if not, get access token and then the base url
        const options = {};

        if (proxy && proxy.host) {
            options.proxy = proxy;
            options.rejectUnauthorized = false;
        }

        client.AuthClient.getAccessToken(options, (err, {accessToken}) => {
            if (err) {
                throw new Error(err);
            }

            const options = {
                headers: {
                    'User-Agent': `FuelSDK-Node/rest-${pkg.version}`,
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                uri: `${client.origin}/platform/v1/endpoints/soap`,
                method: 'GET',
                json: true
            };

            if (proxy && proxy.host) {
                options.proxy = proxy;
                options.rejectUnauthorized = false;
            }

            request(options, (err, response) => {
                if (err) {
                    throw new Error(err);
                }
                if (!response.body.url) {
                    throw new Error(response.body.message ? response.body.message : response.body);
                }
                client.requestOptions.uri = response.body.url;
                client.baseUrlFetched = true;
                callback();
            });
        });
    }
}



//****************************************************************************************
//								ET_Client
//****************************************************************************************
var _id='';
var _secret='';
var _stack='';

var ET_Client = function(clientId, clientSecret, stack, origin, authOrigin, proxy) {

    if (!clientId || !clientSecret) {
        throw new Error('The client clientId and clientSecret props are required.');
    }

    if (!origin) {
        origin = 'https://www.exacttargetapis.com';
    }

    if (!authOrigin) {
        authOrigin = 'https://auth.exacttargetapis.com';
    } else {
        stack = undefined; // empty stack if authOrigin is defined
    }

	_id=clientId;
	_secret=clientSecret;
	_stack=stack;
	this.FuelAuthClient = this.initAuth(clientId, clientSecret, proxy);
	this.RestClient = this.initRest(this.FuelAuthClient, origin, authOrigin, proxy);
	this.SoapClient = this.initSoap(clientId, clientSecret, origin, authOrigin, stack, proxy);

};

ET_Client.prototype.initAuth = function(id, secret, proxy) {

	// Initialization with extra options
	var accessToken  = "";
	var refreshToken = "";

	return new FuelAuth({
		clientId: id // required
		, clientSecret: secret // required
		, accessToken: accessToken
		, refreshToken: refreshToken
        , proxy
	});
};

ET_Client.prototype.initRest = function(auth, origin, authOrigin, proxy) {
    var authUrl = `${authOrigin}/v1/requestToken`;
	var options = {auth, proxy};
	options.auth.authUrl = authUrl;
	var client =  new FuelRest(options);
	client.origin = origin;
	return client;
};

ET_Client.prototype.initSoap = function(clientId, clientSecret, origin, authOrigin, stack, proxy) {
    const authUrl = `${authOrigin}/v1/requestToken`;
    const client = new FuelSoap({auth: {clientId, clientSecret, authUrl}, proxy});
    client.origin = origin;

    // OVERRIDE METHODS
    ['create', 'retrieve', 'update', 'delete'].forEach(method => { // for each method
        client[method] = function () {
            const args = _modifySoapOptions.apply(client, arguments); // get modified arguments
            _getSoapBaseUrl(client, stack, proxy, () => { // get the custom base url
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

function _getOrigins(args) {
    let origin, authOrigin, stack;

    // if arguments are in the shape: clientId, clientSecret, origin, authOrigin
    if (args.length === 4) {
        origin = args[2];
        authOrigin = args[3];
    }

    // else the arguments are in the old shape: clientId, clientSecret, stack
    else {
        origin = 'https://www.exacttargetapis.com';
        authOrigin = 'https://auth.exacttargetapis.com';
        stack = args[2] || '';
    }

    return {origin, authOrigin, stack};
}

module.exports = ET_Client;