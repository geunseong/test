var current = __filename.split('/');
var plugin = current[current.length - 2];
var detail_type = current[current.length - 1].split('.')[0];
var project_name = plugin + detail_type + Math.floor(Math.random() * 100000);

var default_msg = 'DEFAULT_MSG';
var context = 'CONTEXT';

var create_test_file = function (browser) {
  browser
    .execute(function(context) {
      var active = core.module.layout.workspace.window_manager.active_window;
        core.module.layout.workspace.window_manager.window[active].editor.editor.setValue(context);
    }, [context])
    .pause(3000)
    .click('button[action=save_file]')
    .pause(1000)
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
    create_test_file(browser);
    browser
      .run_project('toolbar')
      .pause(1500)
      .waitForElementPresent('#run_inner_content', 10000)
      .pause(1000)
      .click('#run_inner_content')
      .pause(1000)
      for(var i = 0; i < 10; i++) {
        var random = Math.floor(Math.random() * 10000);
        browser
          .keys(random + '\n')
          .pause(1000)
          .keys(browser.Keys.NULL)
          .verify.containsText('#run_inner_content', random)
          .verify.containsText('#run_inner_content', random + 12345)
      }
      browser
        .pause(2000)
  },
  'delete_project' : function (browser) {
    browser
      .delete_project(project_name)
      .end()
  }
};