module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
      browser.run_ide(data.username, data.password);
  },
  'project_open' : function (browser) {
  	browser
			.click('button#project_selectbox')
			.waitForElementPresent('#project_selector > div.open', 3000)
			.getAttribute('#my_projects_header + li', 'project_path', function (result) {
				var project_path = result.value;
				var project_name = project_path.split("_").pop();

				this.click('#my_projects_header + li')
					.waitForElementNotVisible('#dlg_loading_bar', 10000)
					.verify.containsText('#selected_project_name', project_name)
			})
			.logout(browser);
  }
}
