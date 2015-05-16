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
      .waitForElementNotPresent('button.btn-run-ide[disabled=disabled]', 10000)
      .click('.btn-run-ide')
      .pause(5000)
      .waitForElementVisible('#workspace', 120000)
      .verify.urlEquals('http://ide.goorm.io/');
  },
  'project_create' : function (browser) {
    browser
      .waitForElementPresent('img.user_profile_image', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .click('#main_file_toolbar button[action=new_project]')
      .waitForElementVisible('#dlg_new_project', 2000)
      .pause(2000)
      .assert.cssClassPresent('a.project_wizard_first_button', 'active')
      .click('#new_project_template div.project_wizard_second_button')
      .waitForElementVisible('div.project_wizard_second_button.selected_button', 1000)
      .click('#g_np_btn_next')
      .waitForElementVisible('#input_project_name', 1000)
      .setValue('#input_project_name', 'cpp1')
      .click('#g_np_btn_ok_template')
      .waitForElementNotVisible('#dlg_new_project', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .verify.containsText('#selected_project_name', 'cpp1')
      .end();
  }
};