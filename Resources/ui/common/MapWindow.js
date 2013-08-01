function MapWindow(obj) {
	var win = Ti.UI.createWindow({
		backgroundColor: '#ffffff',
		barColor: '#6d0a0c',
		title: 'Busted At'
	});
	var ann = Ti.Map.createAnnotation({
		latitude: obj.capturedLat,
		longitude: obj.capturedLon,
		title: obj.name,
		subtitle: L('busted'),
		pincolor:Ti.Map.ANNOTATION_RED,
		animate: true
	});
	
	var mapView = Ti.Map.createView({
		mapType: Ti.Map.STANDARD_TYPE,
		region: {
			latitude: obj.capturedLat, 
			longitude: obj.capturedLon,
			latitudeDelta: 0.1,
			longitudeDelta: 0.1
		},
		animate: true,
		regionFit: true,
		userLocation: false,
		annotations: [ann]
	});
	win.add(mapView);
	var os = Ti.Platform.osname;
	if( os == 'iphone' || os == 'ipad') {
		var b = Ti.UI.createButton({
			title: 'Close',
			style: Ti.UI.iPhone.SystemButtonStyle.PLAIN
		});
		b.addEventListener('click', function(e){
			win.close({animated: true});
		});
		win.setLeftNavButton(b);
	}
	return win;
}

module.exports = MapWindow;
