exports.command = function(file_name) {
	this
		.click('.jstree-node[id$="' + file_name.trim() + '"] a')
		.click('#main-menu-file .dropdown-toggle')
		.waitForElementPresent('#main-menu-file.open', 2000)
		.click('#main-menu-file [action=delete_file]')
		.waitForElementVisible('#dlg_confirmation', 2000)
		.click('#g_cfrm_btn_yes')
		.waitForElementNotVisible('#dlg_confirmation', 10000)
		.pause(1000)
		.waitForElementNotPresent('.jstree-node[id$="' + file_name.trim() + '"]', 5000)
	return this;
};