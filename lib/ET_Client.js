// Clients
const RestClient = require('./clients/RestClient');
const SoapClient = require('./clients/SoapClient');

// Objects
const Campaign = 			require('./objects/Campaign');
const CampaignAsset = 		require('./objects/CampaignAsset');
const ContentArea = 		require('./objects/ContentArea');
const DataExtension = 		require('./objects/DataExtension');
const DataExtensionColumn = require('./objects/DataExtensionColumn');
const DataExtensionRow = 	require('./objects/DataExtensionRow');
const Email = 				require('./objects/Email');
const Folder = 				require('./objects/Folder');
const List = 				require('./objects/List');
const ListSubscriber = 		require('./objects/ListSubscriber');
const Subscriber = 			require('./objects/Subscriber');
const TriggeredSend = 		require('./objects/TriggeredSend');
const BounceEvent = 		require('./objects/BounceEvent');
const ClickEvent = 			require('./objects/ClickEvent');
const OpenEvent = 			require('./objects/OpenEvent');
const SentEvent = 			require('./objects/SentEvent');
const UnsubEvent = 			require('./objects/UnsubEvent');


const ET_Client = function (clientId, clientSecret) {

    if (!clientId || !clientSecret) {
        throw new Error('The client clientId and clientSecret props are required.');
    }

    const {origin, authOrigin, stack} = _getOrigins(arguments);
    if (!origin || !authOrigin) {
        throw new Error('The origin and authOrigin props are required.');
    }

    this.restClient = new RestClient(clientId, clientSecret, origin, authOrigin);
    this.soapClient = new SoapClient(clientId, clientSecret, origin, authOrigin, stack);
};

ET_Client.prototype.campaign = function (options) {
    return new Campaign(this, options);
};

ET_Client.prototype.campaignAsset = function (options) {
    return new CampaignAsset(this, options);
};

ET_Client.prototype.contentArea = function (options) {
    return new ContentArea(this, options);
};

ET_Client.prototype.dataExtension = function (options) {
    return new DataExtension(this, options);
};

ET_Client.prototype.dataExtensionColumn = function (options) {
    return new DataExtensionColumn(this, options);
};

ET_Client.prototype.dataExtensionRow = function (options) {
    return new DataExtensionRow(this, options);
};

ET_Client.prototype.email = function (options) {
    return new Email(this, options);
};

ET_Client.prototype.folder = function (options) {
    return new Folder(this, options);
};

ET_Client.prototype.list = function (options) {
    return new List(this, options);
};

ET_Client.prototype.listSubscriber = function (options) {
    return new ListSubscriber(this, options);
};

ET_Client.prototype.subscriber = function (options) {
    return new Subscriber(this, options);
};

ET_Client.prototype.triggeredSend = function (options) {
    return new TriggeredSend(this, options);
};

ET_Client.prototype.bounceEvent = function (options) {
    return new BounceEvent(this, options);
};

ET_Client.prototype.clickEvent = function (options) {
    return new ClickEvent(this, options);
};

ET_Client.prototype.openEvent = function (options) {
    return new OpenEvent(this, options);
};

ET_Client.prototype.sentEvent = function (options) {
    return new SentEvent(this, options);
};

ET_Client.prototype.unsubEvent = function (options) {
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