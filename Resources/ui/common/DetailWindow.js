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
		height: Ti.UI.SIZE,
		font: {
			fontSize: 18,
			fontWeight: 'bold'
		}
	}));
	
	var imageView = Ti.UI.createImageView({
		image: (data.url === null)?'/images/burglar.png':data.url,
		width: 150,
		height: 150,
		top: 10
	});
	self.add(imageView);
	
	var addPhotoButton = Ti.UI.createButton({
		title: L('add_photo'),
		top: 10,
		height: Ti.UI.SIZE,
		width: 200
	});
	addPhotoButton.addEventListener('click', function(){
		var gallary = Ti.Media.openPhotoGallery({
			allowEditing: true,
			animated: true,
			autohide: true,
			cancel: function(e){
				Ti.API.info('Cancel button pressed');
			},
			success: function(e){
				Ti.API.info('successfully received an image');
				var image = e.media;
				imageView.image = image;
				
				var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'photo_'+data.id+'.png');
				file.write(image, false);
				
				var db = require('/lib/db');
				db.addPhoto(data.id, file.nativePath);
			},
			error: function(e){
				Ti.API.info('Oh crap!')
			},
			mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	});
	self.add(addPhotoButton);
	
	if(!data.captured) {
		var captureButton = Ti.UI.createButton({
			title: L('capture'),
			top: 10,
			height: Ti.UI.SIZE,
			width: 200
		});
		captureButton.addEventListener('click', function(){
			Ti.Geolocation.setPurpose('Tracking down the criminal scum..!');
			
			var db = require('/lib/db');
			var lat, lon;
			
			if(Ti.Geolocation.locationServicesEnabled){
				if(Ti.Platform.osname === 'android') {
					Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
				} else {
					Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
				}
				
				Ti.Geolocation.getCurrentPosition(function(e) {
					if(!e.error) {
						var lon = e.coords.longitude;
						var lat = e.coords.latitude;
						db.bust(data.id, lat, lon);
						
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
					}
					else {
						Ti.UI.createAlertDialog({
							title: "Geo Error",
							message: "Cannot get geo-location!!"
						}).show();
					}
				});
			}
			
			
		});
		
		self.add(captureButton);
	}
	else {
		var showMapButton = Ti.UI.createButton({
			title: L('show_on_map'),
			top: 10,
			width: 200,
			height: Ti.UI.SIZE
		});
		showMapButton.addEventListener('click', function(e){
			var MapWindow = require('ui/common/MapWindow');
			var mapView = new MapWindow(data);
			mapView.open({modal: true});
		});
		self.add(showMapButton);
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
