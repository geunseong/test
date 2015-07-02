exports.command = function(file_name) {
	file_name = file_name.split('/');
	this
		.click('#main_file_toolbar [action=open_file]')
		.waitForElementVisible('#dlg_open_file', 3000)
	for(var i = 0; i<file_name.length; i++) {
		this
			.waitForElementVisible('#file_open_files [filename="' + file_name[i] + '"]', 8000, false)
			.moveToElement('#file_open_files [filename="' + file_name[i] + '"]', 30, 30)
			.pause(1000)
			.doubleClick();
	}
	this
		.click('#dlg_open_file .close') //if it didn't be closed yet 
		.waitForElementVisible('div.ui-dialog', 5000)
	return this;
};