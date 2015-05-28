module.exports = {
	'goorm_login' : function (browser) {
		var data = browser.globals;
    	browser.run_ide(data.username, data.password);
	},
	'project_open' : function (browser) {
		var project = 'c_basic';
		browser
			.waitForElementPresent('li.me img.user_profile_image', 20000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.pause(1000)
			.click('button#project_selectbox')
			.waitForElementPresent('#project_selector > div.open', 3000)
			.click('li.project_item[project_path=payphone66l99lmp3_' + project + ']')
			.pause(2000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.verify.containsText('#selected_project_name', project);
	},
	'file_open' : function (browser) {
		browser
			.click('#main-menu-file > a')
			.waitForElementPresent('#main-menu-file.open', 2000)
			.click('#main-menu-file a[action=open_file]')
			.waitForElementVisible('#dlg_open_file', 3000)
			.click('#file_open_files div.file_item')
			.click('#g_of_btn_ok')
			.waitForElementNotVisible('#dlg_open_file', 3000)
			.waitForElementVisible('div.ui-dialog', 5000)
			.verify.elementPresent('div.ui-dialog');
	},
	'show_ruler' : function (browser) {
		browser
			.click('#main-menu-edit > a')
			.waitForElementPresent('#main-menu-edit.open', 2000)
			.click('#main-menu-edit a[action=toggle_rulers]')
			.waitForElementNotPresent('#main-menu-edit.open', 2000)
			.verify.elementPresent('div.CodeMirror-ruler')
			.end();
	}
}
