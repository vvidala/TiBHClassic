function ApplicationWindow(isAtLarge) {
	if(isAtLarge === undefined) {
		isAtLarge = true;
	}
	var title = (isAtLarge)?L('fugitives'):L('captured');
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	
	return self;
};

module.exports = ApplicationWindow;
