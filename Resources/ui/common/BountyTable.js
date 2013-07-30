function BountyTable(/*Boolean*/ _isAtLarge) {
	var self = Ti.UI.createTableView({
		backgroundColor:'transparent'
	});
	
	self.addRow = function (title){
		var row = Ti.UI.createTableViewRow({
			title: title,
			hasChild: true,
			captured: false,
			color: 'white',
			height: Ti.UI.SIZE
		});
		self.appendRow(row);
	}
	
	function populateData() {
		var db = require('/lib/db');
		self.setData(db.list(_isAtLarge));
	}
	Ti.App.addEventListener('db_updated', populateData);
	populateData();
	
	return self;
}


module.exports = BountyTable;