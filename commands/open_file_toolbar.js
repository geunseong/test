exports.command = function(file_name) {
	file_name = file_name.split('/');
	this
		.click('#main_file_toolbar [action=open_file]')
		.waitForElementVisible('#dlg_open_file', 3000)
		.pause(2000)
		.click('#file_open_dir_tree > ul > li > div')
		.pause(1000)
	for(var i = 0; i<file_name.length; i++) {
		this
			.waitForElementVisible('#file_open_files [filename="' + file_name[i] + '"]', 8000, false, function(e){console.log(e)})
			.click('#file_open_files [filename="' + file_name[i] + '"]')
			.pause(1000)
			.keys([this.Keys.ENTER])
			.pause(300)
			.keys(this.Keys.NULL)
	}
	this
		.click('#dlg_open_file .close') //if it didn't be closed yet 
		.waitForElementVisible('div.ui-dialog', 5000)
	return this;
};