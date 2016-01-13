module.exports = {
	'goorm_login' : function (browser) {
		var data = browser.globals;
    	browser.run_ide(data.username, data.password);
	},
	'project_build' : function (browser) {
		browser
			.waitForElementPresent('li.me img.user_profile_image', 20000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.click('button#project_selectbox')
			.waitForElementPresent('#project_selector > div.open', 3000)
			.click('li.project_item')
			.waitForElementVisible('#dlg_loading_bar', 2000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
                        .pause(5000)
			.click('button[action=build_project]')
			.waitForElementVisible('#dlg_toast', 10000)
			.waitForElementNotVisible('#dlg_toast', 5000)
			.verify.elementPresent('li.active #gLayoutServer_build')
			.end();
	}
}
