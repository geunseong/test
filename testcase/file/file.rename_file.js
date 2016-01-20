module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
    browser.open_project_menu();
  },
  // 'file_rename_root' :  function (browser) {
  //   browser
  //     .waitForElementVisible('.jstree-anchor[id$=\"'+ project +'_anchor\"]', 2000)
  //     .click('.jstree-anchor[id$=\"'+ project +'_anchor\"]')
  //     .pause(1000)
  //     .click("#main-menu-file > a")
  //     .waitForElementPresent('#main-menu-file.open', 2000)
  //     .waitForElementVisible('#dlg_alert', 2000, false)
  //     .click('#g_alert_btn_ok')
  //     .waitForElementNotVisible('#dlg_alert', 2000, false)
  // },

/*
  'file_rename_with_illegal_name' :  function (browser) {
    browser
      .waitForElementPresent('.jstree-leaf:last-child', 2000)
      .click('.jstree-leaf:last-child')
      .getText('.jstree-leaf:last-child', function(res){
        var prev_name = res.value;
        var new_name = "!@#"
    browser
      .pause(1000)
      .click("#main-menu-file > a")
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click(".dropdown-menu a[action=rename_file]")
      .pause(1000)
      .waitForElementVisible('#dlg_rename_file', 10000)
      .replace_input('#input_rename_new_filename', new_name)
      .click('#g_rf_btn_ok')
      .waitForElementVisible('#dlg_alert', 2000)
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 2000)
      .click('#g_rf_btn_cancel')
      .waitForElementNotVisible('#dlg_rename_file', 10000)
      //check if renamed file exist in tree
      .expect.element('.jstree-leaf:last-child').text.to.contain(prev_name);
      })
  },
*/
/*  'file_rename_already_exists' :  function (browser) {
 		browser.getAttribute('.jstree-leaf:last-child', 'path', function(res){
 			var new_name = res.value.split("/").pop();
      var new_file = 'test_file';
    browser
      .new_file(new_file)
      .click('.jstree-node[id$="' + new_file + '"]')
      .pause(1000)
      .click("#main-menu-file > a")
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click(".dropdown-menu a[action=rename_file]")
      .pause(1000)
      .waitForElementVisible('#dlg_rename_file', 10000)
      .replace_input('#input_rename_new_filename', new_name)
      .click('#g_rf_btn_ok')
      .waitForElementVisible('#dlg_confirmation', 2000)
      .click('#g_cfrm_btn_no')
      .waitForElementNotVisible('#dlg_confirmation', 2000)
      .click('#g_rf_btn_cancel')
      .waitForElementNotVisible('#dlg_rename_file', 10000)
      //check if renamed file exist in tree
      .waitForElementPresent('.jstree-node[id$="' + new_file + '"]', 2000)
      .delete_file(new_file)
 		})
  },*/
  'file_rename_to_existing_folder_name' :  function (browser) {
    browser.getAttribute('.jstree-node:nth-of-type(2)', 'id', function(res){
      console.log(res.value)
      var new_name = res.value.split("/").pop();
      var new_file = 'test_file';
      browser
      .waitForElementPresent('.jstree-leaf:last-child', 2000)
      .click('.jstree-leaf:last-child')
      .getText('.jstree-leaf:last-child', function(res){
        var prev_name = res.value;
        browser
          .pause(1000)
          .click("#main-menu-file > a")
          .waitForElementPresent('#main-menu-file.open', 2000)
          .click(".dropdown-menu a[action=rename_file]")
          .pause(1000)
          .waitForElementVisible('#dlg_rename_file', 10000)
          .replace_input('#input_rename_new_filename', new_name)
          .pause(1000)
          .click('#g_rf_btn_ok')
          .waitForElementVisible('#dlg_alert', 2000)
          .click('#g_alert_btn_ok')
          .waitForElementNotVisible('#dlg_alert', 2000)
          .click('#g_rf_btn_cancel')
          .waitForElementNotVisible('#dlg_rename_file', 10000)
          //check if renamed file exist in tree
          .waitForElementPresent('.jstree-node[id$="'+ prev_name.trim() +'"]', 3000)
 		  })
    })
  },

  'file_rename_from_file_menu' :  function (browser) {
  	 browser.getAttribute('.jstree-leaf:last-child', 'path', function(res){
      var prev_name = res.value.split("/").pop();
      console.log(res.value, prev_name)
      var new_name = 'new_file'.trim();
    browser
      .waitForElementPresent('.jstree-leaf:last-child', 2000)
      .click('.jstree-leaf:last-child')
      .pause(1000)
      .click("#main-menu-file > a")
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click(".dropdown-menu a[action=rename_file]")
      .pause(1000)
      .waitForElementVisible('#dlg_rename_file', 10000)
      .replace_input('input[id=input_rename_new_filename]', new_name)
      .click('#g_rf_btn_ok')
      .waitForElementNotVisible('#dlg_rename_file', 10000)
      //check if renamed file exist in tree
      .waitForElementPresent('.jstree-node[id$="' + new_name + '"]', 2000)
    browser
      .waitForElementPresent('.jstree-node[id$="' + new_name + '"]', 2000)
      .click('.jstree-node[id$="' + new_name + '"]')
      .pause(1000)
      .click("#main-menu-file > a")
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click(".dropdown-menu a[action=rename_file]")
      .pause(1000)
      .waitForElementVisible('#dlg_rename_file', 10000)
      .replace_input('input[id=input_rename_new_filename]', prev_name)
      .click('#g_rf_btn_ok')
      .waitForElementNotVisible('#dlg_rename_file', 10000)
      //check if renamed file exist in tree
      .waitForElementPresent('.jstree-node[id$="' + prev_name + '"]', 2000)
 		})
      browser.logout(browser);
  }
/*  'file_rename_with_shortcut' :  function (browser) {
    var file_name = "new_file"
    var new_name = "new_file2"
    browser
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
      .click('.jstree-node[id$="' + file_name + '"]')
      .pause(1000)
      .keys(browser.Keys.CONTROL)
      .keys(browser.Keys.SHIFT)
      .keys('r')
      .keys(browser.Keys.NULL)
      .waitForElementVisible('#dlg_rename_file', 10000)
      .replace_input('#input_rename_new_filename', new_name)
      .click('#g_rf_btn_ok')
      .waitForElementNotVisible('#dlg_rename_file', 10000)
      //check if renamed file exist in tree
      .waitForElementPresent('.jstree-node[id$="' + new_name + '"]', 2000)
  },*/
/*  'file_rename_with_right_click' :  function (browser) {
    var file_name = "new_file2"
    var new_name = "test_file"
    browser
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
      .click('.jstree-node[id$="' + file_name + '"]')
      .mouseButtonClick('right')
      .waitForElementPresent('ul.dropdown-menu', 2000)
      .click('.dropdown-menu a[action=rename_context]')
      .waitForElementVisible('#dlg_rename_file', 10000)
      .replace_input('#input_rename_new_filename', new_name)
      .click('#g_rf_btn_ok')
      .waitForElementNotVisible('#dlg_rename_file', 10000)
      //check if renamed file exist in tree
      .waitForElementPresent('.jstree-node[id$="' + new_name + '"]', 2000)
      .logout(browser);
  },*/
}