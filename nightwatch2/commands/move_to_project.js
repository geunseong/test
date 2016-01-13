exports.command = function(project_name) {
	this
		.click('#project_selectbox')
		.waitForElementPresent('#project_selector .open', 2000)
		.click('[project_path$=' + project_name + ']')
		.pause(2000)
		.waitForElementNotVisible('#dlg_loading_bar', 10000)
	return this;
};