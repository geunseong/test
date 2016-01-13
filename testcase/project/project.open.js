module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
      browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
  	browser
  		.waitForElementPresent('li.me img.user_profile_image', 20000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.click('button#project_selectbox')
			.waitForElementPresent('#project_selector > div.open', 3000)
			.click('li.project_item')
			.waitForElementVisible('#dlg_loading_bar', 2000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.verify.containsText('#selected_project_name', 'cpp1')
			.end();
  }
}
