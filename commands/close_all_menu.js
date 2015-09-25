exports.command = function(file_name) {
	file_name = file_name.split('/');
	this
		.click('#main-menu-file > a')
		.waitForElementPresent('#main-menu-file.open', 2000)
		.click("#main-menu-file a[action=close_all]")
		//need test for checking if it is closed or not
	return this;
};