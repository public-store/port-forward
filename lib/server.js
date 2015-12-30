var net = require('net');
var utils = require('./utils');

module.exports = function(opts) {
    var server = net.createServer();
    var port = opts.client.port;
    var target = {
        host: opts.server.host,
        port: opts.server.port
    };

    server.on('connection', function(sock) {
        var record = sock.remoteAddress + ':' + sock.remotePort;

        utils.info('Connected: ', record);

        var client = net.createConnection(target.port, target.host, function() {
            utils.info('Transport target connected: ', target.host, target.port);
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
            utils.info('Server Connection Closed record:', this.record);
            client.end();
        }.bind({
            record: record
        }));

        /*
         * Error
         */
        client.on('error', function(e) {
            utils.error('Connect Error:', e.message, ' record:', this.record);
        });

        sock.on('error', function(e) {
            utils.error('Server Error:', e.message, ' record:', this.record);
        }.bind({
            record: record
        }));
    });

    return server;
};

