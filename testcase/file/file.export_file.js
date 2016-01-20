module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
    browser.open_project_menu();
      },
  'file_export_file_menu' : function (browser) {
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('#main-menu-file a[action=export_file]')
      .pause(1000)
      .waitForElementVisible('#dlg_export_file', 5000)
      .waitForElementPresent('#file_export_files .file_item', 10000)
      .click('#file_export_files > div:last-child')
      .pause(1000)
      .keys([browser.Keys.ENTER])
      .pause(300)
      .keys(browser.Keys.NULL)
      .waitForElementNotVisible('#dlg_export_file', 5000)
      //have to check exported file...
  },

  'file_export_file_toolbar' : function (browser) {
    var file_name = 'test_file';
    browser
      .click('#main_file_toolbar [action=export_file]')
      .waitForElementVisible('#dlg_export_file', 5000)
      .waitForElementPresent('#file_export_files .file_item', 10000)
      .click('#file_export_files > div:last-child')
      .pause(1000)
      .keys([browser.Keys.ENTER])
      .pause(300)
      .keys(browser.Keys.NULL)
      .waitForElementNotVisible('#dlg_export_file', 5000)
      //have to check exported file...
      .logout(browser);
    }


}
