module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  // I should try this without project open
  'project_open' : function (browser) {
    var project = 'Test';
    // Selecting project from menu
    browser.open_project_menu(project);
  },
  'file_close_one_file_from_menu' : function(browser){
    browser
      .open_file_toolbar("a")
      .close_file_menu()
  },
  'file_close_one_file_from_shortcut' : function(browser){
    browser
      .open_file_toolbar("a")
      .close_file_shortcut()
      .pause(1000);
  },  
  'file_cloase_all_files' : function (browser) {
    browser
      .open_file_toolbar("a")
      .open_file_toolbar("b")
      .open_file_toolbar("c")
      .open_file_toolbar("d")
      .close_all_menu()
      .end();
  }
}