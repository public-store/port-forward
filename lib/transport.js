var net = require('net');
var util = require('util');
var utils = require('./utils');

function Transport(opts) {
    var server = require('./server')(opts);

    var port = opts.client.port;
    server.listen(port, function() {
        utils.info('start listen.. port:', port, ' pid:', process.pid);
    });
}

var getTimeNow = function() {
    return '[' + moment().format('YYYY/MM/DD hh:mm:ss a') + ']';
};

module.exports = Transport;