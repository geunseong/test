exports.command = function(file_name) {
	file_name = file_name.split('/');
	this
        .click('#main-menu-file > a')
        .waitForElementPresent('#main-menu-file.open', 2000)
        .click("#main-menu-file a[action=save_file]")
        .pause(2000)
	return this;
};