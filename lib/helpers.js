/*

Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for(var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};

*/
var util = require('util');


Array.prototype.joinObjAddrs = function() {
    var ret = '';
    //for(var key in this) {
    for (var i=0, len=this.length; i<len; i++) {
        ret += '[' + this[i] + ']';
    }
    return ret;
};

var Helpers = {

	// Speed up calls to hasOwnProperty
	hasOwnProperty: Object.prototype.hasOwnProperty,

	isEmpty: function (obj) {

		// null and undefined are "empty"
		if (obj == null) return true;

		// Assume if it has a length property with a non-zero value
		// that that property is correct.
		if (obj.length > 0)    return false;
		if (obj.length === 0)  return true;

		// Otherwise, does it have any properties of its own?
		// Note that this doesn't handle
		// toString and valueOf enumeration bugs in IE < 9
		for (var key in obj) {
			if (this.hasOwnProperty.call(obj, key)) return false;
		}

		return true;
	}	
	
};

module.exports = Helpers;	