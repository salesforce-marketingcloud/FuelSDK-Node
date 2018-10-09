# fuelsdk-node

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
