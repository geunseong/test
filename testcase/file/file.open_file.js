var duplicate;
module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  // I should try this without project open

  'project_open' : function (browser) {
    var project = 'Test';
    // Selecting project from menu
    browser.open_project(project);
  },
  
  'file_new_file' : function (browser) {
  	var new_file = 'test_file_' + Date.now();
    duplicate = new_file;
    browser
      .new_file(new_file);
  		// .click('#main-menu-file > a')
  		// .waitForElementPresent('#main-menu-file.open', 2000)
  		// .moveToElement('#parent_new_menu', 100, 10)
  		// .waitForElementVisible('#child_new_menu', 1000)
  		// .click('#child_new_menu li > a[action=new_file_file]')
  		// .waitForElementVisible('#dlg_new_file', 2000)
  		// .setValue('#file_new_target_name', new_file)
  		// .click('#g_nf_btn_ok')
  		// .waitForElementNotVisible('#dlg_new_file', 3000)
    //   .pause(2000);
  },

  'file_open_file_from_menu' : function (browser) {
    browser
        .open_file(duplicate)
        // test needed for validating opened file
        .pause(2000);
  },

  'file_open_file_from_url' :  function (browser) {
    var url = "google.com"
    browser
        .click('#main-menu-file > a')
        .waitForElementPresent('#main-menu-file.open', 2000)
        .click("#main-menu-file a[action=open_url]")
        .waitForElementVisible("#dlg_open_url", 2000)
        .setValue('#open_url_address', url)
        .click('#g_ou_btn_ok')
        .waitForElementNotVisible("#dlg_open_url", 10000)
        // test needed for opend file
        // .waitForElementPresent()
  
  },

  'file_open_file_from_shortcut' : function (browser) {
    browser
      .open_file_shortcut(duplicate);
  }
}