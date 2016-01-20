module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  // I should try this without project open
  'project_open' : function (browser) {
    browser.open_project_menu();
  },
  'file_close_one_file_from_menu' : function(browser){
    browser
    .open_file_toolbar()
    .pause(1000)
    .click('#main-menu-file > a')
    .waitForElementPresent('#main-menu-file.open', 3000)
    .click("#main-menu-file a[action=close_file]")
  },
  'file_close_one_file_from_shortcut' : function(browser){
    browser
      .open_file_toolbar()
      .keys(browser.Keys.ALT)
      .keys('x')
      .pause(500)
      .keys(browser.Keys.NULL);
  },
  'file_cloase_all_files_menu' : function (browser) {
    browser
      .open_file_toolbar()
      .pause(500)
      .click('#main-menu-window > a')
      .waitForElementPresent('#main-menu-window.open', 3000)
      .click('#main-menu-window a[action="new_terminal_window"]')
      .pause(500)
      .verify.visible('.ui-dialog-content.terminal')
      .pause(500)
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 3000)
      .click("#main-menu-file a[action=close_file]")
  },
  'file_cloase_all_files_shortcut' : function (browser) {
    browser
      .open_file_toolbar()
      .click('#main-menu-window > a')
      .pause(500)
      .waitForElementPresent('#main-menu-window.open', 2000)
      .click('#main-menu-window a[action="new_terminal_window"]')
      .pause(500)
      .verify.visible('.ui-dialog-content.terminal')
      .keys(browser.Keys.ALT)
      .keys(browser.Keys.SHIFT)
      .keys('x')
      .pause(500)
      .keys(browser.Keys.NULL)
      .logout(browser);
  }
}