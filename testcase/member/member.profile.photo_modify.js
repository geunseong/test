module.exports = {
	'goorm_login' : function (browser) {
		var data = browser.globals;
    	browser.run_ide(data.username, data.password);
	},
	'profile_photo_change_pixel' : function (browser) {
                        path = require('fs');
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
                        .click('#g_ap_btn_profile_edit')
                        .waitForElementPresent('#dlg_auth_profile_image', 1000)
                        .setValue('input[id="upload_image"]',require('path').resolve(process.cwd() + '/photo/profile/600.jpg'))
                        .setValue('input[class="form-control profile_width"]',600)
                        .setValue('input[class="form-control profile_height"]',600)
                        .click('#upload_profile_image')
                        .waitForElementPresent('#dlg_confirmation', 1000)
                        .pause(1000)
			.setValue('#profile_old_pw_input', browser.globals.password)
                        .click('#g_cfrm_btn_yes')
                        .pause(1000)

                        .click('#g_ap_btn_profile_edit')
                        .waitForElementPresent('#dlg_auth_profile_image', 1000)
                        .setValue('input[id="upload_image"]',require('path').resolve(process.cwd() + '/photo/profile/300.png'))
                        .setValue('input[class="form-control profile_width"]',300)
                        .setValue('input[class="form-control profile_height"]',300)
                        .click('#upload_profile_image')
                        .waitForElementPresent('#dlg_confirmation', 1000)
                        .pause(1000)
			.setValue('#profile_old_pw_input', browser.globals.password)
                        .click('#g_cfrm_btn_yes')
                        .pause(1000)

                        .click('#g_ap_btn_profile_edit')
                        .waitForElementPresent('#dlg_auth_profile_image', 1000)
                        .setValue('input[id="upload_image"]',require('path').resolve(process.cwd() + '/photo/profile/150.png'))
                        .setValue('input[class="form-control profile_width"]',150)
                        .setValue('input[class="form-control profile_height"]',150)
                        .click('#upload_profile_image')
                        .waitForElementPresent('#dlg_confirmation', 1000)
                        .pause(1000)
			.setValue('#profile_old_pw_input', browser.globals.password)
                        .click('#g_cfrm_btn_yes')
                        .pause(1000)

                        .click('#g_ap_btn_profile_edit')
                        .waitForElementPresent('#dlg_auth_profile_image', 1000)
                        .setValue('input[id="upload_image"]',require('path').resolve(process.cwd() + '/photo/profile/50.png'))
                        .setValue('input[class="form-control profile_width"]',50)
                        .setValue('input[class="form-control profile_height"]',50)
                        .click('#upload_profile_image')
                        .waitForElementPresent('#dlg_confirmation', 1000)
                        .pause(2000)
			.setValue('#profile_old_pw_input', browser.globals.password)
                        .click('#g_cfrm_btn_yes')
                        .pause(1000)

                        .click('#g_ap_btn_profile_edit')
                        .waitForElementPresent('#dlg_auth_profile_image', 1000)
                        .setValue('input[id="upload_image"]',require('path').resolve(process.cwd() + '/photo/profile/25.png'))
                        .setValue('input[class="form-control profile_width"]',25)
                        .setValue('input[class="form-control profile_height"]',25)
                        .click('#upload_profile_image')
                        .waitForElementPresent('#dlg_confirmation', 1000)
                        .pause(2000)
			.setValue('#profile_old_pw_input', browser.globals.password)
                        .click('#g_cfrm_btn_yes')
                        .pause(1000)

                        .click('#g_ap_btn_profile_edit')
                        .waitForElementPresent('#dlg_auth_profile_image', 1000)
                        .setValue('input[id="upload_image"]',require('path').resolve(process.cwd() + '/photo/profile/1200.jpg'))
                        .setValue('input[class="form-control profile_width"]',1200)
                        .setValue('input[class="form-control profile_height"]',1200)
                        .click('#upload_profile_image')
                        .waitForElementPresent('#dlg_confirmation', 1000)
                        .pause(1000)
			.setValue('#profile_old_pw_input', browser.globals.password)
                        .click('#g_cfrm_btn_yes')
                        .pause(1000)

                        .click('#g_ap_btn_profile_edit')
                        .waitForElementPresent('#dlg_auth_profile_image', 1000)
                        .setValue('input[id="upload_image"]',require('path').resolve(process.cwd() + '/photo/profile/1.5.JPG'))
                        .setValue('input[class="form-control profile_width"]',3000)
                        .setValue('input[class="form-control profile_height"]',3000)
                        .click('#upload_profile_image')
                        .waitForElementPresent('#dlg_confirmation', 1000)
                        .pause(1000)
			.setValue('#profile_old_pw_input', browser.globals.password)
                        .click('#g_cfrm_btn_yes')
                        .pause(1000)

	},
	'photo_not_changed' : function (browser) {
		browser
			.click('#g_ap_btn_profile_edit')
                        .waitForElementPresent('#dlg_auth_profile_image', 1000)
                        .click('#upload_profile_image')
                        .waitForElementPresent('#dlg_confirmation', 1000)
                        .pause(2000)
			.click('#g_cfrm_btn_no')
			.waitForElementNotVisible('#profile_old_input_container', 2000)
			.verify.hidden('#dlg_confirmation')
	},
	'photo_changed_wrong_pw' : function (browser) {
		browser
			.click('#g_ap_btn_profile_edit')
                        .waitForElementPresent('#dlg_auth_profile_image', 1000)
                        .click('#upload_profile_image')
                        .waitForElementPresent('#dlg_confirmation', 1000)
                        .pause(2000)
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
	},
	'photo_changed_confirmation' :function (browser) {
		browser
                        .click('#g_ap_btn_cancel')
			.waitForElementPresent('#goorm', 10000)
	 		.refresh()
			.acceptAlert()
			.waitForElementPresent('li.me img.user_profile_image', 30000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.pause(1000)
                        .click('#user-email-container')
			.waitForElementPresent('#fat-menu.open', 1000)
			.assert.cssClassPresent('#fat-menu', 'open')
			.click('a[action="account_profile"]')
			.waitForElementPresent('#dlg_auth_profile.in', 1000)
			.assert.cssClassPresent('#dlg_auth_profile', 'in')
			.pause(1000)

                        .end();
	}
}
