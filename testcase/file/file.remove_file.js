module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  // I should try this without project open
  'project_open' : function (browser) {
    var project = 'Test';
    // Selecting project from menu
    browser
      .open_project_menu(project)
      .pause(2000);
  },
  'file_remove_file_from_menu' : function (browser) {
    var file_name = "test_file"
    browser
      .delete_file(file_name)
      .pause(2000)
  },
  'file_recover_new_file' : function (browser) {
    var new_file = 'test_file';
    browser
      .new_file(new_file)
      .end();
  },  
}