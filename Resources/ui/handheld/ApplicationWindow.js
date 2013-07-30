function ApplicationWindow(isAtLarge) {
	var NewWindow = require('/ui/common/AddWindow');
	
	if(isAtLarge === undefined) {
		isAtLarge = true;
	}
	var title = (isAtLarge)?L('fugitives'):L('captured');
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundImage:'/images/grain.png',
		backgroundColor:'#666',
		barColor: '#6d0a0c',
		navBarHidden: false,
		fullScreen: true
	});
	
	var BountyTable = require('/ui/common/BountyTable');
	var table = new BountyTable(isAtLarge);
	self.add(table);
	
	table.addEventListener('click', function(e){
		var DetailWindow = require('/ui/common/DetailWindow');
		self.containingTab.open(new DetailWindow(e.rowData));
	});
	
	if(Ti.Platform.osname === 'iphone') {
		var button = Ti.UI.createButton({
			title:'Add'
		});
		
		button.addEventListener('click', function(e){
			self.containingTab.open(new NewWindow);
		})
		
		self.setRightNavButton(button);
	}
	
	return self;
};

module.exports = ApplicationWindow;
