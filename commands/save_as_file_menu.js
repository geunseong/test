exports.command = function(file_name) {
	file_name = file_name.split('/');
	this
        .click('#main-menu-file > a')
        .waitForElementPresent('#main-menu-file.open', 2000)
        .click("#main-menu-file a[action=save_file]")
       	.waitForElementVisible("#dlg_save_as_file", 2000)
        .setValue('#file_save_as_target_name', file_name)
        .click('#g_saf_btn_ok')
        .waitForElementNotVisible("#dlg_save_as_file", 10000)
	return this;
};