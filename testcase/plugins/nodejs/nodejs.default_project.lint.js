var project_name = 'nodejs_test224';
var plugin = 'nodejs';
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
          'function test(){\n' +
          '  consolee.log(1);\n' +
          '};\n' +
          'fu!nction test(){\n' +
          '  consolee.log(1);\n' +
          '};\n' +
          'a.id = null;';
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
      .click('#gLayoutOutput_nodejs')
      .waitForElementVisible('#output_tab_nodejs tbody tr', 20000, false)
      .verify.containsText('#output_tab_nodejs tbody', 'Error')
      .verify.containsText('#output_tab_nodejs tbody', 'Warning')
      .verify.elementPresent('.fa-exclamation-triangle') //warning
      .verify.elementPresent('.fa-times-circle') //error
  },
  'delete_project' : function (browser) {
    browser
      .delete_project(project_name)
      .end();
  }
};