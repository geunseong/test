exports.command = function(project_name) {
	this
		.click('#main_file_toolbar [action=open_project]')
		.waitForElementVisible('#dlg_open_project', 3000)
		.pause(2000)
        .waitForElementVisible('#project_open_list', 3000)
		.click('#project_open_list > div[id$='+ project_name+'] > a')
        .click('#g_op_btn_ok')
        .waitForElementNotVisible('#dlg_open_project', 3000)
		.pause(2000)
	return this;
};