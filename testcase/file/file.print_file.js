module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
    var project = 'Test';
    browser
      .open_project(project)
  },
  'file_open_file_from_toolbar' : function (browser) {
    var file_name = "test_file";
    browser
      .open_file(file_name)
  },
  'file_print_from_menu' : function(browser){
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click("#main-menu-file a[action=open_url]")
  }

}