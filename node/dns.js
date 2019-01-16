var dns = require("dns");

dns.lookup("www.github.com", function onLookup(err, address, family) {
	console.log("ip地址:" + address);
	console.log(family);

	dns.reverse(address, function(err, hostname) {
		if (err) {
			console.error(err);
		}
		console.log("反响解析ip:" + JSON.stringify(hostname));
	});
});
