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
			// .verify.containsText('span#selected_project_name', project);
      .open_project(project);
  },
  'file_new_folder' : function (browser) {
    var new_folder = 'test_folder_' + Date.now();
    duplicate = new_folder;
    browser
  		// .click('#main-menu-file > a')
  		// .waitForElementPresent('#main-menu-file.open', 2000)
  		// .moveToElement('#parent_new_menu', 100, 10)
  		// .waitForElementVisible('#child_new_menu', 1000)
  		// .click('#child_new_menu li > a[action=new_file_folder]')
  		// .waitForElementVisible('#dlg_new_folder', 2000)
  		// .setValue('#folder_new_target_name', new_folder)
  		// .click('#g_nfo_btn_ok')
  		// .waitForElementNotVisible('#dlg_new_folder', 3000)
      .new_folder(new_folder)
      .pause(2000);
  },
  'file_new_duplicate_folder' : function (browser) {
    
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .moveToElement('#parent_new_menu', 100, 10)
      .waitForElementVisible('#child_new_menu', 1000)
      .click('#child_new_menu li > a[action=new_file_folder]')
      .waitForElementVisible('#dlg_new_folder', 2000)
      .setValue('#folder_new_target_name', duplicate)
      .click('#g_nfo_btn_ok')
      .waitForElementVisible('#dlg_alert', 2000)
      .click('button#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 3000)
      .waitForElementNotVisible('#dlg_new_folder', 3000)
      /* tree test needed in here */
      .pause(2000);


  },
  'file_new_inappropriate_folder' : function (browser) {
    var inappropriate_name = '!@#$d';
    
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .moveToElement('#parent_new_menu', 100, 10)
      .waitForElementVisible('#child_new_menu', 1000)
      .click('#child_new_menu li > a[action=new_file_folder]')
      .waitForElementVisible('#dlg_new_folder', 2000)
      .setValue('#folder_new_target_name', inappropriate_name)
      .click('#g_nfo_btn_ok')
      .waitForElementVisible('#dlg_alert', 2000)
      .click('button#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 3000)
      .click('button#g_nfo_btn_cancel')
      .waitForElementNotVisible('#dlg_new_folder', 3000)
      /* tree test needed in here */
      .end();

  }
}
