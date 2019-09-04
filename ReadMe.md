FuelSDK-Node
============

Salesforce Marketing Cloud Fuel SDK for Node

## Overview ##
The Fuel SDK for Node provides easy access to Salesforce Marketing Cloud's Fuel API Family services, including a collection of REST APIs and a SOAP API. These APIs provide access to Salesforce Marketing Cloud functionality via common collection types. 

## Latest Version 2.4.0 ##
* Added support for Public/Web App OAuth2 Authentication. For more details, Check the How to use Section of Readme. 

## Version 2.3.1 ##
Bumped [js-yaml](https://github.com/nodeca/js-yaml) from 3.12.0 to 3.13.1.

## Version 2.3.0 ##
* Added support for OAuth2 Authentication - [More Details](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/access-token-s2s.htm)

## Version 2.2.0 ##
* Added support for your tenant's endpoints - [More Details](https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/your-subdomain-tenant-specific-endpoints.htm)

## How to use

##### Step 1. Install the package

```
npm install --save sfmc-fuelsdk-node
```

##### Step 2. Require the client
```js
const ET_Client = require('sfmc-fuelsdk-node');
```

##### Step 3. Instantiate the SDK
```js
const client = new ET_Client(clientId, clientSecret, stack);
```
or
```js
const client = new ET_Client(clientId, clientSecret, stack, {origin, authOrigin, soapOrigin}); // stack is ignored
```
##### or (For OAuth2 - Origin/AuthOrigin/SoapOrigin should be your [Tenant Specific Endpoints](https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/your-subdomain-tenant-specific-endpoints.htm). AuthOrigin is mandatory)
```js
const client = new ET_Client(clientId, clientSecret, stack, {origin, authOrigin, soapOrigin, 
authOptions = { authVersion = 2, accountId = <<TARGET_BUSINESS_UNIT>>, scope = <<DATA_ACCESS_PERMISSIONS>>, applicationType = <<public||web||server>>, redirectURI = <<REDIRECT_URL_FOR_PUBLIC/WEB_APP, authorizationCode = <<AUTH_CODE_FOR_PUBLIC/WEB_APP>>}
}); 
```
##### Step 4. Consume the objects
```js
const props = {
  name: 'Some test campaign name',
  description: 'Campaign description'
};
client.campaign({props}).post((err, response) => {
  // code
});
```

## Available objects in this version:

* Campaign
* Campaign Asset
* Content Area
* Data Extension
* Data Extension Column
* Data Extension Row
* Email
* Folder
* List
* List Subscriber
* Subscriber
* Triggered Send
* Bounce Event
* Click Event
* Open Event
* Sent Event
* Unsub Event


## Usage:

See https://github.com/salesforcefuel/node-sdk-backbone-app for examples.
