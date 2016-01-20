module.exports = {
	'goorm_login' : function (browser) {
		var data = browser.globals;
    	browser.run_ide(data.username, data.password);
	},
	'open_profile_panel' : function (browser) {
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
			.verify.attributeEquals('#profile_name_input', 'disabled', 'true')
			.verify.attributeEquals('#profile_email_input', 'disabled', 'true')
			.verify.attributeEquals('#profile_pw_input', 'disabled', 'true')
			.verify.attributeEquals('#profile_re_pw_input', 'disabled', 'true')
			.verify.attributeEquals('#profile_comment_input', 'disabled', 'true')
	},
	'name_not_changed' : function (browser) {
		browser
			.click('#g_ap_pw_btn_mdf_act')
			.waitForElementVisible('#g_ap_pw_btn_mdf', 1000)
			.verify.elementNotPresent('#profile_name_input[disabled=disabled]')
			.click('#g_ap_pw_btn_mdf')
			.waitForElementVisible('#g_ap_pw_btn_mdf_act', 1000)
			.verify.elementNotPresent('#profile_old_input_container')
	},
	'name_changed_no' : function (browser) {
		browser
			.click('#g_ap_pw_btn_mdf_act')
			.waitForElementNotVisible('#g_ap_pw_btn_mdf_act', 1000)
			.setValue('input[id="profile_name_input"]', [browser.Keys.BACK_SPACE, browser.Keys.BACK_SPACE, Math.floor((Math.random() * 100) + 1).toString()])
			.click('#g_ap_pw_btn_mdf')
			.waitForElementVisible('#profile_old_input_container', 1000)
			.click('#g_cfrm_btn_no')
			.verify.elementNotPresent('#dlg_confirmation.in')
	},
	'name_changed_yes_wrong_pw' : function (browser) {
		browser
			.click('#g_ap_pw_btn_mdf')
			.waitForElementVisible('#profile_old_input_container', 1000)
			.setValue('#profile_old_pw_input', '1234')
			.click('#g_cfrm_btn_yes')
			.waitForElementNotVisible('#profile_old_input_container', 2000)
			.verify.hidden('#g_ap_pw_btn_mdf_act')
	},
	'name_changed_yes' : function (browser) {
		browser
			.click('#g_ap_pw_btn_mdf')
			.waitForElementVisible('#profile_old_input_container', 1000)
			.setValue('#profile_old_pw_input', browser.globals.password)
			.click('#g_cfrm_btn_yes')
			.waitForElementVisible('#dlg_notice', 1000)
			.click('#g_nt_btn_ok')
			.waitForElementNotVisible('#dlg_notice', 1000)
			.verify.visible('#g_ap_pw_btn_mdf_act')
			.verify.attributeEquals('#profile_name_input', 'disabled', 'true')
			.click('#g_ap_btn_cancel')
			.verify.elementNotPresent('#dlg_auth_profile.in')
			.logout(browser);
	}
}
