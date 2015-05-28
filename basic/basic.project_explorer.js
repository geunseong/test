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
  'open_project_dialog' : function (browser) {
  	browser
  		.waitForElementPresent('li.me img.user_profile_image', 20000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.pause(1000)
			.click('#main-menu-file > a')
			.waitForElementPresent('#main-menu-file.open', 1000)
			.click('#main-menu-file a[action=open_project]')
			.waitForElementVisible('#dlg_open_project', 2000)
			.click('#project_open_list .selector_project:last-of-type')
			.click('#g_op_btn_ok')
			.waitForElementNotVisible('#dlg_open_project', 2000)
			.waitForElementVisible('#dlg_loading_bar', 2000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.verify.visible('#project_treeview')
  },
  'open_project_table' : function (browser) {
  	browser
  		.click('#project_selectbox')
  		.waitForElementPresent('#project_selector > div.btn-group.open', 1000)
  		.click('#back_to_project_table > a')
  		.waitForElementNotVisible('#project_treeview', 3000)
  		.waitForElementVisible('#project_list_jquery_table', 3000)
  		.click('#project_list_jquery_table tr:first-of-type td:first-of-type')
  		.waitForElementNotVisible('#dlg_loading_bar', 10000)
  		.waitForElementVisible('#project_treeview', 10000)
  		.verify.visible('#project_treeview')
  		.end();
  }
}
