// Clients
const RestClient = require('./clients/RestClient');
const SoapClient = require('./clients/SoapClient');

// Objects
const Campaign = 			      require('./objects/Campaign');
const CampaignAsset = 		  require('./objects/CampaignAsset');
const ContentArea = 		    require('./objects/ContentArea');
const DataExtension = 		  require('./objects/DataExtension');
const DataExtensionColumn = require('./objects/DataExtensionColumn');
const DataExtensionRow = 	  require('./objects/DataExtensionRow');
const Email = 				      require('./objects/Email');
const Folder = 				      require('./objects/Folder');
const List = 				        require('./objects/List');
const ListSubscriber = 		  require('./objects/ListSubscriber');
const Subscriber = 			    require('./objects/Subscriber');
const TriggeredSend = 		  require('./objects/TriggeredSend');
const BounceEvent = 		    require('./objects/BounceEvent');
const ClickEvent = 			    require('./objects/ClickEvent');
const OpenEvent = 			    require('./objects/OpenEvent');
const SentEvent = 			    require('./objects/SentEvent');
const UnsubEvent = 			    require('./objects/UnsubEvent');


class ET_Client {
  
  constructor(clientId, clientSecret, stack = '', origin, authOrigin) {
    
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

    this.restClient = new RestClient({clientId, clientSecret, origin, authOrigin});
    this.soapClient = new SoapClient({clientId, clientSecret, origin, authOrigin, stack});
    
  }

  campaign(options) {
    return new Campaign(this.restClient, options);
  }

  campaignAsset(options) {
    return new CampaignAsset(this.restClient, options);
  }

  contentArea(options) {
    return new ContentArea(this.soapClient, options);
  }

  dataExtension(options) {
    return new DataExtension(this.soapClient, options);
  }

  dataExtensionColumn(options) {
    return new DataExtensionColumn(this.soapClient, options);
  }

  dataExtensionRow(options) {
    return new DataExtensionRow(this.soapClient, options);
  }

  email(options) {
    return new Email(this.soapClient, options);
  }

  folder(options) {
    return new Folder(this.soapClient, options);
  }

  list(options) {
    return new List(this.soapClient, options);
  }

  listSubscriber(options) {
    return new ListSubscriber(this.soapClient, options);
  }

  subscriber(options) {
    return new Subscriber(this.soapClient, options);
  }

  triggeredSend(options) {
    return new TriggeredSend(this.soapClient, options);
  }

  bounceEvent(options) {
    return new BounceEvent(this.soapClient, options);
  }

  clickEvent(options) {
    return new ClickEvent(this.soapClient, options);
  }

  openEvent(options) {
    return new OpenEvent(this.soapClient, options);
  }

  sentEvent(options) {
    return new SentEvent(this.soapClient, options);
  }

  unsubEvent(options) {
    return new UnsubEvent(this.soapClient, options);
  }

}


module.exports = ET_Client;
