const {ID, SECRET, ORIGIN, AUTH_ORIGIN, PROXY_HOST, PROXY_PORT} = process.env;


module.exports = {
    clientId:     ID          || 'XXXXXXXXXXXXXX',
    clientSecret: SECRET      || 'XXXXXXXXXXXXXX',
    origin:       ORIGIN      || 'https://www.exacttargetapis.com',
    authOrigin:   AUTH_ORIGIN || 'https://auth.exacttargetapis.com',
	globalReqOptions: {
        proxy: {
            host:     PROXY_HOST || '127.0.0.1',
            port:     PROXY_PORT || 8888,
            protocol: 'http:'
        },
        rejectUnauthorized: false
    }
};