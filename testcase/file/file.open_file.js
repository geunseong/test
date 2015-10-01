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
  'file_open_file_from_toolbar' : function (browser) {
    var file_name = "test_file";
    browser
      .open_file(file_name)
      // test needed for validating opened file
      .pause(2000);
  },
  'file_open_file_from_menu' : function (browser){
    var file_name = "test_file";
    browser
      .open_file_menu(file_name)
      .pause(2000);
  },
  'file_open_file_from_shortcut' : function (browser) {
    var file_name = "test_file";
    browser
      .open_file_shortcut(file_name);
  },  
  'file_open_file_from_url' :  function (browser) {
    var url = "google.com"
    browser
        .click('#main-menu-file > a')
        .waitForElementPresent('#main-menu-file.open', 2000)
        .click("#main-menu-file a[action=print]")
        .waitForElementVisible("#dlg_open_url", 2000)
        .setValue('#open_url_address', url)
        .click('#g_ou_btn_ok')
        .waitForElementNotVisible("#dlg_open_url", 10000)
        // test needed for opend file
        // .waitForElementPresent()
        .end();
  },
}