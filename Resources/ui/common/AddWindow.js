function AddWindow(){
	var win =  Ti.UI.createWindow({
		backgroundColor: 'transparent',
		color: 'white',
		title: 'Add Fugitive',
		backgroundImage: 'images/grain.png',
		layout: 'vertical',
		barColor: '#6d0a0c'
	})
	
	var textField = Ti.UI.createTextField({
		hintText: 'Fugitive Name',
		width: 250,
		top: 40,
		height: (Ti.Platform.osname == 'android')?Ti.UI.SIZE:40,
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType: Ti.UI.RETURNKEY_DONE,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		softKeyboardOnFocus:Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS
	});
	win.add(textField);
	
	var saveButton = Ti.UI.createButton({
		title: 'Save',
		top: 20,
		width: 250
	});
	saveButton.addEventListener('click', function(e){
		var db = require('/lib/db');
		db.add(textField.value);
		win.close();
	})
	win.add(saveButton);
	return win;
}

module.exports = AddWindow;
