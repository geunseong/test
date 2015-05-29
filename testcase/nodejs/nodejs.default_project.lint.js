var project_name = 'nodejs_test4';

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
      .new_project('nodejs', 'default', project_name)
  },
  'make_error_and_warning_file' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .execute(function() {
        var context = 
          'function test(){\n' +
          '  consolee.log(1);\n' +
          '};\n' +
          'fu!nction test(){\n' +
          '  consolee.log(1);\n' +
          '};\n' +
          'a.id = null;';
        var active = core.module.layout.workspace.window_manager.active_window;
          core.module.layout.workspace.window_manager.window[active].editor.editor.setValue(context);
      })
      .pause(3000)
      .click('button[action=save_file]')
      .pause(2000);
  },
  'run_with_keyboard' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .keys([browser.Keys.SHIFT, browser.Keys.F5])
      .pause(1000)
      .keys(browser.Keys.NULL)
      .waitForElementVisible('#dlg_toast', 10000, false)
      .pause(2000)
  },
  'check_output' : function (browser) {
    browser
      .click('#gLayoutOutput_nodejs')
      .waitForElementVisible('#output_tab_nodejs tbody tr', 20000, false)
      .verify.containsText('#output_tab_nodejs tbody', 'error:')
      .verify.containsText('#output_tab_nodejs tbody', 'warning:')
      .verify.elementPresent('.fa-exclamation-triangle') //warning
      .verify.elementPresent('.fa-times-circle') //error
  },
  'delete_project' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=delete_project]', 10000)
      .click('#main-menu-project a[action=delete_project]')
      .waitForElementVisible('#dlg_delete_project', 100000)
      .click('#selector_nodejs_test4')
      .click('#g_dp_btn_ok')
      .waitForElementVisible('#dlg_confirmation', 50000)
      .click('#g_cfrm_btn_yes')
      .waitForElementVisible('#dlg_notice', 10000)
      .click('#g_nt_btn_ok')
      .end();
  }
};