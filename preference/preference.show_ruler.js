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
      .waitForElementNotPresent('button#btn-run-ide[disabled=disabled]', 10000)
      .click('#btn-run-ide')
      .pause(5000)
      .waitForElementVisible('#workspace', 120000)
      .verify.urlEquals('http://ide.goorm.io/');
  },
  'project_open' : function (browser) {
  	var project = 'c_basic';
  	browser
  		.waitForElementPresent('li.me img.user_profile_image', 20000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.pause(1000)
			.click('button#project_selectbox')
			.waitForElementPresent('#project_selector > div.open', 3000)
			.click('li.project_item[project_path=payphone66l99lmp3_' + project + ']')
			.pause(2000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.verify.containsText('#selected_project_name', project);
  },
  'file_open' : function (browser) {
  	browser
  		.click('#main-menu-file > a')
  		.waitForElementPresent('#main-menu-file.open', 2000)
  		.click('#main-menu-file a[action=open_file]')
  		.waitForElementVisible('#dlg_open_file', 3000)
  		.click('#file_open_files div.file_item')
  		.click('#g_of_btn_ok')
  		.waitForElementNotVisible('#dlg_open_file', 3000)
  		.waitForElementVisible('div.ui-dialog', 5000)
  		.verify.elementPresent('div.ui-dialog');
  },
  'show_ruler' : function (browser) {
  	browser
  		.click('#main-menu-edit > a')
  		.waitForElementPresent('#main-menu-edit.open', 2000)
  		.click('#main-menu-edit a[action=toggle_rulers]')
  		.waitForElementNotPresent('#main-menu-edit.open', 2000)
  		.verify.elementPresent('div.CodeMirror-ruler')
  		.end();
  }
}