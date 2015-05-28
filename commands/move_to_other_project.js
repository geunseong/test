exports.command = function(cur_project) {
	this
		.click('#project_selectbox')
		.waitForElementPresent('#project_selector .open', 2000)
		.click('.project_item:not([project_path*=' + cur_project + '])')
		.pause(2000)
		.waitForElementNotVisible('#dlg_loading_bar', 10000)
	return this;
};