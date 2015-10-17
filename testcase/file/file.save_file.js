module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
    var project = 'Test';
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
      .save_file_menu()
      .pause();
  },  
  'file_save_file_as' :  function (browser) {
    var new_name = "save_as_file"
    browser
      .save_as_file_menu(new_name)
      .end();
  },
}