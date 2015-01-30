var net = require('net');
var moment = require('moment');

module.exports = function(opts) {
    var server = net.createServer();
    var port = opts.client.port;
    var target = {
        host: opts.server.host,
        port: opts.server.port
    };

    server.on('connection', function(sock) {
        var record = sock.remoteAddress + ':' + sock.remotePort;

        console.log(getTimeNow() + ' Connected: ', record);

        var client = net.createConnection(target.port, target.host, function() {
            console.log(getTimeNow() + ' Transport target connected: ', target.host, target.port);
        });

        /*
         * Data
         */

        sock.on('data', function(data) {
            client.write(data);
        });

        client.on('data', function(data) {
            sock.write(data);
        });

        /*
         * Close
         */

        sock.on('close', function() {
            console.log(getTimeNow() + ' Server Connection Closed record:', this.record);
            client.end();
        }.bind({
            record: record
        }));

        /*
         * Error
         */

        client.on('error', function(e) {
            console.error(getTimeNow() + ' Connect Error:', e.message, ' record:', this.record);
        });

        sock.on('error', function(e) {
            console.error(getTimeNow() + ' Server Error:', e.message, ' record:', this.record);
        }.bind({
            record: record
        }));
    });
    
    return server;
};

var getTimeNow = function() {
    return '[' + moment().format('YYYY/MM/DD hh:mm:ss a') + ']';
};