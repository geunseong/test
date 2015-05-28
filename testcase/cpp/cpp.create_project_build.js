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
      .waitForElementNotPresent('button.btn-run-ide[disabled=disabled]', 10000)
      .click('.btn-run-ide')
      .pause(5000)
      .waitForElementVisible('#workspace', 120000)
      .verify.urlEquals('http://ide.goorm.io/');
  },
  'cpp_project_create' : function (browser) {
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
      .setValue('#input_project_name', 'cpp_test')
      .click('#g_np_btn_ok_template')
      .waitForElementNotVisible('#dlg_new_project', 1000000)
      .waitForElementNotVisible('#dlg_loading_bar', 1000000)
      .verify.containsText('#selected_project_name', 'cpp_test')
  },
  'cpp_project_error_make' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 100000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=sort_lines]', 100000)
      .click('#main-menu-edit a[action=sort_lines]')
      .click('#main_file_toolbar button[action=save_file]')
  },
  'cpp_project_build_menu_lint' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 1000000)
      .waitForElementNotVisible('#dlg_loading_bar', 1000000)
      .click('#gLayoutTab_Debug')
      .click('#main-menu-project a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=build_project]', 1000000)
      .click('#main-menu-project a[action=build_project]')
      .pause(3000)
      .verify.visible('#output_tab_cpp')
      .click('#gLayoutTab_Debug')
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=do_undo]', 100000)
      .click('#main-menu-edit a[action=do_undo]')
      .click('#main_file_toolbar button[action=save_file]')
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=do_redo]', 100000)
      .click('#main-menu-edit a[action=do_redo]')
      .click('#main_file_toolbar button[action=save_file]')
      .pause(3000)
      .verify.visible('#output_tab_cpp')
  },
  'cpp_project_error_fix' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 100000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=do_undo]', 100000)
      .click('#main-menu-edit a[action=do_undo]')
      .click('#main_file_toolbar button[action=save_file]')
      .verify.elementPresent('#output_tab_cpp .dataTables_empty')
  },
  'cpp_project_build_menu' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 100000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=build_project]', 100000)
      .click('#main-menu-project a[action=build_project]')
      .waitForElementVisible('#server_tab_build', 100000)
      .waitForElementVisible('#dlg_toast', 100000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#server_tab_build .rebuild_btn')
      .waitForElementVisible('#dlg_toast', 100000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#gLayoutServer_build .hide_tab')
  },
  'cpp_project_error_make2' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 100000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=sort_lines]', 100000)
      .click('#main-menu-edit a[action=sort_lines]')
      .click('#main_file_toolbar button[action=save_file]')
  },
  'cpp_project_build_toolbar_lint' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 1000000)
      .waitForElementNotVisible('#dlg_loading_bar', 1000000)
      .click('#gLayoutTab_Debug')
      .click('#main_project_toolbar button[action=build_project]')
      .pause(3000)
      .verify.visible('#output_tab_cpp')
      .click('#gLayoutTab_Debug')
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=do_undo]', 100000)
      .click('#main-menu-edit a[action=do_undo]')
      .click('#main_file_toolbar button[action=save_file]')
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=do_redo]', 100000)
      .click('#main-menu-edit a[action=do_redo]')
      .click('#main_file_toolbar button[action=save_file]')
      .pause(3000)
      .verify.visible('#output_tab_cpp')
  },
  'cpp_project_error_fix2' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 100000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=do_undo]', 100000)
      .click('#main-menu-edit a[action=do_undo]')
      .click('#main_file_toolbar button[action=save_file]')
      .verify.elementPresent('#output_tab_cpp .dataTables_empty')
  },
  'cpp_project_build_toolbar' : function (browser) {
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
  'cpp_project_delete' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 100000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=delete_project]', 100000)
      .click('#main-menu-project a[action=delete_project]')
      .waitForElementVisible('#dlg_delete_project', 100000)
      .click('#selector_cpp_test')
      .click('#g_dp_btn_ok')
      .waitForElementVisible('#dlg_confirmation', 100000)
      .click('#g_cfrm_btn_yes')
      .waitForElementVisible('#dlg_notice', 100000)
      .click('#g_nt_btn_ok')
      .end();
  }
};