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
  'open_shared_project_and_share_panel' : function (browser) {
    browser
      .waitForElementPresent('li.me img.user_profile_image', 20000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .pause(1000)
      .click('button#project_selectbox')
      .waitForElementPresent('#project_selector > div.open', 3000)
      .verify.elementPresent('#shared_header + li')
      .getAttribute('#shared_header + li', 'project_path', function (result) {
        var project_path = result.value;
        var project_name = project_path.split("_").slice(2).join("_");
        this.click('#shared_header + li')
          .pause(2000)
          .waitForElementNotVisible('#dlg_loading_bar', 10000)
          .verify.containsText('#selected_project_name', project_name)
          .click('#main-menu-project > a')
          .waitForElementPresent('#main-menu-project.open', 2000)
          .click('#main-menu-project a[action=share_project]')
          .waitForElementVisible('#dlg_project_share', 3000)
          .pause(2000)
          .verify.attributeEquals('#project_share_select_list :checked', 'localization_key', 'select_project')
          .waitForElementPresent('.modal-backdrop.fade.in', 10000)
          .click('#g_prjs_btn_cancel')
          .waitForElementNotPresent('.modal-backdrop', 10000);
      });
  },
  'open_owned_project_and_share_panel' : function (browser) {
    browser
      .waitForElementPresent('li.me img.user_profile_image', 20000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .pause(1000)
      .click('button#project_selectbox')
      .waitForElementPresent('#project_selector > div.open', 3000)
      .getAttribute('#my_projects_header + li', 'project_path', function (result) {
        var project_path = result.value;
        var project_name = project_path.split("_").slice(2).join("_");
        this.click('#my_projects_header + li')
          .pause(2000)
          .waitForElementNotVisible('#dlg_loading_bar', 10000)
          .verify.containsText('#selected_project_name', project_name)
          .click('#main-menu-project > a')
          .waitForElementPresent('#main-menu-project.open', 2000)
          .click('#main-menu-project a[action=share_project]')
          .waitForElementVisible('#dlg_project_share', 3000)
          .pause(2000)
          .verify.containsText('#project_share_select_list :checked', project_path)
          .waitForElementPresent('.modal-backdrop.fade.in', 10000)
          .click('#g_prjs_btn_cancel')
          .waitForElementNotPresent('.modal-backdrop', 10000)
      })
    },
  'open_project_table_and_share_panel' : function (browser) {
    browser
      .waitForElementPresent('li.me img.user_profile_image', 20000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .pause(1000)
      .click('button#project_selectbox')
      .waitForElementPresent('#project_selector > div.open', 3000)
      .click('#back_to_project_table')
      .pause(2000)
      .click('#main-menu-project > a')
      .waitForElementPresent('#main-menu-project.open', 2000)
      .click('#main-menu-project a[action=share_project]')
      .waitForElementVisible('#dlg_project_share', 3000)
      .pause(2000)
      .verify.attributeEquals('#project_share_select_list :checked', 'localization_key', 'select_project')
  },
  'check_when_project_not_selected' : function (browser) {
    browser
      .click('#g_prjs_btn_ok')
      .pause(1000)
      .waitForElementVisible('#dlg_alert', 3000, false)
      .pause(1000)
      .click('#g_alert_btn_ok')
  },
  'select_project_in_panel' : function (browser) {
    browser
      .click('#project_share_select_list')
      .pause(1000)
      .click('#project_share_select_list option:nth-child(2)')
      .pause(1000)
  },
  'check_placehold' : function (browser) {
      browser
        .getAttribute('#user_search_input', 'placeholder', function (result) {
          var result = result.value;
          this.verify.equal(true, /email|이메일/.test(result), 'Element <#user_search_input> has placeholder contain "email" or "이메일"');
        })
  },
  'find_exist_user_with_email' : function (browser) {
    browser
      .setValue('#user_search_input', 'attainer')
      .waitForElementVisible('#user_search_result_container > ul', 3000, false, function (result){
        if (result.value) {
          this
            .verify.containsText('#user_search_result_container > ul a:first-child', 'attainer')
            .clearValue('#user_search_input')
            .setValue('#user_search_input', 'nys')
            .pause(2000)
            .verify.containsText('#user_search_result_container > ul a:first-child', 'nys')
            
        }
        this.clearValue('#user_search_input')
      })
  },
  'find_exist_user_with_name' : function (browser) {
    browser
      .setValue('#user_search_input', '테스트')
      .pause(2000)
      .waitForElementVisible('#user_search_result_container > ul', 3000, false)
      .verify.containsText('#user_search_result_container > ul a:first-child', '테스트')
      .clearValue('#user_search_input')
  },
  'check_when_user_not_selected' : function (browser) {
    browser
      .click('#g_prjs_btn_ok')
      .pause(1000)
      .waitForElementNotVisible('#dlg_project_share', 3000, false)
      .end()
  }
}