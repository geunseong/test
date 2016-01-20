exports.command = function(file_name) {
	if(!file_name) {
		file_name = Math.random().toString();
	}
	this
	  .click('#main-menu-file > a')
    .waitForElementPresent('#main-menu-file.open', 2000)
    .moveToElement('#parent_new_menu', 100, 10)
    .waitForElementVisible('#child_new_menu', 1000)
    .click('#child_new_menu li > a[action=new_file_file]')
		.setValue('#file_new_target_name', file_name)
		.click('#g_nf_btn_ok')
		.waitForElementNotVisible('#dlg_new_file', 10000)
		.waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
	return this;
};