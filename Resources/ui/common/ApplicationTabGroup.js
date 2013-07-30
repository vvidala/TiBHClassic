function ApplicationTabGroup() {
	//create module instance
	var self = Ti.UI.createTabGroup();
	self.backgroundColor = '#666';
	var Window = require('/ui/handheld/ApplicationWindow');
	
	//create app tabs
	var win1 = new Window(),
		win2 = new Window(false);
	
	var tab1 = Ti.UI.createTab({
		title: L('fugitives'),
		icon: '/images/fugitives.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('captured'),
		icon: '/images/captured.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	self.addTab(tab1);
	self.addTab(tab2);
	
	if(Ti.Platform.osname === 'android') {
		self.addEventListener('focus', function(e) {
			createMenu();
		});
	}
	
    function createMenu() {
        var activity = self.activity;
        activity.actionBar.title = "TiBHClassic";
        activity.actionBar.displayHomeAsUp = true; 
        activity.invalidateOptionsMenu();
        var NewWindow = require('/ui/common/AddWindow');
        activity.onCreateOptionsMenu = function(e) {
            Ti.API.info(self.activeTab.title + ' onCreateOptionsMenu');
            var menu = e.menu;
            var m1 = menu.add({ 
            	title : L('add'),
            	icon: '/images/ic_action_add_icon.png',
            	visible: 'true',
            	showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
             });
            m1.addEventListener('click', function(e) {
            	//open in tab group to get free title bar (android)
                self.activeTab.open(new NewWindow);
            });
        };
    }
    
    return self;
};

module.exports = ApplicationTabGroup;
