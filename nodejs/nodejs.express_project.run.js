var server_url = '';
var handles;

module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
    browser
      .url('http://qa.goorm.io')
      .waitForElementVisible('input.login-form', 2000)
      .setValue('input[name=id]', data.username)
      .setValue('input[name=pw]', data.password)
      .click('button[id=btn-login]')
      .waitForElementVisible('div#ide-vm-list', 2000)
      .pause(3000)
      .waitForElementNotPresent('button#btn-run-ide[disabled=disabled]', 10000)
      .click('button[plugin=nodejs]')
      .click('#btn-run-ide')
      .pause(5000)
      .waitForElementVisible('#workspace', 120000)
      .verify.urlEquals('http://ide.goorm.io/');
  },
  'create_default_project' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 200000)
      .waitForElementNotVisible('#dlg_loading_bar', 200000)
      .pause(3000)
      .click('#g_cfrm_btn_no') //if there is confirmation
      .pause(2000)
      .waitForElementNotVisible('#dlg_loading_bar', 20000)
      .click('#main_file_toolbar button[action=new_project]')
      .waitForElementVisible('#dlg_new_project', 10000)
      .click('.project_wizard_first_button[project_type=nodejs]')
      .waitForElementVisible('.project_wizard_second_button[project_type=nodejs]', 10000)
      .click('.project_wizard_second_button[detail_type=express]')
      .waitForElementVisible('.project_wizard_second_button.selected_button[detail_type=express]', 10000)
      .click('#g_np_btn_next')
      .waitForElementVisible('#input_project_name', 10000)
      .setValue('#input_project_name', 'nodejs_express')
      .click('#g_np_btn_ok_template')
      .waitForElementNotVisible('#dlg_new_project', 200000)
      .waitForElementNotVisible('#dlg_loading_bar', 500000)
      .verify.containsText('#selected_project_name', 'nodejs_express')
      
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
      .verify.containsText('#server_tab_nodejs .inner_content', 'Express server listening')//check log
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
  'stop_server' : function (browser) {
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
      .verify.containsText('#server_tab_nodejs .inner_content', 'Express server listening')//check log
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
              .closeWindow()
              .switchWindow(handles[0])
          });
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
      .click('#g_cfrm_btn_yes')
      .waitForElementVisible('#dlg_notice', 100000)
      .click('#g_nt_btn_ok')
      .end();
  }
};