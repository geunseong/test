var current = __filename.split('/');
var plugin = current[current.length - 2];
var detail_type = current[current.length - 1].split('.')[0];
var project_name = plugin + detail_type + Math.floor(Math.random() * 100000);

var default_msg = 'DEFAULT_MSG';
var context = 'CONTEXT';

var create_test_file = function (browser) {
  var random = Math.random();
  var msg = context.replace('PRINT_MSG', default_msg + random)
  browser
    .execute(function(random, msg) {
      var active = core.module.layout.workspace.window_manager.active_window;
        core.module.layout.workspace.window_manager.window[active].editor.editor.setValue(msg);
    }, [random, msg])
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