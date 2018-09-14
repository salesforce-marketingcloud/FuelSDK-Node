const FuelRest = require('fuel-rest');
const pkg = require('../../package.json');


function RestClient(clientId, clientSecret, origin, authOrigin) {

    const authUrl = `${authOrigin}/v1/requestToken`;
    const client = new FuelRest({auth: {clientId, clientSecret, authUrl}, origin});
    client.origin = origin;

    // OVERRIDE METHODS
    ['get', 'post', 'put', 'patch', 'delete'].forEach(method => { // for each method
        client[method] = function (options, callback) {
            options = _modifyRestOptions(options);
            return FuelRest.prototype[method].call(this, options, callback);
        };
    });

    return client;
}


function _modifyRestOptions(options) {
    //allow options to just be a uri
    if (typeof(options) === 'string') options = {uri: options, headers: {}};
    if (!options.headers) options.headers = {};
    //add a special header here indicating call is from this sdk.
    options.headers[pkg.name] = 'rest-' + pkg.version;
    return options;
}


module.exports = RestClient;