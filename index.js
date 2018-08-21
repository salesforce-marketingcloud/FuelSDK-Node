const ET_Client = require('./lib/ET_Client');

const client = new ET_Client('kqjk9g3xp9ovsl7kdsf0yjsa', 'hdSyG3FOhQqKLcSSvF5BS7ll');

    // SOAP EXAMPLE
    // client.list({props: ["ListName", "CustomerKey", "ID"]}).get((err, response) => {
    //     console.log(`response.body.Results`, response.body.Results);
    // });

    // REST EXAMPLE
    client.campaign().list((err, response) => {
        console.log(`response.body`, response.body);
    });
// });

