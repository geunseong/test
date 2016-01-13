module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
    var project = 'Test';
    browser
      .open_project_menu(project);
  },
  'file_open_file_from_toolbar' : function (browser) {
    var file_name = "test_file";
    browser
      .open_file_toolbar(file_name)
      .verify.title(file_name + " - goorm");
  },
  'file_open_file_from_menu' : function (browser){
    var file_name = "test_file";
    browser
      .open_file_menu(file_name);
  },
  'file_open_file_from_shortcut' : function (browser) {
    var file_name = "test_file".trim();
    browser
      .keys([browser.Keys.CONTROL,'o'])
      .keys(browser.Keys.NULL)
      .waitForElementVisible('#file_open_files [filename="' + file_name + '"]', 8000, false, function(e){console.log(e)})
      .click('#file_open_files [filename="' + file_name + '"]')
      .pause(300)
      .keys([browser.Keys.ENTER])
      .pause(300)
      .keys(browser.Keys.NULL)
      .click('#dlg_open_file .close') //if it didn't be closed yet 
      .waitForElementVisible('div.ui-dialog', 5000)

  },
  'file_edit_and_save_opend_file' : function (browser) {
    var file_name = "test_file";
    browser
      .keys('e')
      //아마 오류날듯
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click("#main-menu-file a[action=save_file]")
      .pause(2000)
  },
  'file_property_from_menu' :  function (browser) {
    var file_name = "test_file";
    browser
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
      .click('.jstree-node[id$="' + file_name + '"]')
      .pause(1000)    
      .click("#main-menu-file > a")
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click(".dropdown-menu a[action=property]")
      .waitForElementVisible('#dlg_property', 2000)
      .verify.containsText("#filename", file_name)
      .click('#g_fp_btn_close')
      .waitForElementNotVisible('#dlg_property', 2000)
  },

  //왜 안되는지 모르겠음
  // 'file_property_with_right_click' :  function (browser) {
  //   var file_name = "test_file";
  //   browser
  //     .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
  //     .click('.jstree-node[id$="' + file_name + '"]')
  //     .mouseButtonClick('right')
  //     .pause(800)
  //     .waitForElementPresent('ul.dropdown-menu', 2000)
  //     .click('.dropdown-menu a[action=property]')
  //     .waitForElementVisible('#dlg_property', 2000)
  //     .verify.containsText("#filename", file_name)
  //     .click('#g_fp_btn_close')
  //     .waitForElementNotVisible('#dlg_property', 2000)
  // },

  // 'file_root_property' :  function (browser) {
  //   browser
  //     .waitForElementPresent('.jstree-anchor', 2000)
  //     .click('.jstree-anchor')
  //     .mouseButtonClick('right')
  //     .waitForElementPresent('ul.dropdown-menu', 2000)
  //     .click('.dropdown-menu a[action=property]')
  //     .waitForElementVisible('#dlg_alert', 2000)
  //     .click('#g_alert_btn_ok')
  //     .waitForElementNotVisible('#dlg_alert', 2000)
  // },


  'file_open_file_from_url_without_project' :  function (browser) {
    var url = "google.com"
    browser
        .click('button#project_selectbox')
        .waitForElementPresent('#project_selector > div.open', 3000)
        .click('li#back_to_project_table > a')
        .pause(1000)
        .click('#main-menu-file > a')
        .waitForElementPresent('#main-menu-file.open', 2000)
        .click("#main-menu-file a[action=open_url]")
        .pause(1000)
        .waitForElementVisible('#dlg_alert', 2000)
        .click('button#g_alert_btn_ok')
        .waitForElementNotVisible('#dlg_alert', 3000)

  },
  'file_open_file_from_url' :  function (browser) {
    var url = "google.com"
    browser
        .move_to_project("Test")
        .click('#main-menu-file > a')
        .waitForElementPresent('#main-menu-file.open', 2000)
        .click("#main-menu-file a[action=open_url]")
        .waitForElementVisible("#dlg_open_url", 2000)
        .waitForElementVisible("#open_url_address:focus", 2000)
        .setValue('#open_url_address', url)
        .click('#g_ou_btn_ok')
        .waitForElementNotVisible("#dlg_open_url", 10000)
        .waitForElementPresent('span.tab_title[filename=\"'+url+'\"]', 2000)
        .end();
  },
}