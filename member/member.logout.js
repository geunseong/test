module.exports = {
	'goorm_login' : function (browser) {
		var data = browser.globals;
    browser
      .url('http://qa.goorm.io')
      .waitForElementVisible('input.login-form', 2000)
      .setValue('input[name=id]', data.username)
      .setValue('input[name=pw]', data.password)
      .click('button[id=btn-login]')
      .waitForElementVisible('div#ide-vm-list', 2000)
      .pause(3000)
      .waitForElementNotPresent('button#btn-run-ide[disabled=disabled]', 10000)
      .click('#btn-run-ide')
      .pause(5000)
      .waitForElementVisible('#workspace', 120000)
      .verify.urlEquals('http://ide.goorm.io/');
  },
  'open_logout_confirm' : function (browser) {
  	browser
  		.waitForElementPresent('li.me img.user_profile_image', 20000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.pause(1000)
			.click('#user-email-container')
			.waitForElementPresent('#fat-menu.open', 1000)
			.assert.cssClassPresent('#fat-menu', 'open')
			.click('a[action="account_logout"]')
			.waitForElementVisible('#dlg_confirmation', 1000)
			.assert.visible('#confirmation_content_container')
  },
  'logout_no' : function (browser) {
  	browser
  		.click('#g_cfrm_btn_no')
  		.waitForElementNotVisible('#confirmation_content_container', 1000)
  		.assert.hidden('#confirmation_content_container')
  },
  'logout_yes' : function (browser) {
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
  		.verify.urlEquals(browser.globals.urls.qa)
  		.waitForElementVisible('#login-section', 2000)
  		.verify.hidden('#user-section')
  },
  'force_move_ide' : function (browser) {
  	browser
  		.url('http://ide.goorm.io/')
  		.pause(1000)
  		.verify.urlEquals(browser.globals.urls.qa)
  		.end();
  }
}