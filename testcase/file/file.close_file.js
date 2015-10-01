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
  'file_open_one_file_from_toolbar' : function (browser) {
    browser
      .open_file("a")
      .pause(1000);
  },
  'file_close_one_file_from_menu' : function(browser){
    browser
      .close_file_menu()
      .pause(1000);
  },
  'file_open_one_file_from_toolbar' : function (browser) {
    browser
      .open_file("a")
      .pause(1000);
  },
  'file_close_one_file_from_shortcut' : function(browser){
    browser
      .close_file_shortcut()
      .pause(1000);
  },  
  'file_open_many_files_from_toolbar' : function (browser) {
    browser
      .open_file("a")
      .open_file("b")
      .open_file("c")
      .open_file("d")
      .pause(1000);
  },
  'file_close_all_files' : function(browser){
    browser
      .close_all_menu()
      .end();
  }
}