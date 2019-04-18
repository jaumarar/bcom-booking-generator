//const soapy = require('soapy');
var soap = require('soap');
var soapHttp = require('soap/lib/http');
var soapClient = require('soap/lib/client');


/*soap.WSDL.prototype.describeEntries = function () {
    var result = [];

    // ---

    var services = this.describeServices();

    // ---

    for (var serviceName in services) {
        var service = services[serviceName];

        // ---

        for (var portName in service) {
            var port = service[portName];

            // ---

            for (var opName in port) {
                var op = port[opName];

                // ---

                result.push({
                    service: serviceName,
                    port: portName,
                    op: opName,
                    input: op.input,
                    output: op.output
                });
            }
        }
    }

    // ---

    return result;
};*/

let _endpoint = 'http://ws.avantio.local/soap/bcomConnectionServices.php?wsdl';
let _options = {};

var wsdl = new soap.WSDL('', _endpoint, _options);

// ---
/*
wsdl.onReady(function (err, wsdl) {
    if (err) {
        console.log(11, err);
    }

    // ---

    var client = new soapClient.Client(wsdl, _endpoint, _options);

    // ---

    var requests = [];

    // ---

    wsdl.describeEntries().forEach(function (entry) {
        var func = client[entry.service][entry.port][entry.op];

        // ---

        var args = entry.input;

        // ---

        func(args, function () {
            var url = soapHttp.request.url;
            var data = soapHttp.request.data;
            var headers = soapHttp.request.headers;
            var options = soapHttp.request.options;

            // ---

            requests.push({
                method: data ? 'POST' : 'GET',
                uri: url,
                headers: headers,
                body: data
            });
        });
    });

    // ---

    console.log(requests);
});*/

