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
      .click('#btn-run-ide')
      .pause(5000)
      .waitForElementVisible('#workspace', 120000)
      .verify.urlEquals('http://ide.goorm.io/');
  },
  'cpp_project_create' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .pause(2000)
      .click('#main_file_toolbar button[action=new_project]')
      .waitForElementVisible('#dlg_new_project', 2000)
      .pause(2000)
      .assert.cssClassPresent('a.project_wizard_first_button', 'active')
      .click('#new_project_template div.project_wizard_second_button')
      .waitForElementVisible('div.project_wizard_second_button.selected_button', 1000)
      .click('#g_np_btn_next')
      .waitForElementVisible('#input_project_name', 1000)
      .setValue('#input_project_name', 'cpp_5')
      .click('#g_np_btn_ok_template')
      .waitForElementNotVisible('#dlg_new_project', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .verify.containsText('#selected_project_name', 'cpp_5')
  },
  'cpp_project_build_menu' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .pause(3000)
      .click('#main-menu-project a[class=dropdown-toggle]')
      .waitForElementVisible('a[action=build_project]', 10000)
      .click('#main-menu-project a[action=build_project]')
      .waitForElementVisible('#server_tab_build', 10000)
      .waitForElementVisible('#dlg_toast', 1000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#server_tab_build .rebuild_btn')
      .waitForElementVisible('#dlg_toast', 1000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#gLayoutServer_build .hide_tab')
  },
  'cpp_project_build_toolbar' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .pause(3000)
      .click('#main_project_toolbar button[action=build_project]')
      .waitForElementVisible('#server_tab_build', 10000)
      .waitForElementVisible('#dlg_toast', 1000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#server_tab_build .rebuild_btn')
      .waitForElementVisible('#dlg_toast', 1000)
      .verify.containsText('#server_tab_build .inner_content', 'Build Complete')
      .click('#gLayoutServer_build .hide_tab')
      .end();
  }
};