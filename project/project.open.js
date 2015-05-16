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
      .waitForElementNotPresent('button.btn-run-ide[disabled=disabled]', 10000)
      .click('.btn-run-ide')
      .pause(5000)
      .waitForElementVisible('#workspace', 120000)
      .verify.urlEquals('http://ide.goorm.io/');
  },
  'project_open' : function (browser) {
  	browser
  		.waitForElementPresent('li.me img.user_profile_image', 20000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.click('button#project_selectbox')
			.waitForElementPresent('#project_selector > div.open', 3000)
			.click('li.project_item[project_path=payphone66l99lmp3_c_basic]')
			.waitForElementVisible('#dlg_loading_bar', 2000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.verify.containsText('#selected_project_name', 'c_basic')
			.end();
  }
}