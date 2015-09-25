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
  'file_open_most_recent_file_from_menu' : function (browser) {
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .moveToElement('#parent_open_recent_files_menu', 100, 10)
      .waitForElementVisible('#child_open_recent_files_menu', 1000)
      .click('#child_open_recent_files_menu li:first-child > a')
      .pause(2000);
  }
}