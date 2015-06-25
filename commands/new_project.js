exports.command = function(project_type, detail_type, project_name) {
    this
    	.open_new_project_dialog()
		.click('.project_wizard_first_button[project_type=' + project_type + ']')
		.waitForElementVisible('.project_wizard_second_button[project_type=' + project_type + ']', 10000)
		.click('.project_wizard_second_button[detail_type=' + detail_type + ']')
		.waitForElementVisible('.project_wizard_second_button.selected_button[detail_type=' + detail_type + ']', 10000)
		.click('#g_np_btn_next')
		.waitForElementVisible('#input_project_name', 10000)
		.setValue('#input_project_name', project_name)
		.click('#g_np_btn_ok_template')
		.waitForElementNotVisible('#dlg_new_project', 50000)
		.waitForElementNotVisible('#dlg_loading_bar', 50000)
		.verify.containsText('#selected_project_name', project_name);
    return this;
};