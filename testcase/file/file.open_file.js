module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
    var project = 'Test';
    browser.open_project(project);
  },
  'file_open_file_from_toolbar' : function (browser) {
    var file_name = "test_file";
    browser
      .open_file(file_name)
  },
  'file_open_file_from_menu' : function (browser){
    var file_name = "test_file";
    browser
      .open_file_menu(file_name)
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
        .click("#main-menu-file a[action=open_url]")
        .waitForElementVisible("#dlg_open_url", 2000)
        .setValue('#open_url_address', url)
        .click('#g_ou_btn_ok')
        .waitForElementNotVisible("#dlg_open_url", 10000)
        // test needed for opend file
        // .waitForElementPresent()
        .end();
  },
}