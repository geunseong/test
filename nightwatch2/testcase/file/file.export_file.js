module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
    var project = 'Test2';
    browser
      .open_project_menu(project);
  },
  'file_export_file_menu' : function (browser) {
    var file_name = 'test_file';
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('#main-menu-file a[action=export_file]')
      .pause(1000)
      .waitForElementVisible('#dlg_export_file', 5000)
      .waitForElementVisible('#file_export_files [filename="' + file_name.trim() + '"]', 8000, false, function(e){console.log(e)})
      .click('#file_export_files [filename="' + file_name.trim() + '"]')
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
      .click('#main_file_toolbar [action=open_file]')
      .waitForElementVisible('#dlg_export_file', 5000)
      .waitForElementVisible('#file_export_files [filename="' + file_name.trim() + '"]', 8000, false, function(e){console.log(e)})
      .click('#file_export_files [filename="' + file_name.trim() + '"]')
      .pause(1000)
      .keys([browser.Keys.ENTER])
      .pause(300)
      .keys(browser.Keys.NULL)
      .waitForElementNotVisible('#dlg_export_file', 5000)
      //have to check exported file...
      .end();
    }

    
}
