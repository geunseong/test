module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
    browser
      .run_ide(data.username, data.password, data.plugin)
      .waitForElementPresent('li.me img.user_profile_image', 20000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)
      .pause(1000)
      .click('#g_cfrm_btn_no') //if there is confirmation
      .pause(1000)
      .waitForElementNotVisible('#dlg_loading_bar', 50000);
  },
  'open_shared_project_and_share_panel' : function (browser) {
    browser
      .click('button#project_selectbox')
      .waitForElementPresent('#project_selector > div.open', 3000)
      //Check Shared_Project
      .verify.elementPresent('#shared_header + li')
      .getAttribute('#shared_header + li', 'project_path', function (result) {
        var project_path = result.value;
        //asdsad_asdasdsad_Test => _ split => return last argument => Test
        var project_name = project_path.split("_").pop();
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
        var project_name = project_path.split("_").pop();
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
    //Need common used account for QA team
      .setValue('#user_search_input', 'test_qa2@goorm.io')
      .waitForElementVisible('#user_search_result_container > ul', 3000, false, function (result){
        if (result.value) {
          this
            .verify.containsText('#user_search_result_container > ul a:first-child', 'test_qa2@goorm.io')
            .pause(2000)
        }
        this.clearValue('#user_search_input')
      })
  },
  'find_exist_user_with_name' : function (browser) {
    browser
    //Need common used account for QA team.
      .setValue('#user_search_input', 'QA')
      .pause(2000)
      .waitForElementVisible('#user_search_result_container > ul', 3000, false)
      .verify.containsText('#user_search_result_container > ul a:first-child', 'QA')
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
