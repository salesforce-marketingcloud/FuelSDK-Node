const Helpers = {

  isEmpty: function (obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  },

  promiseToCallback: (promise, callback) => {
    promise
      .then(response => {
        callback(null, response);
      })
      .catch(err => {
        callback(err, null);
      });
  }


};

module.exports = Helpers;
