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


const ET_Client = function ({clientId, clientSecret, origin, authOrigin} = {}) {
    if (!clientId || !clientSecret || !origin || !authOrigin) {
        throw new Error('The client clientId, clientSecret, origin and authOrigin props are required.');
    }
    this.restClient = new RestClient({clientId, clientSecret, origin, authOrigin});
    this.soapClient = new SoapClient({clientId, clientSecret, origin, authOrigin});
    this.campaign = new Campaign(this.restClient);
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


module.exports = ET_Client;