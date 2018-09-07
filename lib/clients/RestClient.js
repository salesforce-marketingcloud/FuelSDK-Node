const FuelRest = require('fuel-rest');
const pkg = require('../../package.json');
const querystring = require('querystring');


function RestClient({clientId, clientSecret, origin, authOrigin}) {

    const authUrl = `${authOrigin}/v1/requestToken`;
    const client = new FuelRest({auth: {clientId, clientSecret, authUrl}, origin});
    client.origin = origin;

    // OVERRIDE METHODS
    ['get', 'post', 'put', 'patch', 'delete'].forEach(method => { // for each method
        client[method] = function (options, callback) {
            options = _modifyRestOptions(options, origin);
            return FuelRest.prototype[method]
                .call(this, options, callback)
                .then(_rejectIfInvalidStatusCode)
                .catch(_overrideBadError);
        };
    });

    return client;
}


function _modifyRestOptions(options, origin) {
    //allow options to just be a uri
    if (typeof(options) === 'string') options = {uri: options, headers: {}};
    if (!options.uri.includes('http')) {
        options.uri = origin + options.uri;
    }
    if (!options.headers) options.headers = {};
    if (options.data) {
        options.body = options.data;
        delete options.data;
    }
    //add a special header here indicating call is from this sdk.
    options.headers[pkg.name] = 'rest-' + pkg.version;
    if (options.body && typeof options.body !== 'string') { // stringify body if exist and is not yet stringified
        options.body = JSON.stringify(options.body);
    }
    if (options.params) { // stringify body if exist and is not yet stringified
        options.uri += '?' + querystring.stringify(props);
    }
    return options;
}

function _rejectIfInvalidStatusCode(response) {
    if (response.res.statusCode >= 300) {
        return Promise.reject(response.body);
    }
    return Promise.resolve(response);
}

function _overrideBadError(err) {
    if (err.message === 'API did not return JSON') { // should be fixed on fuel-rest package instead
        return Promise.resolve({res: {}});
    }
    return Promise.reject(err);
}


module.exports = RestClient;