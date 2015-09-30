module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
    var project = 'Test';
    browser
      .open_project(project)
      .pause(1000);
  },

  'file_rename' :  function (browser) {
    var file_name = "d"
    var new_name = "e"
    browser
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
      .click('.jstree-node[id$="' + file_name + '"]')
      .pause(1000)    
      .click("#main-menu-file > a")
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click(".dropdown-menu a[action=rename_file]")
      .pause(1000)
      .waitForElementVisible('#dlg_rename_file', 10000)
      .keys(browser.keys.BACK_SPACE)
      .setValue('#input_rename_new_filename', new_name)
      .click('#g_rf_btn_ok')
      .waitForElementNotVisible('#dlg_rename_file', 10000)
      //check if renamed file exist in tree
      .waitForElementPresent('.jstree-node[id$="' + new_name + '"]', 2000)
  },
  'file_recover_rename' :  function (browser) {
    var file_name = "e"
    var new_name = "d"
    browser
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
      .click('.jstree-node[id$="' + file_name + '"]')
      .pause(1000)    
      .click("#main-menu-file > a")
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click(".dropdown-menu a[action=rename_file]")
      .pause(1000)
      .waitForElementVisible('#dlg_rename_file', 10000)
      .setValue('#input_rename_new_filename', browser.keys.BACK_SPACE)
      .setValue('#input_rename_new_filename', new_name)
      .click('#g_rf_btn_ok')
      .waitForElementNotVisible('#dlg_rename_file', 10000)
      //check if renamed file exist in tree
      .waitForElementPresent('.jstree-node[id$="' + new_name + '"]', 2000)
      .end();
  },  
}