exports.command = function(file_name) {
	if(!file_name) {
		file_name = Math.random().toString();
	}

	this
		.click('#main_file_toolbar [action=new_file_file]')
		.waitForElementVisible('#dlg_new_file', 2000)
		.setValue('#file_new_target_name', file_name)
		.click('#g_nf_btn_ok')
		.waitForElementNotVisible('#dlg_new_file', 10000)
		.waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
	return this;
};