var current = __filename.split('/');
var plugin = current[current.length - 2];
var detail_type = current[current.length - 1].split('.')[0];
var project_name = plugin + detail_type + Math.floor(Math.random() * 100000);

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
  'build_project' : function (browser) {
    browser
      .build_project('menu')
      .pause(3000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#server_tab_build .clear_build_log_btn')
      .build_project('rebuild')
      .pause(3000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#gLayoutServer_build .hide_tab')
      .pause(1000)
      .build_project('toolbar')
      .pause(3000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#gLayoutServer_build .hide_tab')
      .pause(1000)
      .build_project('keyboard')
      .pause(3000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#gLayoutServer_build .hide_tab')
  },
  'change_build_config' : function (browser) {
    var change = function (property) {
      browser
        .click('#project_' + plugin + '_tab .restore_default')
        .setValue('[id="plugin.' + plugin + '.' + property + '"]', 'asdf')
        .click('#project_' + plugin + '_tab .apply')
        .build_project()
        .waitForElementVisible('#dlg_alert', 10000, false)
        .click('#g_alert_btn_ok')
        .pause(1000)
    }
    browser
      .click('#main-menu-project a[class=dropdown-toggle]')
      .pause(1000)
      .click('#main-menu-project a[action=build_configuration]')
      .waitForElementVisible('#dlg_project_property', 20000, false)
    change('main')
    change('source_path')
    change('build_path')
    browser
      .click('#project_' + plugin + '_tab .restore_default')
      .click('#project_' + plugin + '_tab .apply')
      .click('#g_pp_btn_ok')
      .pause(1500)
  },
  'modify_file' : function (browser) {
    browser
      .getAttribute('.g_windows_tab_li.active .tab_title', 'filepath', function(result) {
        var path = result.value;
        browser
          .getAttribute('.g_windows_tab_li.active .tab_title', 'filename', function(result) {
            path += result.value;
            path = path.substring(path.indexOf('/') + 1);
            browser
              .execute(function() {
                var context = 
                  'abcdefg';
                var active = core.module.layout.workspace.window_manager.active_window;
                  core.module.layout.workspace.window_manager.window[active].editor.editor.setValue(context);
              })
              .pause(3000)
              .build_project()
              .pause(1000)
              .click('.g_windows_tab_li.active .tab_close_button')
              .pause(1000)
              .open_file(path.substring(path))
              .pause(3000)
              .verify.containsText('.ui-dialog-content[path$="' + path + '"] .CodeMirror-lines', 'abcdefg')
          })
      })
  },
  'delete_project' : function (browser) {
    browser
      .delete_project(project_name)
      .end();
  }
}