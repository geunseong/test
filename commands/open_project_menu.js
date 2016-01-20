exports.command = function() {
	this
    .getAttribute('#my_projects_header + li', 'project_path', function (result) {
        var project_path = result.value;
        var project_name = project_path.split("_").pop();
	this
		.click('#main-menu-file > a')
		.waitForElementPresent('#main-menu-file.open', 2000)
		.click('#main-menu-file a[action=open_project]')
		.waitForElementVisible('#dlg_open_project', 3000)
		.pause(2000)
    .waitForElementVisible('#project_open_list', 3000)
 		.click('#project_open_list .selector_project:first-of-type')
		.click('#g_op_btn_ok')
    .waitForElementNotVisible('#dlg_open_project', 3000)
    .waitForElementNotVisible('#dlg_loading_bar', 10000)
		.pause(2000)
      })

	return this;
};