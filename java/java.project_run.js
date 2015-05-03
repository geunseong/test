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
      .click('button[plugin=cpp]')
      .click('button[plugin=java]')
      .click('#btn-run-ide')
      .pause(5000)
      .waitForElementVisible('#workspace', 120000)
      .verify.urlEquals('http://ide.goorm.io/');
  },
  'java_project_create' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 1000000)
      .waitForElementNotVisible('#dlg_loading_bar', 1000000)
      .pause(3000)
      .click('#main_file_toolbar button[action=new_project]')
      .waitForElementVisible('#dlg_new_project', 1000000)
      .assert.cssClassPresent('a.project_wizard_first_button', 'active')
      .click('#new_project_template div.project_wizard_second_button')
      .waitForElementVisible('div.project_wizard_second_button.selected_button', 1000000)
      .click('#g_np_btn_next')
      .waitForElementVisible('#input_project_name', 1000000)
      .setValue('#input_project_name', 'java_test')
      .click('#g_np_btn_ok_template')
      .waitForElementNotVisible('#dlg_new_project', 1000000)
      .waitForElementNotVisible('#dlg_loading_bar', 1000000)
      .verify.containsText('#selected_project_name', 'java_test')
  },
  'java_project_run_menu' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 100000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=run]', 100000)
      .click('#main-menu-project a[action=run]')
      .waitForElementVisible('#dlg_confirmation', 100000)
      .click('#g_cfrm_btn_yes')
      .waitForElementVisible('#gLayoutServer_run', 100000)
      .waitForElementVisible('#dlg_toast', 100000)
      .verify.containsText('#server_tab_run', 'Hello, goorm!')
      .click('#gLayoutServer_run .hide_tab')
  },
  'java_project_run_toolbar' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 1000000)
      .waitForElementNotVisible('#dlg_loading_bar', 1000000)
      .click('#main_project_toolbar button[action=run]')
      .waitForElementVisible('#gLayoutServer_run', 100000)
      .waitForElementVisible('#dlg_toast', 100000)
      .verify.containsText('#server_tab_run', 'Hello, goorm!')
      .click('#gLayoutServer_run .hide_tab')
  },
  'java_project_delete' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 100000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=delete_project]', 100000)
      .click('#main-menu-project a[action=delete_project]')
      .waitForElementVisible('#dlg_delete_project', 100000)
      .click('#selector_java_test')
      .click('#g_dp_btn_ok')
      .waitForElementVisible('#dlg_confirmation', 100000)
      .click('#g_cfrm_btn_yes')
      .waitForElementVisible('#dlg_notice', 100000)
      .click('#g_nt_btn_ok')
      .click('#g_dp_btn_cancel')
  },
  'java_project_create2' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 1000000)
      .waitForElementNotVisible('#dlg_loading_bar', 1000000)
      .pause(3000)
      .click('#main_file_toolbar button[action=new_project]')
      .waitForElementVisible('#dlg_new_project', 1000000)
      .assert.cssClassPresent('a.project_wizard_first_button', 'active')
      .click('#new_project_template div.project_wizard_second_button')
      .waitForElementVisible('div.project_wizard_second_button.selected_button', 1000000)
      .click('#g_np_btn_next')
      .waitForElementVisible('#input_project_name', 1000000)
      .setValue('#input_project_name', 'java_test')
      .click('#g_np_btn_ok_template')
      .waitForElementNotVisible('#dlg_new_project', 1000000)
      .waitForElementNotVisible('#dlg_loading_bar', 1000000)
      .verify.containsText('#selected_project_name', 'java_test')
  },
  'java_project_build_toolbar' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 1000000)
      .waitForElementNotVisible('#dlg_loading_bar', 1000000)
      .click('#main_project_toolbar button[action=build_project]')
      .waitForElementVisible('#server_tab_build', 1000000)
      .waitForElementVisible('#dlg_toast', 1000000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#server_tab_build .rebuild_btn')
      .waitForElementVisible('#dlg_toast', 1000000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#gLayoutServer_build .hide_tab')
  },
  'java_project_run_toolbar2' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 1000000)
      .waitForElementNotVisible('#dlg_loading_bar', 1000000)
      .click('#main_project_toolbar button[action=run]')
      .waitForElementVisible('#dlg_confirmation', 100000)
      .waitForElementVisible('#gLayoutServer_run', 100000)
      .waitForElementVisible('#dlg_toast', 100000)
      .verify.containsText('#server_tab_run', 'Hello, goorm!')
      .click('#gLayoutServer_run .hide_tab')
  },
  'delete_file': function(browser) {
    var file_name = 'main.class';

    browser
      .click('.jstree-ocl')
      .click('.jstree-ocl')
      .click('.jstree-ocl')
      .click('.jstree-node[id$="' + file_name + '"] a')
      .click('#main-menu-file .dropdown-toggle')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('[action=delete_file]')
      .waitForElementVisible('#dlg_confirmation', 2000)
      .click('#g_cfrm_btn_yes')
      .waitForElementNotVisible('#dlg_confirmation', 10000)
      .waitForElementNotPresent('.jstree-node[id$="' + file_name + '"]', 2000)
  },
  'java_project_run_menu3' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 100000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=run]', 100000)
      .click('#main-menu-project a[action=run]')
      .waitForElementVisible('#dlg_confirmation', 100000)
      .click('#g_cfrm_btn_yes')
      .waitForElementVisible('#gLayoutServer_run', 100000)
      .waitForElementVisible('#dlg_toast', 100000)
      .verify.containsText('#server_tab_run', 'Hello, goorm!')
      .click('#gLayoutServer_run .hide_tab')
  },
  'java_project_delete2' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 100000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=delete_project]', 100000)
      .click('#main-menu-project a[action=delete_project]')
      .waitForElementVisible('#dlg_delete_project', 100000)
      .click('#selector_java_test')
      .click('#g_dp_btn_ok')
      .waitForElementVisible('#dlg_confirmation', 100000)
      .click('#g_cfrm_btn_yes')
      .waitForElementVisible('#dlg_notice', 100000)
      .click('#g_nt_btn_ok')
      .end()
  }
};