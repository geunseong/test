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
  'file_open_file_from_menu' : function (browser){
    var file_name = "test_file";
    browser
      .open_file_menu(file_name)
      .pause(2000);
  },
  'file_duplicate_file_from_menu' : function (browser){
    var file_name = "test_file";
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('#main-menu-file a[action=duplicate_file]')
      .pause(2000)
      .waitForElementPresent('.jstree-node[id$="' + file_name + '_copy0"]', 2000)
  }
}