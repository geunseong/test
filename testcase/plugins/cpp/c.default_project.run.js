var project_name = 'cpp_test90';
var plugin = 'cpp';
var detail_type = 'c';
var default_msg = 'Hello, goorm!';

var create_test_file = function (browser) {
  var random = Math.random();
  browser
    .execute(function(random, default_msg) {
      var context = 
        '#include <stdio.h>\n\nint main(){' +
        ' printf("' + default_msg + random + '");' +
        '}';
      var active = core.module.layout.workspace.window_manager.active_window;
        core.module.layout.workspace.window_manager.window[active].editor.editor.setValue(context);
    }, [random, default_msg])
    .pause(3000)
    .click('button[action=save_file]')
    .pause(1000)

  return random
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
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .pause(3000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .pause(1000)
      .click('#main-menu-project a[action=run]')
      .pause(1000)
      .click('#g_cfrm_btn_yes') //if there is confirmation
      .pause(4000)
      .verify.containsText('#run_inner_content', default_msg)
      .pause(3000)
  },
  'run_with_toolbar' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
    var random = create_test_file(browser);
    browser
      .click('#main_project_toolbar button[action=run]')
      .pause(1000)
      .click('#g_cfrm_btn_yes') //if there is confirmation
      .pause(4000)
      .verify.containsText('#run_inner_content', default_msg + random)
      .pause(2000)
  },
  'run_with_keyboard' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
    var random = create_test_file(browser);
    browser
      .keys([browser.Keys.SHIFT, browser.Keys.F5])
      .pause(1000)
      .keys(browser.Keys.NULL)
      .pause(1000)
      .click('#g_cfrm_btn_yes') //if there is confirmation
      .pause(4000)
      .verify.containsText('#run_inner_content', default_msg + random)
      .pause(2000)       
  },
    'delete_project' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .pause(1000)
      .click('#main-menu-project a[action=delete_project]')
      .pause(1000)
      .click('#selector_' + project_name)
      .click('#g_dp_btn_ok')
      .waitForElementVisible('#dlg_confirmation', 50000)
      .click('#g_cfrm_btn_yes')
      .waitForElementVisible('#dlg_notice', 10000)
      .click('#g_nt_btn_ok')
      .end();
  }
};