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
  'file_duplicate_file_from_menu_without_choosing_file' : function (browser){
    var file_name = "test_file";
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('.dropdown-menu a[action=duplicate_file]')
      // .waitForElementNotVisible('#main-menu-file.open', 2000)
      .pause(1000)
      .waitForElementVisible('#dlg_alert', 2000)
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 2000)
  },

  'file_duplicate_file_from_menu' : function (browser){
    var file_name = "test_file";
    browser
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
      .click('.jstree-node[id$="' + file_name + '"]')
      .pause(1000) 
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('.dropdown-menu a[action=duplicate_file]')
      // .waitForElementNotVisible('#main-menu-file.open', 2000)
      .pause(1000)
      .waitForElementPresent('.jstree-node[id$="' + file_name + '_copy0"]', 2000)
  },

  'file_remove_file_from_menu' : function (browser) {
    var file_name = "test_file_copy0"
    browser
      .delete_file(file_name)
      .pause(2000)
  },  

  //에러 
  'file_duplicate_file_from_right_click' : function (browser){
    var file_name = "test_file";
    browser
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
      .click('.jstree-node[id$="' + file_name + '"]')
      .mouseButtonClick('right')
      .waitForElementPresent('#project.explorer.file_context', 2000)
      .click('.dropdown-menu a[action=Copy_context]')
      .pause(300)
      .waitForElementPresent('.jstree-node[id$="' + file_name + '_copy0"]', 2000)
  },

  'file_remove_file_from_menu' : function (browser) {
    var file_name = "test_file_copy0"
    browser
      .delete_file(file_name)
      .pause(2000)
  },  

  //에러
  'file_duplicate_file_from_shortcut' : function (browser){
    var file_name = "test_file";
    browser
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
      .click('.jstree-node[id$="' + file_name + '"]')
      .pause(1000) 
      .keys(browser.keys.CONTROL, function(){console.log("Typed Control")})
      .pause(300)
      .keys(browser.keys.SHIFT, function(){console.log("Typed Shift")})
      .pause(300)
      .keys('A', function(){console.log("Typed A")})
      .pause(300)
      .keys(browser.keys.NULL)
      .pause(300)
      .waitForElementPresent('.jstree-node[id$="' + file_name + '_copy0"]', 5000)
  },

  'file_remove_file_from_menu' : function (browser) {
    var file_name = "test_file_copy0"
    browser
      .delete_file(file_name)
      .pause(2000)
  },  




}