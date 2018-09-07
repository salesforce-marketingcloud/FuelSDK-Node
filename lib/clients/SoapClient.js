const FuelSoap = require('fuel-soap');
const request = require('request');
const pkg = require('../../package.json');


function SoapClient({clientId, clientSecret, origin, authOrigin}) {

    const authUrl = `${authOrigin}/v1/requestToken`;
    const client = new FuelSoap({auth: {clientId, clientSecret, authUrl}});
    client.origin = origin;

    // OVERRIDE METHODS
    ['create', 'retrieve', 'update', 'delete'].forEach(method => { // for each method
        client[method] = function () {
            const args = _modifySoapOptions.apply(client, arguments); // get modified arguments
            _getBaseUrl(client, () => { // get the custom base url
                FuelSoap.prototype[method].apply(client, args); // override the method
            })
        };
    });

    return client;
}


function _modifySoapOptions() {
    const args = Array.prototype.slice.call(arguments);
    if (args[2] === null) args.splice(2, 1);
    if (args.length < 4) args.splice(2, 0, {reqOptions: {headers: {}}});
    if (!args[2].reqOptions) args[2].reqOptions = {};
    if (!args[2].reqOptions.headers) args[2].reqOptions.headers = {};
    args[2].reqOptions.headers[pkg.name] = 'soap-' + pkg.version;
    return args;
}


function _getBaseUrl(client, callback) {
    if (client.baseUrlFetched) { // if base url fetched, run callback
        callback();
    } else { // if not, get access token and then the base url
        client.AuthClient.getAccessToken({}, (err, {accessToken}) => {
            request({
                headers: {
                    'User-Agent': `FuelSDK-Node/soap-${pkg.version}`,
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                uri: `${client.origin}/platform/v1/endpoints/soap`,
                method: 'GET',
                json: true
            }, (err, response) => {
                if (!response.body.url) {
                    throw new Error(response.body.message ? response.body.message : response.body);
                }
                client.requestOptions.uri = response.body.url;
                client.baseUrlFetched = true;
                callback();
            });
        });
    }
}


module.exports = SoapClient;