exports.command = function(file_name) {
	this
		.click('.jstree-node[id$="' + file_name + '"] a')
		.click('#main-menu-file .dropdown-toggle')
		.waitForElementPresent('#main-menu-file.open', 2000)
		.click('#main-menu-file [action=delete_file]')
		.waitForElementVisible('#dlg_confirmation', 2000)
		.click('#g_cfrm_btn_yes')
		.waitForElementNotVisible('#dlg_confirmation', 10000)
		.waitForElementNotPresent('.jstree-node[id$="' + file_name + '"]', 2000)
	return this;
};