function DetailWindow(data){
	var self = Ti.UI.createWindow({
		backgroundColor: 'transparent',
		color: 'white',
		title: data.title,
		backgroundImage: 'images/grain.png',
		layout: 'vertical',
		barColor: '#6d0a0c'
	});
	Ti.API.info(JSON.stringify(data));
	
	self.add(Ti.UI.createLabel({
		text: (data.captured)? L('busted'):L('still_at_large'),
		color: "#fff",
		textAlign: 'center',
		top: 10,
		height: Ti.UI.SIZE
	}));
	
	if(!data.captured) {
		var captureButton = Ti.UI.createButton({
			title: L('capture'),
			top: 10,
			height: Ti.UI.SIZE,
			width: 200
		});
		captureButton.addEventListener('click', function(){
			var db = require('/lib/db');
			db.bust(data.id);
			
			var net = require('/lib/network');
			net.bustFugitive(Ti.Platform.macaddress, function(data){
				Ti.UI.createAlertDialog({
					message:data.message
				}).show();
			})
			
			if(Ti.Platform.name == 'android') {
				setTimeout(function() {
					self.close({animated: true});
				}, 2000);
			}
			else {
				self.close({animated: true});
			}
		});
		
		self.add(captureButton);
	}
	
	var deleteButton = Ti.UI.createButton({
		title:L('delete'),
		top: 10,
		height: Ti.UI.SIZE,
		width: 200
	});
	deleteButton.addEventListener('click', function(e) {
		var db = require('/lib/db');
		db.del(data.id);
		self.close({animated: true});
	});
	self.add(deleteButton);
	return self;
}

module.exports = DetailWindow;
