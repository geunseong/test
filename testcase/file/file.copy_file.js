module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  // I should try this without project open
  'project_open' : function (browser) {
    browser.open_project_menu();
  },
  'file_duplicate_file_from_menu_without_choosing_file' : function (browser){
    browser
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('.dropdown-menu a[action=duplicate_file]')
      .pause(1000)
      .waitForElementVisible('#dlg_alert', 2000)
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 2000)
  },

  'file_duplicate_file_from_menu' : function (browser){
    browser
      .waitForElementPresent('.jstree-leaf:last-child', 2000)
      .click('.jstree-leaf:last-child')
      .pause(1000)
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('.dropdown-menu a[action=duplicate_file]')
      .pause(1000)
      .waitForElementPresent('.jstree-leaf[id*="_copy0"]', 2000)
  },
  'file_remove_file_from_menu' : function (browser) {
    browser
      .getText('.jstree-leaf[id*="_copy0"]', function(result){
        console.log(result.value)
        this
          .delete_file(result.value)
          .pause(2000)
      })
      browser.logout(browser);
  },

 /* 'file_duplicate_file_with_right_click' : function (browser){
    browser
      .waitForElementPresent('.jstree-leaf:last-child', 2000)
      .click('.jstree-leaf:last-child')
      .pause(500)
      .mouseButtonClick('right')
      .pause(1000)
      // not found
      //.waitForElementPresent('#project.explorer.file_context', 3000)
      .click('.dropdown-menu > li > a[action=duplicate_file]')
      .pause(300)
      .waitForElementPresent('.jstree-leaf[id*="_copy0"]', 2000)
      this.file_remove_file_from_menu(browser);
  },*/
  // 트리뷰에서 우클릭한 후에 뜨는 드롭다운 메뉴를 인지 못함
 /* 'file_duplicate_file_from_shortcut' : function (browser){
    browser
      .waitForElementPresent('.jstree-leaf:last-child', 2000)
      .click('.jstree-leaf:last-child')
      .keys(browser.Keys.CONTROL)
      .keys(browser.Keys.SHIFT)
      .keys('a')
      .keys(browser.Keys.NULL)
      .waitForElementPresent('.jstree-leaf[id*="_copy0"]', 5000)
      this.file_remove_file_from_menu(browser)
      browser.logout(browser);
  }*/
  //맥과 윈도우의 단축키 설정이 달라 환경에 따라 코드 변경 필요
}