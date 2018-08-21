const {ID, SECRET, ORIGIN} = process.env;


module.exports = {
    clientId:     ID     || '',
    clientSecret: SECRET || '',
    origin:       ORIGIN || 'https://www.exacttargetapis.com'
};