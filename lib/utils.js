
exports.info = function() {
	console.log.apply(null, [ time() ].concat([].slice.apply(arguments)));
};

exports.error = function() {
	console.error.apply(null, [ time() ].concat([].slice.apply(arguments)));
};

var time = function() {
	var d = new Date();
	return '[' + (1900 + d.getYear()) + '/' + (1+d.getMonth()) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ']';
};
