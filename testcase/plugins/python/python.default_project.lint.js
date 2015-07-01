var project_name = 'python_test';
var plugin = 'python';
var detail_type = 'default';

module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
    browser
      .run_ide(data.username, data.password, plugin);
  },
  'create_default_project' : function (browser) {
    browser
      .new_project(plugin, detail_type, project_name)
  },
  'make_error_and_warning_file' : function (browser) {
    browser
      .execute(function() {
        var context = 
          'print "Hello Python"assdsfsdfsd';
        var active = core.module.layout.workspace.window_manager.active_window;
          core.module.layout.workspace.window_manager.window[active].editor.editor.setValue(context);
      })
      .pause(3000)
      .click('button[action=save_file]')
      .pause(2000);
  },
  'run_with_menu' : function (browser) {
    browser
      .run_project('menu')
      .pause(3000)
  },
  'check_output' : function (browser) {
    browser
      .click('#gLayoutOutput_' + plugin)
      .waitForElementVisible('#output_tab_' + plugin + ' tbody tr', 20000, false)
      .verify.containsText('#output_tab_' + plugin + ' tbody', 'Error')
      .verify.elementPresent('.fa-times-circle') //error
      .verify.containsText('#output_tab_' + plugin + ' tbody', 'invalid syntax')
      .moveToElement('.fa-times-circle', 3, 3)
      .verify.containsText('.error_message_box', 'invalid syntax')
  },
  'delete_project' : function (browser) {
    browser
      .delete_project(project_name)
      .end();
  }
};