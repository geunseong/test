module.exports = {
	'goorm_login' : function (browser) {
		var data = browser.globals;
    	browser.run_ide(data.username, data.password);
	},
	'open_logout_confirm' : function (browser) {
		browser
			.waitForElementPresent('li.me img.user_profile_image', 20000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.pause(1000)
			//.click('#user-email-container')
			//.waitForElementPresent('#fat-menu.open', 1000)
			//.assert.cssClassPresent('#fat-menu', 'open')
			.click('#main-menu-goorm')
			.waitForElementPresent('#main-menu-goorm.open',1000)
			//.assert.cssClassPresent('#dropdown-menu', 'open')
			.click(' a[action="account_logout"]')
			.waitForElementVisible('#dlg_confirmation', 1000)
			.assert.visible('#confirmation_content_container')
	},
	'logout_no' : function (browser) {
		browser
			.click('#g_cfrm_btn_no')
			.waitForElementNotVisible('#confirmation_content_container', 1000)
			.assert.hidden('#confirmation_content_container')
	},
/*	'logout_yes' : function (browser) {
		this.open_logout_confirm(browser);
		browser
			.click('#g_cfrm_btn_yes')
			.waitForElementVisible('#dlg_survey', 1000)
			.assert.visible('#dlg_survey')
	},
	'survey_send' : function (browser) {
		browser
			.setValue('#survey_inputbox', 'Nightwatch testing...')
			.getValue('#survey_inputbox', function (result) {
				this.verify.equal(result.value, 'Nightwatch testing...')
			})
			.click('#g_sv_btn_send')
			.pause(3000)
			.verify.urlEquals('http://qa.goorm.io/')
			.waitForElementVisible('#login-section', 2000)
			.verify.hidden('#user-section')
	},*/
	'force_move_ide' : function (browser) {
		browser
			.url('http://ide.qa.goorm.io/')
			.pause(1000)
			.verify.urlEquals('http://qa.goorm.io/')
			.end();
	}
}

