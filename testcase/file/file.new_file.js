var duplicate;
module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
  	var project = 'Test';
    browser
  	// 	.waitForElementPresent('li.me img.user_profile_image', 20000)
			// .waitForElementNotVisible('#dlg_loading_bar', 10000)
			// .pause(1000)
			// .click('button#project_selectbox')
			// .waitForElementPresent('#project_selector > div.open', 3000)
			// .click('li.project_item[project_path=payphone66l99lmp3_' + project + ']')
			// .pause(2000)
			// .waitForElementNotVisible('#dlg_loading_bar', 10000)
			// .verify.containsText('#selected_project_name', project);
      .open_project(project);
  },
  'file_new_file' : function (browser) {
  	var new_file = 'test_file_' + Date.now();
    duplicate = new_file;
    browser
      .new_file(new_file)
      .pause(2000);
  },  
  'file_new_duplicate_file' : function (browser) {
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .moveToElement('#parent_new_menu', 100, 10)
      .waitForElementVisible('#child_new_menu', 1000)
      .click('#child_new_menu li > a[action=new_file_file]')
      .waitForElementVisible('#dlg_new_file', 2000)
      .setValue('#file_new_target_name', duplicate)
      .click('#g_nf_btn_ok')
      .waitForElementVisible('#dlg_confirmation', 2000)
      .click('button#g_cfrm_btn_no')
      .waitForElementNotVisible('#dlg_confirmation', 3000)
      .click('button#g_nf_btn_cancel')
      .waitForElementNotVisible('#dlg_new_file', 3000)
      /* tree test needed in here */
      .pause(2000);
  },
  'file_new_inappropriate_file' : function (browser) {
    var inappropriate_name = '!@#$d';
    
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .moveToElement('#parent_new_menu', 100, 10)
      .waitForElementVisible('#child_new_menu', 1000)
      .click('#child_new_menu li > a[action=new_file_file]')
      .waitForElementVisible('#dlg_new_file', 2000)
      .setValue('#file_new_target_name', inappropriate_name)
      .click('#g_nf_btn_ok')
      .waitForElementVisible('#dlg_alert', 2000)
      .click('button#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 3000)
      .click('button#g_nf_btn_cancel')
      .waitForElementNotVisible('#dlg_new_file', 3000)
      /* tree test needed in here */
      // .end();
  },
  'file_delete_file' : function (browser) {
    browser.delete_file(duplicate);
  }
}
