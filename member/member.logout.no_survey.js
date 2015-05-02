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
  'open_file' : function (browser) {
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
					.waitForElementNotVisible('#dlg_loading_bar', 10000)
					.verify.containsText('#selected_project_name', project_name)
			})
			.pause(3000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.click('#main-menu-file > a')
			.waitForElementPresent('#main-menu-file.open', 2000)
			.click('#main-menu-file a[action=open_file]')
			.waitForElementVisible('#dlg_open_file', 1000)
			.waitForElementPresent('#file_open_files .file_item', 10000)
			.click('#file_open_files .file_item')
			.pause(500)
			.getValue('#file_open_target_name', function (result) {
				this.verify.equal(true, /^[A-Za-z]/.test(result.value))
			})
			.click('#g_of_btn_ok')
			.waitForElementNotVisible('#dlg_open_file', 1000)
			.waitForElementPresent('li.g_windows_tab_li', 2000)
			.execute(function() {
				core.module.layout.workspace.window_manager.window[0].editor.editor.setValue('@@@');
			}, [])
			.verify.visible('span.title_option')
  },
  'try_logout' : function (browser) {
  	browser
			.click('#user-email-container')
			.waitForElementPresent('#fat-menu.open', 1000)
			.assert.cssClassPresent('#fat-menu', 'open')
			.click('a[action="account_logout"]')
			.waitForElementVisible('#dlg_confirmation_save', 1000)
			.assert.visible('#g_cfrm_s_btn_yes')
			.click('#g_cfrm_s_btn_no')
  },
  'survey_no' : function (browser) {
  	browser
  		.click('#g_sv_btn_cancel')
  		.waitForElementNotVisible('#dlg_survey', 1000)
  		.pause(3000)
  		.verify.urlEquals(browser.globals.urls.qa)
  		.waitForElementVisible('#login-section', 2000)
  		.verify.hidden('#user-section')
  		.end();
  }
}