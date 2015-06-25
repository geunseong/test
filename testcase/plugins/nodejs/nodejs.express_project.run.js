var project_name = 'nodejs_express';
var plugin = 'nodejs';
var detail_type = 'express';
var server_url = '';
var handles;

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
  'run_with_toolbar' : function (browser) {
    browser
      .click('#main_project_toolbar button[action=run]')
      .waitForElementVisible('#gLayoutServer_' + plugin, 30000, false)
      .pause(2000)
  },
  'check_server_run' : function (browser) {
    browser
      .check_server_running(plugin, 'Express server listening', 'Welcome to Express', function(result) {
        handles = result;
      })
  },
  'stop_server_with_button' : function (browser) {
    browser
      .click('#server_tab_' + plugin + ' .btn-danger')
      .pause(1000)
      .click('#g_cfrm_btn_yes') //if there is confirmation
      .pause(2000)
      .check_server_stopped(handles, 'Welcome to Express');
  },
  'check_server_restart' : function (browser) {
    browser
      .click('#server_tab_' + plugin + ' .btn-primary')
      .pause(1000)
      .check_server_running(plugin, 'Express server listening', 'Welcome to Express', function(result) {
        handles = result;
      })
  },
  'stop_server_with_tab_close' : function (browser) {
    browser
      .click('#gLayoutServer_' + plugin + ' span')
      .pause(1000)
      .click('#g_cfrm_btn_yes') //if there is confirmation
      .pause(2000)
      .check_server_stopped(handles, 'Welcome to Express');  
  },
  'run_with_toolbar_and_check_tab' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .click('#main_project_toolbar button[action=run]')
      .waitForElementVisible('#gLayoutServer_' + plugin, 30000, false)
      .pause(2000)
  },
  'check_log_maintain' : function (browser) {
    browser
      .click('#gLayoutServer_' + plugin)
      .pause(2000)
      .getText('#server_tab_' + plugin + ' .inner_content', function (result) {
        var result = result.value;
        browser
          .click('#gLayoutTab_Terminal')
          .pause(2000)
          .click('#gLayoutServer_' + plugin)
          .pause(2000)
          .verify.containsText('#server_tab_' + plugin + ' .inner_content', result)
      })
  },
  'delete_project' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .pause(1000)
      .click('#main-menu-project a[action=delete_project]')
      .waitForElementVisible('#dlg_delete_project', 10000)
      .click('#selector_' + plugin + '_' + detail_type)
      .click('#g_dp_btn_ok')
      .waitForElementVisible('#dlg_confirmation', 500000)
      .getText('#dlg_confirmation', function (result) {
        browser.verify.equal(/서버가|Server/.test(result), true, 'Element <#dlg_confirmation> has message contain "서버가" or "Server"');
        browser
          .click('#g_cfrm_btn_yes')
          .waitForElementVisible('#dlg_notice', 100000)
          .click('#g_nt_btn_ok')
          .end();
      })
  }
};