var project_name = 'java_test1234';
var plugin = 'java';
var detail_type = 'java_console';
var main_file = '/src/project/main.class'

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
      .click('#main_project_toolbar button[action=build_project]')
      .waitForElementVisible('#server_tab_build', 100000)
      .waitForElementVisible('#dlg_toast', 100000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .pause(1000)
      .click('#server_tab_build .clear_build_log_btn')
      .pause(1000)
      .click('#server_tab_build .rebuild_btn')
      .waitForElementVisible('#dlg_toast', 100000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#gLayoutServer_build .hide_tab')
      .pause(1000)
      .keys([browser.Keys.F5])
      .keys(browser.Keys.NULL)
      .waitForElementVisible('#dlg_toast', 100000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#gLayoutServer_build .hide_tab')
      .pause(1000)  
  },
  'delete_project' : function (browser) {
    browser
      .delete_project(project_name)
      .end();
  }

}