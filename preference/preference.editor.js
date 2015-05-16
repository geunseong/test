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
      .waitForElementNotPresent('button.btn-run-ide[disabled=disabled]', 10000)
      .click('.btn-run-ide')
      .pause(5000)
      .waitForElementVisible('#workspace', 120000)
      .verify.urlEquals('http://ide.goorm.io/');
  },
  'open_project' : function (browser) {
  	browser
  		.waitForElementPresent('li.me img.user_profile_image', 20000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.pause(1000)
			.click('#main-menu-file > a')
			.waitForElementPresent('#main-menu-file.open', 1000)
			.click('#main-menu-file a[action=open_project]')
			.waitForElementVisible('#dlg_open_project', 2000)
			.click('#project_open_list .selector_project:last-of-type')
			.click('#g_op_btn_ok')
			.waitForElementNotVisible('#dlg_open_project', 2000)
			.waitForElementVisible('#dlg_loading_bar', 2000)
			.waitForElementNotVisible('#dlg_loading_bar', 30000)
			.verify.visible('#project_treeview')
  },
  'open_file' : function (browser) {
  	browser
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
  },
  'open_preference' : function (browser) {
  	browser
  		.click('#main_edit_toolbar button[action=preference]')
  		.waitForElementVisible('#dlg_preference', 2000)
  },
  'show_line_number' : function (browser) {
  	browser
  		.getAttribute('input[id="preference.editor.show_line_numbers"]', 'checked', function (res) {
  			if (res.value === 'true') {
  				this.click('input[id="preference.editor.show_line_numbers"] + ins');
  			}
  		})
  		.click('#preference_applyBt_0')
  		.click('#g_prf_btn_ok')
  		.waitForElementNotVisible('#dlg_preference', 1000)
  		.verify.elementNotPresent('.ui-dialog .CodeMirror-linenumbers');
  	this.open_preference(browser);
  	browser
  		.click('input[id="preference.editor.show_line_numbers"] + ins')
  		.click('#preference_applyBt_0')
  		.click('#g_prf_btn_ok')
  		.waitForElementNotVisible('#dlg_preference', 1000)
  		.verify.elementPresent('.ui-dialog .CodeMirror-linenumbers')
  },
  'show_ruler' : function (browser) {
  	this.open_preference(browser);
  	browser
  		.getAttribute('input[id="preference.editor.rulers"]', 'checked', function (res) {
  			console.log('res:', res);
  			if (res.value === null) {
  				this.click('input[id="preference.editor.rulers"] + ins');
  			}
  		})
  		.click('#preference_applyBt_0')
  		.click('#g_prf_btn_ok')
  		.waitForElementNotVisible('#dlg_preference', 1000)
  		.verify.elementPresent('.ui-dialog .CodeMirror-ruler');
  	this.open_preference(browser);
  	browser
  		.click('input[id="preference.editor.rulers"] + ins')
  		.click('#preference_applyBt_0')
  		.click('#g_prf_btn_ok')
  		.waitForElementNotVisible('#dlg_preference', 1000)
  		.verify.elementNotPresent('.ui-dialog .CodeMirror-ruler')
  },
  'highlight_active_line' : function (browser) {
  	this.open_preference(browser);
  	browser
  		.click('input[id="preference.editor.highlight_current_cursor_line"] + ins')
  		.click('#preference_applyBt_0')
  		.click('#g_prf_btn_ok')
  		.waitForElementNotVisible('#dlg_preference', 1000)
  		.verify.elementNotPresent('.ui-dialog .CodeMirror-activeline');
		this.open_preference(browser);
		browser
			.click('input[id="preference.editor.highlight_current_cursor_line"] + ins')
  		.click('#preference_applyBt_0')
  		.click('#g_prf_btn_ok')
  		.waitForElementNotVisible('#dlg_preference', 1000)
  		.verify.elementPresent('.ui-dialog .CodeMirror-activeline')
  		.end();
  }
}