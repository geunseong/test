var project_name = 'jsp_default';
var plugin = 'jsp';
var detail_type = 'jsp';

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
      .pause(2000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#server_tab_build .clear_build_log_btn')
      .build_project('rebuild')
      .pause(2000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#gLayoutServer_build .hide_tab')
      .pause(1000)
      .build_project('toolbar')
      .pause(2000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#gLayoutServer_build .hide_tab')
      .pause(1000)
      .build_project('keyboard')
      .pause(2000)
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
  'delete_project' : function (browser) {
    browser
      .delete_project(project_name)
      .end();
  }

}