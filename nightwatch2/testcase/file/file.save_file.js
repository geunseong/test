module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
    var project = 'Test2';
    browser.open_project_menu(project);
  },
  'file_open_file_from_toolbar' : function (browser) {
    var file_name = "test_file";
    browser
      .open_file_menu(file_name)
      .pause(2000);
  },
  'file_save_from_toolbar' : function (browser){
    browser
      .save_file_toolbar()
      .pause(2000);
  },
  'file_save_from_menu' : function (browser) {
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click("#main-menu-file a[action=save_file]")
  },  
  'file_save_file_as' :  function (browser) {
    var new_name = "save_as_file"
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click("#main-menu-file a[action=save_file]")
      .waitForElementVisible("#dlg_save_as_file", 2000)
      .setValue('#file_save_as_target_name', file_name)
      .click('#g_saf_btn_ok')
      .waitForElementNotVisible("#dlg_save_as_file", 10000)
      .end();
  },
}