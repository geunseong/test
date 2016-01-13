module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  // I should try this without project open
  'project_open' : function (browser) {
    var project = 'Test2';
    browser.open_project_menu(project);
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
      .waitForElementPresent('.jstree-node[id$="' + file_name.trim() + '"]', 2000)
      .click('.jstree-node[id$="' + file_name.trim() + '"]')
      .pause(1000) 
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('.dropdown-menu a[action=duplicate_file]')
      // .waitForElementNotVisible('#main-menu-file.open', 2000)
      .pause(1000)
      .waitForElementPresent('.jstree-node[id$="_copy0"]', 2000)
  },

  'file_remove_file_from_menu' : function (browser) {
    browser
      .getText('.jstree-node[id$="_copy0"]', function(result){
        console.log(result.value)
        this
          .delete_file(result.value)
          .pause(2000)
      })
  },  

  //에러 다음으로 안넘어감
  'file_duplicate_file_with_right_click' : function (browser){
    var file_name = "test_file";
    browser
      .waitForElementPresent('.jstree-node[id$="' + file_name.trim() + '"]', 5000)
      .click('.jstree-node[id$="' + file_name.trim() + '"]')
      .mouseButtonClick('right')
      .waitForElementPresent('#project.explorer.file_context', 2000)
      .click('.dropdown-menu a[action=Copy_context]')
      .pause(300)
      .waitForElementPresent('.jstree-node[id$="' + file_name.trim() + '_copy0"]', 2000)
  },

  'file_remove_file_from_menu' : function (browser) {
    browser
      .getText('.jstree-node[id$="_copy0"]', function(result){
        this
          .delete_file(result.value)
          .pause(2000)
      })
  },  

  'file_duplicate_file_from_shortcut' : function (browser){
    var file_name = "test_file";
    browser
      .waitForElementPresent('.jstree-node[id$="' + file_name.trim() + '"]', 2000)
      .click('.jstree-node[id$="' + file_name.trim() + '"]')
      .keys(browser.Keys.CONTROL)
      .keys(browser.Keys.SHIFT)
      .keys('a')
      .keys(browser.Keys.NULL)
      .waitForElementPresent('.jstree-node[id$="' + file_name.trim() + '_copy0"]', 5000)
  },

  'file_remove_file_from_menu' : function (browser) {
    browser
      .getText('.jstree-node[id$="_copy0"]', function(result){
        this
          .delete_file(result.value)
          .pause(2000)
      })
      .end();
  },  
}