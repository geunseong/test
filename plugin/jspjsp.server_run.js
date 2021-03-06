var current = __filename.split('/');
var plugin = current[current.length - 2];
var detail_type = current[current.length - 1].split('.')[0];
var project_name = plugin + detail_type + Math.floor(Math.random() * 100000);

var tab_name = 'jsp_default';
var console_msg = 'done'; //when server running
var server_msg = 'message = Hello World'; //when server running
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
      .pause(2000)
      .click('#g_cfrm_btn_yes') //if there is confirmation
      .pause(2000)
      .waitForElementVisible('#gLayoutServer_' + tab_name, 30000, false)
      .pause(2000)
  },
  'check_server_run' : function (browser) {
    browser
      .check_server_running(tab_name, console_msg, server_msg, function(result) {
        handles = result;
      })
  },
  'stop_server_with_button' : function (browser) {
    browser
      .click('#server_tab_' + tab_name + ' .btn-danger')
      .pause(1000)
      .click('#g_cfrm_btn_yes') //if there is confirmation
      .pause(2000)
      .check_server_stopped(handles, server_msg);
  },
  'check_server_restart' : function (browser) {
    browser
      .click('#server_tab_' + tab_name + ' .btn-primary')
      .pause(1000)
      .click('#g_cfrm_btn_yes') //if there is confirmation
      .check_server_running(tab_name, console_msg, server_msg, function(result) {
        handles = result;
      })
  },
  'stop_server_with_tab_close' : function (browser) {
    browser
      .click('#gLayoutServer_' + tab_name + ' span')
      .pause(1000)
      .click('#g_cfrm_btn_yes') //if there is confirmation
      .pause(2000)
      .check_server_stopped(handles, server_msg);  
  },
  'run_with_toolbar_and_check_tab' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .click('#main_project_toolbar button[action=run]')
      .waitForElementVisible('#gLayoutServer_' + tab_name, 30000, false)
      .pause(2000)
  },
  'check_log_maintain' : function (browser) {
    browser
      .click('#gLayoutServer_' + tab_name)
      .pause(2000)
      .getText('#server_tab_' + tab_name + ' .inner_content', function (result) {
        var result = result.value;
        browser
          .click('#gLayoutTab_Terminal')
          .pause(2000)
          .click('#gLayoutServer_' + tab_name)
          .pause(2000)
          .verify.containsText('#server_tab_' + tab_name + ' .inner_content', result)
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