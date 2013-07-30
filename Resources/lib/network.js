module.exports.getFugitives = function(callback) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		Ti.API.info(this.responseText);
		callback(JSON.parse(this.responseText));
	}
	xhr.open('GET', 'http://bountyhunterapp.appspot.com/bounties');
	xhr.send();
}

module.exports.bustFugitive = function(UUID, callback) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(){
		callback(JSON.parse(this.responseText));
	}
	xhr.open('POST', 'http://bountyhunterapp.appspot.com/bounties');
	xhr.send({udid: UUID});
}
