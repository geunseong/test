module.exports = {
	'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
    browser.open_project_menu();
      },
  'file_open_file_from_toolbar' : function (browser) {
    browser
      .open_file_toolbar()
      //.verify.title(file_name + " - goorm");
  },
  'file_open_file_from_menu' : function (browser){
    browser
      .open_file_menu()
      .pause(1000)
  },
  /*'file_open_file_from_shortcut' : function (browser) {
    browser
      .keys([browser.Keys.CONTROL,'o'])
      .keys(browser.Keys.NULL)
			.waitForElementVisible('#dlg_open_file', 3000)
			.pause(500)
			.click('#file_open_dir_tree > ul > li > div')
			.pause(500)
			.waitForElementPresent('#file_open_files .file_item', 10000)
			.click('#file_open_files .file_item')
			.pause(500)
			.getValue('#file_open_target_name', function (result) {
				var file_name = result.value;
				this.verify.equal(true, /^[A-Za-z]/.test(result.value))
				this.click('#g_of_btn_ok')
			})
      .click('#dlg_open_file .close') if it didn't be closed yet
      .waitForElementVisible('div.ui-dialog', 5000)
      .getText('span.tab_title', function(result) {
        this.expect.element(file_name).text.to.contain(result.value)
      })
  },*/
  'file_edit_and_save_opend_file' : function (browser) {
  	var file_name = 'new_file'.trim();
  	browser.new_file(file_name);
    browser
			.execute(function() {
				core.module.layout.workspace.window_manager.window[0].editor.editor.setValue('@@@');
			}, [])
      //아마 오류날듯
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click("#main-menu-file a[action=save_file]")
      .pause(2000)
      .delete_file(file_name);
  },
  'file_property_from_menu' :  function (browser) {
    browser
      .waitForElementPresent('.jstree-leaf:last-child', 2000)
      .click('.jstree-leaf:last-child')
      .pause(1000)
      .click("#main-menu-file > a")
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click(".dropdown-menu a[action=property]")
      .waitForElementVisible('#dlg_property', 2000)
      .getText('.jstree-leaf:last-child', function(res){
      	this.expect.element('#filename'.trim()).text.to.contain(res.value.trim())
      })
      .click('#g_fp_btn_close')
      .waitForElementNotVisible('#dlg_property', 2000)
  },
  'folder_property_from_menu' : function (browser) {
  	browser
  	  .waitForElementPresent('.jstree-anchor:last-child', 2000)
      .click('.jstree-anchor:last-child')
      .pause(1000)
      .click("#main-menu-file > a")
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click(".dropdown-menu a[action=property]")
      .waitForElementVisible('#dlg_property', 2000)
      .getText('.jstree-anchor:last-child', function(res){
        console.log(res.value)
      	this.expect.element('#filename'.trim()).text.to.contain(res.value.trim())
      })
      .click('#g_fp_btn_close')
      .waitForElementNotVisible('#dlg_property', 2000)
  },
 // 왜 안되는지 모르겠음
  /* 'file_property_with_right_click' :  function (browser) {

     browser
       .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
       .click('.jstree-node[id$="' + file_name + '"]')
       .mouseButtonClick('right')
       .pause(800)
       .waitForElementPresent('ul.dropdown-menu', 2000)
       .click('.dropdown-menu a[action=property]')
       .waitForElementVisible('#dlg_property', 2000)
       .verify.containsText("#filename", file_name)
       .click('#g_fp_btn_close')
       .waitForElementNotVisible('#dlg_property', 2000)
   },

   'file_root_property' :  function (browser) {
     browser
       .waitForElementPresent('.jstree-anchor', 2000)
       .click('.jstree-anchor')
       .mouseButtonClick('right')
       .waitForElementPresent('ul.dropdown-menu', 2000)
       .click('.dropdown-menu a[action=property]')
       .waitForElementVisible('#dlg_alert', 2000)
       .click('#g_alert_btn_ok')
       .waitForElementNotVisible('#dlg_alert', 2000)
   },
*/
  'file_open_file_from_url_without_project' :  function (browser) {
    var url = "www.google.co.kr"
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
    var url = "www.google.co.kr"
    browser
        .move_to_project()
        .click('#main-menu-file > a')
        .waitForElementPresent('#main-menu-file.open', 2000)
        .click("#main-menu-file a[action=open_url]")
        .waitForElementVisible("#dlg_open_url", 2000)
        .waitForElementVisible("#open_url_address:focus", 2000)
        .setValue('#open_url_address', url)
        .click('#g_ou_btn_ok')
        .waitForElementNotVisible("#dlg_open_url", 10000)
        .waitForElementPresent('span.tab_title[filename=\"'+url+'\"]', 2000)
        .logout(browser);
  },
}