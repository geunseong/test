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
      .click('.project_wizard_second_button[detail_type=default]')
      .waitForElementVisible('.project_wizard_second_button.selected_button[detail_type=default]', 10000)
      .click('#g_np_btn_next')
      .waitForElementVisible('#input_project_name', 10000)
      .setValue('#input_project_name', 'nodejs_test2')
      .click('#g_np_btn_ok_template')
      .waitForElementNotVisible('#dlg_new_project', 50000)
      .waitForElementNotVisible('#dlg_loading_bar', 50000)
      .verify.containsText('#selected_project_name', 'nodejs_test2')
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