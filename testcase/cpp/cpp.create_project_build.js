module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password,'cpp');
  },
  'cpp_project_create' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 3000)
      .waitForElementNotVisible('#dlg_loading_bar', 2000)
      .pause(1000)
      .click('#main_file_toolbar button[action=new_project]')
      .waitForElementVisible('#dlg_new_project', 3000)
      .assert.cssClassPresent('a.project_wizard_first_button', 'active')
      .click('#new_project_template div.project_wizard_second_button')
      .click('.project_wizard_second_button[detail_type="cpp"]')
      .waitForElementVisible('.project_wizard_second_button.selected_button[detail_type="cpp"]', 10000)
      .click('#g_np_btn_next')
      .waitForElementVisible('#input_project_name', 5000)
      .setValue('#input_project_name', 'Test')
      .click('#g_np_btn_ok_template')
      .waitForElementNotVisible('#dlg_new_project', 5000)
      .waitForElementNotVisible('#dlg_loading_bar', 5000)
      .verify.containsText('#selected_project_name', 'Test')
  },
  'cpp_project_error_make' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 5000)
      .waitForElementNotVisible('#dlg_loading_bar', 5000)
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .click('#main-menu-edit a[action=sort_lines]')
      .click('#main_file_toolbar button[action=save_file]')
  },
 'cpp_project_build_menu_lint' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 1000)
      .waitForElementNotVisible('#dlg_loading_bar', 5000)
      .click('#gLayoutTab_Debug')
      .click('#main-menu-project a[class=dropdown-toggle]')
      .click('#main-menu-project a[action=build_project]')
      .pause(3000)
      .verify.visible('#gLayoutServer_build')
      .click('#gLayoutTab_Debug')
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .click('#main-menu-edit a[action=do_undo]')
      .click('#main_file_toolbar button[action=save_file]')
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .click('#main-menu-edit a[action=do_redo]')
      .click('#main_file_toolbar button[action=save_file]')
      .pause(3000)
      //.verify.visible('#output_tab_cpp')
  },
  'cpp_project_error_fix' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 5000)
      .waitForElementNotVisible('#dlg_loading_bar', 5000)
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .click('#main-menu-edit a[action=do_undo]')
      .click('#main_file_toolbar button[action=save_file]')
      .click('#gLayoutOutput_cpp')
      .verify.elementPresent('.dataTables_empty')
  },

  'cpp_project_build_menu' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 5000)
      .waitForElementNotVisible('#dlg_loading_bar', 5000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .click('#main-menu-project a[action=build_project]')
      .waitForElementVisible('#gLayoutServer_build', 5000)
      .waitForElementVisible('#dlg_toast', 5000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#server_tab_build .rebuild_btn')
      .pause(5000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      //.click('#gLayoutServer_build .hide_tab')
  },

  'cpp_project_error_make2' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 5000)
      .waitForElementNotVisible('#dlg_loading_bar', 5000)
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .click('#main-menu-edit a[action=sort_lines]')
      .click('#main_file_toolbar button[action=save_file]')
  },

  'cpp_project_build_toolbar_lint' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 5000)
      .waitForElementNotVisible('#dlg_loading_bar', 5000)
      .click('#gLayoutTab_Debug')
      .click('#main_project_toolbar button[action=build_project]')
      .pause(3000)
      .verify.visible('#output_tab_cpp')
      .click('#gLayoutTab_Debug')
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .click('#main-menu-edit a[action=do_undo]')
      .click('#main_file_toolbar button[action=save_file]')
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .click('#main-menu-edit a[action=do_redo]')
      .click('#main_file_toolbar button[action=save_file]')
      .pause(3000)
      .verify.visible('#output_tab_cpp')
  },
  'cpp_project_error_fix2' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 5000)
      .waitForElementNotVisible('#dlg_loading_bar', 5000)
      .click('#main-menu-edit a[class=dropdown-toggle]')
      .click('#main-menu-edit a[action=do_undo]')
      .click('#main_file_toolbar button[action=save_file]')
      .click('#gLayoutOutput_cpp')
      .verify.elementPresent('.dataTables_empty')
  },
  'cpp_project_build_toolbar' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 5000)
      .waitForElementNotVisible('#dlg_loading_bar', 5000)
      .click('#main_project_toolbar button[action=build_project]')
      .pause(2000)
      //.waitForElementVisible('#gLayoutServer_build', 5000)
      .waitForElementVisible('#dlg_toast', 5000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#server_tab_build .rebuild_btn')
      //.waitForElementVisible('#dlg_toast', 5000)
      .pause(2000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      //.click('#gLayoutServer_build .hide_tab')
  },

  'cpp_project_delete' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 5000)
      .waitForElementNotVisible('#dlg_loading_bar', 5000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .click('#main-menu-project a[action=delete_project]')
      .waitForElementVisible('#dlg_delete_project', 5000)
      //.click('#selector_Test')
      .click('#g_dp_btn_ok')
      .waitForElementVisible('#dlg_confirmation', 5000)
      .click('#g_cfrm_btn_yes')
      .waitForElementVisible('#dlg_notice', 5000)
      .click('#g_nt_btn_ok')
      .click('#g_dp_btn_cancel')
      .logout(browser);
  }

};

