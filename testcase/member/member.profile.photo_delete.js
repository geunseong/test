module.exports = {
	'goorm_login' : function (browser) {
		var data = browser.globals;
    	browser.run_ide(data.username, data.password);
	},
	'photo_not_delete' : function (browser) {
		browser
			.waitForElementPresent('li.me img.user_profile_image', 20000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.pause(1000)
			.click('#user-email-container')
			.waitForElementPresent('#fat-menu.open', 1000)
			.assert.cssClassPresent('#fat-menu', 'open')
			.click('a[action="account_profile"]')
			.waitForElementPresent('#dlg_auth_profile.in', 1000)
			.assert.cssClassPresent('#dlg_auth_profile', 'in')
			.click('#g_ap_btn_profile_delete')
			.waitForElementPresent('#dlg_confirmation', 1000)
			.click('#g_cfrm_btn_no')
			.verify.hidden('#dlg_confirmation')
	},
	'photo_delete_wrong_pw' : function (browser) {
		browser
			.click('#g_ap_btn_profile_delete')
			.waitForElementPresent('#dlg_confirmation', 1000)
			.setValue('#profile_old_pw_input', '1234')
			.click('#g_cfrm_btn_yes')
			.waitForElementNotVisible('#profile_old_input_container', 2000)
			.verify.hidden('#dlg_confirmation')
	},
	'photo_changed_yes' : function (browser) {
		browser
                        .click('#upload_profile_image')
                        .waitForElementPresent('#dlg_confirmation', 1000)
                        .pause(2000)
			.setValue('#profile_old_pw_input', browser.globals.password)
			.click('#g_cfrm_btn_yes')
			.waitForElementNotVisible('#profile_old_input_container', 2000)
			.verify.hidden('#dlg_confirmation')
			.end();
	}
}
