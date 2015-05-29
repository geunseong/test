var create_test_file = function (browser) {
  var random = Math.random();
  browser
    .execute(function(random) {
      var context = 
        'function main(){' +
        ' console.log("Hello ' + random + '!");' +
        '}' +
        'main();';
      var active = core.module.layout.workspace.window_manager.active_window;
        core.module.layout.workspace.window_manager.window[active].editor.editor.setValue(context);
    }, [random])
    .pause(3000)
    .click('button[action=save_file]')
    .pause(1000)

  return random
};

var project_name = 'nodejs_test2';

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
  'run_with_menu' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .pause(3000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=run]', 10000)
      .click('#main-menu-project a[action=run]')
      .waitForElementVisible('#dlg_toast', 10000, false)
      .pause(2000)
      .verify.containsText('#run_inner_content', 'Hello Goorm!')
      .pause(3000)
  },
  'run_with_toolbar' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
    var random = create_test_file(browser);
    browser
      .click('#main_project_toolbar button[action=run]')
      .waitForElementVisible('#dlg_toast', 10000, false)
      .pause(2000)
      .verify.containsText('#run_inner_content', 'Hello ' + random + '!')
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
      .waitForElementVisible('#dlg_toast', 10000, false)
      .pause(2000)
      .verify.containsText('#run_inner_content', 'Hello ' + random + '!')
      .pause(2000)       
  },
  'delete_project' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=delete_project]', 10000)
      .click('#main-menu-project a[action=delete_project]')
      .waitForElementVisible('#dlg_delete_project', 10000)
      .click('#selector_nodejs_test2')
      .click('#g_dp_btn_ok')
      .waitForElementVisible('#dlg_confirmation', 50000)
      .click('#g_cfrm_btn_yes')
      .waitForElementVisible('#dlg_notice', 10000)
      .click('#g_nt_btn_ok')
      .end();
  }
};