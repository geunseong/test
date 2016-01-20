module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
      browser.run_ide(data.username, data.password);
  },
  'project_create' : function (browser) {
    browser
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
      .logout(browser);
  }
};
