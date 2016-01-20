module.exports = {
	'goorm_login' : function (browser) {
		var data = browser.globals;
    	browser.run_ide(data.username, data.password,'cpp');
	},
	'project_build' : function (browser) {
		browser
			.click('button#project_selectbox')
			.waitForElementPresent('#project_selector > div.open', 3000)
			.click('li.project_item')
                        .pause(5000)
			.click('button[action=build_project]')
			.waitForElementVisible('#dlg_toast', 10000)
			.waitForElementNotVisible('#dlg_toast', 5000)
			.verify.elementPresent('li.active #gLayoutServer_build')
			.logout(browser);
	}
}
