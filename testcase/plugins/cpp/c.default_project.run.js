var project_name = 'c_test';
var plugin = 'cpp';
var detail_type = 'c';
var default_msg = 'Hello, goorm!';

var create_test_file = function (browser) {
  var random = Math.random();
  browser
    .execute(function(random, default_msg) {
      var context = 
        '#include <stdio.h>\n\nint main(){' +
        ' printf("' + default_msg + random + '");' +
        '}';
      var active = core.module.layout.workspace.window_manager.active_window;
        core.module.layout.workspace.window_manager.window[active].editor.editor.setValue(context);
    }, [random, default_msg])
    .pause(3000)
    .click('button[action=save_file]')
    .pause(1000)

  return random
};

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
  'run_with_menu' : function (browser) {
    browser
      .run_project('menu')
      .verify.containsText('#run_inner_content', default_msg)
      .pause(3000)
  },
  'run_with_toolbar' : function (browser) {
    var random = create_test_file(browser);
    browser
      .run_project('toolbar')
      .verify.containsText('#run_inner_content', default_msg + random)
      .pause(2000)
  },
  'run_with_keyboard' : function (browser) {
    var random = create_test_file(browser);
    browser
      .run_project('keyboard')
      .verify.containsText('#run_inner_content', default_msg + random)
      .pause(2000)       
  },
  'delete_project' : function (browser) {
    browser
      .delete_project(project_name)
      .end();
  }
};