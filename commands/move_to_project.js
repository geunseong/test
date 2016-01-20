exports.command = function(project_name) {
	this
	.getAttribute('#my_projects_header + li', 'project_path', function (result) {
    var project_path = result.value;
    p_name = project_path.split("_").pop();
    this
			.click('#project_selectbox')
			.waitForElementPresent('#project_selector > div.open', 2000)
			if(project_name == null){
			 this
				.click('#my_projects_header + li')
				.pause(2000)
				.waitForElementNotVisible('#dlg_loading_bar', 10000)
				.verify.containsText('#selected_project_name', p_name)
			}
			else{
			 this
				.click('[project_path$=' + project_name + ']')
				.pause(2000)
				.waitForElementNotVisible('#dlg_loading_bar', 10000)
				.verify.containsText('#selected_project_name', project_name)
			}
	})
	return this;
};