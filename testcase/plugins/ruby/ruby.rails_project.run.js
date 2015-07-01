var project_name = 'ruby_rails';
var plugin = 'ruby';
var detail_type = 'rubyonrails';
var tab_name = 'ruby_rubyonrails';
var console_msg = 'HTTPServer#start'; //when server running
var server_msg = 'You’re riding Ruby on Rails!'; //when server running
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
      .waitForElementPresent('[path$="' + project_name + '/bin"]', 150000, false)
  },
  'run_with_toolbar' : function (browser) {
    browser
      .click('#main_project_toolbar button[action=run]')
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