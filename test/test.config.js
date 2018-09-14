const {ID, SECRET, ORIGIN, AUTH_ORIGIN} = process.env;


module.exports = {
    clientId:     ID          || '',
    clientSecret: SECRET      || '',
    origin:       ORIGIN      || '',
    authOrigin:   AUTH_ORIGIN || ''
};