FuelSDK-Node
============

Salesforce Marketing Cloud Fuel SDK for Node

## Overview ##
The Fuel SDK for Node provides easy access to Salesforce Marketing Cloud's Fuel API Family services, including a collection of REST APIs and a SOAP API. These APIs provide access to Salesforce Marketing Cloud functionality via common collection types. 

## New Features in Version 2.2.0 ##
* **Added support for your tenant's endpoints - [More Details](https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/your-subdomain-tenant-specific-endpoints.htm)

## How to use

##### Step 1. Install the package

```
npm install --save fuelsdk-node
```

##### Step 2. Require the client
```js
const ET_Client = require('fuelsdk-node');
```

##### Step 3. Instantiate the SDK
```js
const client = new ET_Client(clientId, clientSecret, stack);
```
or
```js
const client = new ET_Client(clientId, clientSecret, stack, {origin, authOrigin, soapOrigin}); // stack is ignored
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
