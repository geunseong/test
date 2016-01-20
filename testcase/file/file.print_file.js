var file_name = "test_file";
module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
    browser.open_project_menu();
  },
  'file_close_all_files' : function(browser){
    browser
      .close_all_menu()
  },
  'file_print_without_opened_file' : function(browser){
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click("#main-menu-file a[action=print]")
      .waitForElementVisible('#dlg_alert', 2000)
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 2000)
  },
  'file_print_from_menu' : function(browser){
    browser
      .open_file_toolbar()
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click("#main-menu-file a[action=print]")
      .logout(browser);
  },
  // 다음테스트는 어떻게 하는가...
 /* 'file_print_from_shortcut' : function(browser){
    browser
      .open_file_toolbar(file_name)
      .keys(browser.Keys.CONTROL)
      .keys('p')
      .pause(500)
      .keys(browser.Keys.NULL)
      .logout(browser);
  }*/

}