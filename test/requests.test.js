const http = require('http');
const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin, soapOrigin, authOptions, globalReqOptions} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('requests', function () {

	this.timeout(10000);

	const serverPort = 1234;
	const serverErrorPort = 4321;
	const serverMessage = 'Test soap message';
	const serverResponseEnvelope = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:wsa="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"><soap:Body><RetrieveResponseMsg xmlns="http://exacttarget.com/wsdl/partnerAPI"><Message>${serverMessage}</Message><OverallStatus>OK</OverallStatus></RetrieveResponseMsg></soap:Body></soap:Envelope>`;
	const server = http.createServer(function (request, response) {
		response.writeHead(200, {'Content-Type': 'text/xml'});
		response.write(serverResponseEnvelope);
		response.end();
	});

	before(done => server.listen(serverPort, done));

    it('If SOAP origin is changed, it should response accordingly', done => {
        const soapOrigin = `http://127.0.0.1:${serverPort}/`;
        const client = new ET_Client(clientId, clientSecret, null, {origin, authOrigin, soapOrigin, authOptions, globalReqOptions});
        const props = ['ID'];
        client.clickEvent({props}).get((err, response) => {
            if (err) throw new Error(err);
            assert.equal(response.body.Message, serverMessage);
            assert.equal(response.res.req.path, soapOrigin);
            done();
        });
    });

    it('If origin is changed incorrectly and so the soap request fails, it should return default soap endpoint', done => {
        const origin = `http://127.0.0.1:${serverErrorPort}/`;
        const client = new ET_Client(clientId, clientSecret, null, {origin, authOrigin, soapOrigin, authOptions, globalReqOptions});
        const props = ['ID'];
        client.clickEvent({props}).get(err => {
            if (err) throw new Error(err);
            done();
        });
    });

	after(() => server.close());

});