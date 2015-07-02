exports.command = function(file_name) {
	this
		.click('#main_file_toolbar [action=open_file]')
		.waitForElementVisible('#dlg_open_file', 3000)
		.click('#file_open_files [filename="' + file_name + '"]')
		.click('#g_of_btn_ok')
		.waitForElementNotVisible('#dlg_open_file', 3000)
		.waitForElementVisible('div.ui-dialog', 5000)
		.verify.elementPresent('div.ui-dialog')

	return this;
};
