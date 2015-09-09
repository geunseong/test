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
      .verify.urlEquals('http://ide.qa.goorm.io/');
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
  'file_new_file' : function (browser) {
  	var new_file = 'a';
  	browser
  		.click('#main-menu-file > a')
  		.waitForElementPresent('#main-menu-file.open', 2000)
  		.moveToElement('#parent_new_menu', 100, 10)
  		.waitForElementVisible('#child_new_menu', 1000)
  		.click('#child_new_menu li > a[action=new_file_file]')
  		.waitForElementVisible('#dlg_new_file', 2000)
  		.setValue('#file_new_target_name', new_file)
  		.click('#g_nf_btn_ok')
  		.waitForElementNotVisible('#dlg_new_file', 3000)
  		.waitForElementVisible('a[id="project_treeview/payphone66l99lmp3_c_basic/' + new_file + '_anchor"]', 5000)
  		.end();
  }
}