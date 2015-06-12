var FuelAuth = require( 'fuel-auth' );
var FuelRest = require('fuel-rest');
var FuelSoap = require( 'fuel-soap' );

// Override the instance method
FuelRest.prototype.get = function(){
	//add a special header here indicating this is from the sdk.
	return FuelRest.prototype.get.call(this);
}		

var ET_Client = {

	initAuth: function(id, secret) {

		// Initialization with extra options
		var accessToken  = "";
		var refreshToken = "";

		return new FuelAuth({
			clientId: id // required
			, clientSecret: secret // required
			, accessToken: accessToken
			, refreshToken: refreshToken
		});
	},
	
	initRest: function(id, secret) {
		var options  = {
			auth: {
				// options you want passed when Fuel Auth is initialized
				clientId: id
				, clientSecret: secret
			}
			//, origin: 'https://alternate.rest.endpoint.com' // default --> https://www.exacttargetapis.com
		};

		return new FuelRest(options);
	},
	
	initSoap: function(id, secret, stack) {
		stack = stack ? stack + '.' : '';
		var options = {
			auth: {
				clientId: id
				, clientSecret: secret
			}
			, soapEndpoint: 'https://webservice.'+ stack +'exacttarget.com/Service.asmx'
		};

		return new FuelSoap( options );	
	},
	
	
	
};

module.exports = ET_Client;