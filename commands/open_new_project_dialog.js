exports.command = function(tab) {
	if (tab == null) {
		tab = 'template';
	}
    this
        .click('#main_file_toolbar [action=new_project]')
        .waitForElementVisible('#dlg_new_project', 2000)
        .pause(5000)
        .click('[href="#new_project_' + tab + '"]')
        .waitForElementVisible('#new_project_' + tab, 2000)
    return this;
};