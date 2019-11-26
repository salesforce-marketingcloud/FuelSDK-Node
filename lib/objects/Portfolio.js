var util = require('util');
var helpers = require('../helpers');
  
/*
https://code.exacttarget.com/apis-sdks/fuel-sdks/folders/folder-create.html
*/  

var Portfolio = function (parent, options) {
  
  this.parent = parent;
  this.objName = 'Portfolio';
  
  this.config = options;
  options = options || {};
  this.options = options.options || {};
  this.props = options.props || {};   //props corresponds to the Objects attribute in the SOAP envelope.
};


Portfolio.prototype.post = function(cb) {
  this.parent.SoapClient.create(
    this.objName,
    this.props,
    this.options,
    cb
  );
};


Portfolio.prototype.get = function(cb) {
  var filter = {filter: this.config.filter} || null;

  if (!this.props || helpers.isEmpty(this.props)) {
    cb({error: 'A property list is required for Content Area retrieval.', documentation: 'https://code.exacttarget.com/apis-sdks/fuel-sdks/content-areas/content-area-retrieve.html'});
  } else {
    this.parent.SoapClient.retrieve(
      this.objName,
      this.props,
      filter,
      cb
    );
  }   
};


Portfolio.prototype.patch = function(cb) {
  this.parent.SoapClient.update(
    this.objName,
    this.props,
    this.options,
    cb
  );
};


Portfolio.prototype.delete = function(cb) {
  this.parent.SoapClient.delete(
    this.objName,
    this.props,
    this.options,
    cb
  );
};



module.exports = Portfolio;
