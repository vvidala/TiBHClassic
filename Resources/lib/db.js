var db = Ti.Database.open('TiBountyHunter');
db.execute('CREATE TABLE IF NOT EXISTS fugitives(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, captured INTEGER);');
db.close();

function list(isAtLarge) {
	var db = Ti.Database.open('TiBountyHunter');
	var cur = db.execute('SELECT * FROM fugitives where captured = ?', (isAtLarge)?0:1);
	var rows = [];
	while(cur.isValidRow()) {
		var opts = {
			title: cur.fieldByName('name'),
			captured: (Number(cur.fieldByName('captured')) === 1),
			id: cur.fieldByName('id'),
			hasChild:true,
			color: '#fff'
		}
		rows.push(Ti.UI.createTableViewRow(opts));
		cur.next();
	}
	cur.close();
	db.close();
	
	return rows;
}

function add(name) {
	var db = Ti.Database.open('TiBountyHunter');
	db.execute('INSERT INTO fugitives(name, captured) values (?, 0);', name);
	db.close();
	
	Ti.App.fireEvent('db_updated');
}

function del(id) {
	var db = Ti.Database.open('TiBountyHunter');
	db.execute('DELETE FROM fugitives WHERE id = ?;', id);
	db.close();
	
	Ti.App.fireEvent('db_updated');
}

function bust(id) {
	var db = Ti.Database.open('TiBountyHunter');
	db.execute('UPDATE fugitives SET captured = 1 where id = ?;', id);
	db.close();
	
	Ti.App.fireEvent('db_updated');
}

exports.list = list
exports.add = add
exports.del = del
exports.bust = bust