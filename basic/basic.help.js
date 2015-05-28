module.exports = {
	'goorm_login' : function (browser) {
		var data = browser.globals;
    browser
      .url('http://qa.goorm.io')
      .waitForElementVisible('input.login-form', 2000)
      .setValue('input[name=id]', data.username)
      .setValue('input[name=pw]', data.password)
      .click('button[id=btn-login]')
      .waitForElementVisible('div#ide-vm-list', 10000)
      .pause(3000)
      .waitForElementNotPresent('button.btn-run-ide[disabled=disabled]', 10000)
      .click('.btn-run-ide')
      .pause(5000)
      .waitForElementVisible('#workspace', 120000)
      .verify.urlEquals('http://ide.goorm.io/');
  },
  'open_help_contents' : function (browser) {
  	browser
  		.waitForElementPresent('li.me img.user_profile_image', 20000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.pause(1000)
			.click('#main-menu-help > a')
			.waitForElementPresent('#main-menu-help.open', 1000)
			.click('#main-menu-help a[action=help_contents]')
			.waitForElementVisible('#dlg_help_contents', 2000)
			.verify.visible('#dlg_help_contents')
			.click('#g_hc_btn_cancel')
			.waitForElementNotVisible('#dlg_help_contents', 1000)
  },
  'open_shortcuts' : function (browser) {
  	browser
  		.click('#main-menu-help > a')
			.waitForElementPresent('#main-menu-help.open', 1000)
			.click('#main-menu-help a[action=view_all_shortcuts]')
			.waitForElementVisible('#dlg_help_shortcuts', 2000)
			.verify.visible('#dlg_help_shortcuts')
			.moveTo('.modal-backdrop.in', 30, 30)
			.mouseButtonDown(0)
			.mouseButtonUp(0)
			.waitForElementNotVisible('#dlg_help_shortcuts', 1000)
  },
  'open_about' : function (browser) {
  	browser
  		.click('#main-menu-help > a')
			.waitForElementPresent('#main-menu-help.open', 1000)
			.click('#main-menu-help a[action=help_about]')
			.waitForElementVisible('#dlg_help_about', 2000)
			.verify.visible('#dlg_help_about')
			.click('#g_ha_btn_close')
			.waitForElementNotVisible('#dlg_help_about', 1000)
  },
  'open_license' : function (browser) {
  	browser
  		.click('#main-menu-help > a')
			.waitForElementPresent('#main-menu-help.open', 1000)
			.click('#main-menu-help a[action=help_license]')
			.waitForElementVisible('#dlg_help_license', 2000)
			.verify.visible('#dlg_help_license')
			// .click('#g_hl_btn_close')
			.click('#dlg_help_license button')
			.waitForElementNotVisible('#dlg_help_license', 1000)
  },
  'open_bug_report' : function (browser) {
  	browser
  		.click('#main-menu-help > a')
			.waitForElementPresent('#main-menu-help.open', 1000)
			.click('#main-menu-help a[action=help_bug_report]')
			.waitForElementVisible('#dlg_help_bug_report', 2000)
			.verify.visible('#dlg_help_bug_report')
			.setValue('#bug_reports_content', 'Nightwatch testing...')
  },
  'cancel_bug_report' : function (browser) {
  	browser
  		.click('#g_hbr_btn_cancel')
  		.waitForElementNotVisible('#dlg_help_bug_report', 1000)
  		.verify.hidden('#dlg_help_bug_report')
  },
  'send_bug_report' : function (browser) {
  	this.open_bug_report(browser);
  	browser
  		.setValue('#bug_reports_title', 'Nightwatch testing...')
  		.click('#g_hbr_pw_btn_ok')
  		.waitForElementNotVisible('#dlg_help_bug_report', 2000)
  		.waitForElementVisible('#dlg_notice', 2000)
  		.verify.visible('#dlg_notice')
  		.click('#g_nt_btn_ok')
  		.waitForElementNotVisible('#dlg_notice', 1000)
  },
  'go_to_facebook' : function (browser) {
  	browser
  		.click('#main-menu-help > a')
			.waitForElementPresent('#main-menu-help.open', 1000)
			.click('#main-menu-help a[action=help_facebook]')
			.window_handles(function (result) {
				var handle = result.value[1];
				console.log('result:', result);
				browser.switchWindow(handle);
			})
			.verify.urlEquals('https://www.facebook.com/goormIDE')
			.end();
  }
}
