# fuelsdk-node

## Example Client Setup:

<pre>
var ET_Client = require( 'fuelsdk-node' );
var config = require( 'config' );

var clientId = process.env.CID ? process.env.CID : config.auth.clientId; 
var clientSecret = process.env.CSEC ? process.env.CSEC : config.auth.clientSecret;
var stack = process.env.STK ? process.env.STK : config.auth.stack;

var IET_Client = new ET_Client(clientId,clientSecret,stack);
//load up the first token.
IET_Client.FuelAuthClient.getAccessToken(IET_Client.FuelAuthClient); //second param here can be a callback. or you change this to use promises like fuel-rest.

module.exports = IET_Client;
</pre>


## Example REST Usage:

<pre>
var ET_Client = require( '../lib/IET_Client' );

// setting up routes
restRouter.get( '/test-rest', function( req, res ) {

	ET_Client.RestClient
		.get('/platform/v1/endpoints')
		.then(function(response) {
			response && res.status(response.res.statusCode).send( response.body );
		}.bind(this))
		.catch(function(err) {
			res.status(500).send( err ); //this is only hit if the error is thrown somewhere in a promise chain. Other errors will naturally return a 500 and the error message.
		}.bind(this));	
	
});
</pre>

## Example SOAP Usage:

<pre>
var ET_Client = require( '../lib/IET_Client' );

// setting up routes
soapRouter.get( '/test-soap', function( req, res ) {
	
	var options = {
		filter: {
			leftOperand: 'Name',
			operator: 'equals',
			rightOperand: 'test'
		}
	};

	ET_Client.SoapClient.retrieve(
		'Email',
		["ID", "Name", "Subject", "CategoryID", "EmailType"],
		options,
		function( err, response ) {
			if ( err ) {
				res.status(500).send( err );
			}
			response && res.status(200).send( response.body );
		}
	);	
	
});
</pre>