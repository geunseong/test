var project_name = 'nodejs_express';
var server_url = '';
var handles;

module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
    browser
      .run_ide(data.username, data.password)
      .waitForElementPresent('li.me img.user_profile_image', 20000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)
      .pause(1000)
      .click('#g_cfrm_btn_no') //if there is confirmation
      .pause(1000)
      .waitForElementNotVisible('#dlg_loading_bar', 50000);
  },
  'create_default_project' : function (browser) {
    browser
      .new_project('nodejs', 'express', project_name)
  },
  'run_with_toolbar' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .click('#main_project_toolbar button[action=run]')
      .waitForElementVisible('#dlg_toast', 200000, false)
      .waitForElementVisible('#gLayoutServer_nodejs', 30000, false)
      .pause(2000)
  },
  'check_server_run' : function (browser) {
    browser
      .assert.containsText('#server_tab_nodejs .inner_content', 'Express server listening')//check log
      .getAttribute('#server_tab_nodejs .server_status :nth-child(3)', 'href', function(result) {
        server_url = result.value;
        browser
          .click('#server_tab_nodejs .server_status :nth-child(3)')
          .pause(10000)
          .windowHandles(function(result) {
            handles = result.value;
            browser.verify.equal(result.value.length, 2) //check url exists
            browser
              .switchWindow(handles[1])
              .verify.containsText('body', 'Welcome to Express')
              .switchWindow(handles[0])
          });
      })
  },
  'stop_server_with_button' : function (browser) {
    browser
      .click('#server_tab_nodejs .btn-danger')
      .pause(1000)
      .switchWindow(handles[1])
      .refresh()
      .pause(3000)
      .getText('html', function (result) {
        browser.verify.equal(result.value.indexOf('Welcom to Express'), -1)
        browser
          .closeWindow()
          .switchWindow(handles[0])
      })
  },
  'check_server_restart' : function (browser) {
    browser
      .click('#server_tab_nodejs .btn-primary')
      .waitForElementVisible('#dlg_toast', 200000, false)
      .assert.containsText('#server_tab_nodejs .inner_content', 'Express server listening')//check log
      .getAttribute('#server_tab_nodejs .server_status :nth-child(3)', 'href', function(result) {
        server_url = result.value;
        browser
          .click('#server_tab_nodejs .server_status :nth-child(3)')
          .pause(10000)
          .windowHandles(function(result) {
            handles = result.value;
            browser.verify.equal(result.value.length, 2) //check url exists
            browser
              .switchWindow(handles[1])
              .verify.containsText('body', 'Welcome to Express')
              .switchWindow(handles[0])
          });
      })
  },
  'stop_server_with_tab_close' : function (browser) {
    browser
      .click('#gLayoutServer_nodejs span')
      .pause(1000)
      .switchWindow(handles[1])
      .refresh()
      .pause(3000)
      .getText('html', function (result) {
        browser.verify.equal(result.value.indexOf('Welcom to Express'), -1)
        browser
          .closeWindow()
          .switchWindow(handles[0])
      })
  },
  'run_with_toolbar_and_check_tab' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .click('#main_project_toolbar button[action=run]')
      .waitForElementVisible('#dlg_toast', 200000, false)
      .waitForElementVisible('#gLayoutServer_nodejs', 30000, false)
      .pause(2000)
  },
  'check_log_maintain' : function (browser) {
    browser
      .click('#gLayoutServer_nodejs')
      .pause(2000)
      .getText('#server_tab_nodejs .inner_content', function (result) {
        var result = result.value;
        browser
          .click('#gLayoutTab_Terminal')
          .pause(2000)
          .click('#gLayoutServer_nodejs')
          .pause(2000)
          .verify.containsText('#server_tab_nodejs .inner_content', result)
      })
  },
  'delete_project' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=delete_project]', 10000)
      .click('#main-menu-project a[action=delete_project]')
      .waitForElementVisible('#dlg_delete_project', 10000)
      .click('#selector_nodejs_express')
      .click('#g_dp_btn_ok')
      .waitForElementVisible('#dlg_confirmation', 500000)
      .getText('#dlg_confirmation', function (result) {
        browser.verify.equal(true, /서버가|Server/.test(result), 'Element <#dlg_confirmation> has message contain "서버가" or "Server"');
        browser
          .click('#g_cfrm_btn_yes')
          .waitForElementVisible('#dlg_notice', 100000)
          .click('#g_nt_btn_ok')
          .end();
      })
  }
};