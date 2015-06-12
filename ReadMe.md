# fuelsdk-node

## Example REST Usage:

<pre>
var express     = require( 'express' );
var restRouter = express.Router();
var config = require( 'config' );
var ET_Client = require( 'fuelsdk-node' );


var clientId = process.env.CID ? process.env.CID : config.auth.clientId; 
var clientSecret = process.env.CSEC ? process.env.CSEC : config.auth.clientSecret;
var RestClient = ET_Client.initRest(clientId,clientSecret);


// setting up routes
restRouter.get( '/test-rest', function( req, res ) {

	RestClient
		.get({uri: '/platform/v1/endpoints'})
		.then(function(response) {
			res.status(response.res.statusCode).send( response.body );
		}.bind(this))
		.catch(function(err) {
			res.status(500).send( err ); 
	
});

// exporting the router
module.exports = restRouter;
</pre>

## Example SOAP Usage:

<pre>
var express     = require( 'express' );
var soapRouter = express.Router();
var config = require( 'config' );
var ET_Client = require( 'fuelsdk-node' );

var clientId = process.env.CID ? process.env.CID : config.auth.clientId; 
var clientSecret = process.env.CSEC ? process.env.CSEC : config.auth.clientSecret;
var stack = process.env.STK ? process.env.STK : config.auth.stack;
var SoapClient = ET_Client.initSoap(clientId,clientSecret,stack);

// setting up routes
soapRouter.get( '/test-soap', function( req, res ) {
	
	var options = {
		filter: {
			leftOperand: 'Name',
			operator: 'equals',
			rightOperand: 'test'
		}
	};

	SoapClient.retrieve(
		'Email',
		["ID", "Name", "Subject", "CategoryID", "EmailType"],
		options,
		function( err, response ) {
			if ( err ) {
				res.status(500).send( err );
			}
			res.status(200).send( response.body );
		}
	);	
	
});


// exporting the router
module.exports = soapRouter;
</pre>