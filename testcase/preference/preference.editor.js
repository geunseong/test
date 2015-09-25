module.exports = {
	'goorm_login' : function (browser) {
		var data = browser.globals;
    	browser.run_ide(data.username, data.password);
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
			.waitForElementNotVisible('#dlg_loading_bar', 30000)
			.verify.visible('#project_treeview')
	},
/*	'open_file' : function (browser) {
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
	},*/
	'open_preference' : function (browser) {
		browser
			.click('#main_edit_toolbar button[action=preference]')
			.waitForElementVisible('#dlg_preference', 2000)
	},
	/*'font_change' : function (browser) {
		this.open_preference(browser);
			$("preference.editor.font_family").val('Courier New')
			browser.click('#preference_applyBt_0')
			browser.expect.element('.ui-dialog .CodeMirror-lines').to.have.css('font-family').which.equals('Courier New')
			$("preference.editor.font_family").val('Lucida Console')
			browser.click('#preference_applyBt_0')
			browser.expect.element('.ui-dialog .CodeMirror-lines').to.have.css('font-family').which.equals('Lucida Console')
			$("preference.editor.font_family").val('Nanum Gothic Coding')
			browser.click('#preference_applyBt_0')
			browser.expect.element('.ui-dialog .CodeMirror-lines').to.have.css('font-family').which.equals('Nanum Gothic Coding')
			$("preference.editor.font_family").val('Source Code Pro')
			browser.click('#preference_applyBt_0')
			browser.expect.element('.ui-dialog .CodeMirror-lines').to.have.css('font-family').which.equals('Source Code Pro')
	},

	'font_size_change' : function (browser) {
		this.open_preference(browser);
		browser
			.element('#preference.editor.font_size').val(value="15")
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-wrap cm-s-default').to.have.css('font-size').which.equals('15px')
			.element('#preference.editor.font_size').click(option[value="20"])
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-wrap cm-s-default').to.have.css('font-size').which.equals('20px')
			.element('#preference.editor.font_size').click(option[value="12"])
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-wrap cm-s-default').to.have.css('font-size').which.equals('12px')
	},
	'line_spacing' : function (browser) {
		this.open_preference(browser);
		browser
			.elementIdSelected('#preference.editor.line_spacing', '2')
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-wrap cm-s-default').to.have.css('line-height').which.equals('1.2')
			.click('#preference_applyBt_0')
			.elementIdSelected('#preference.editor.line_spacing', '5')
			.expect.element('.ui-dialog .CodeMirror-wrap cm-s-default').to.have.css('line-height').which.equals('1.5')
			.click('#preference_applyBt_0')
			.elementIdSelected('#preference.editor.line_spacing', '3')
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-wrap cm-s-default').to.have.css('line-height').which.equals('1.3')
	},*/

	'indent_unit' : function (browser) {
		this.open_preference(browser);
		browser
			.setValue('input[id="preference.editor.indent_unit"]', [Math.floor((Math.random() * 5) + 1).toString()])
			.click('#preference_applyBt_0')

	},
	'indent_with_tab' : function (browser) {
		this.open_preference(browser);
		browser
			.click('input[id="preference.editor.indent_with_tabs"] + ins')
			.click('#preference_applyBt_0')
			.click('#g_prf_btn_ok')
			.waitForElementNotVisible('#dlg_preference', 1000)
//			.verify.elementNotPresent('')
		this.open_preference(browser);
		browser
			.click('input[id="preference.editor.indent_with_tabs"] + ins')
			.click('#preference_applyBt_0')
			.click('#g_prf_btn_ok')
			.waitForElementNotVisible('#dlg_preference', 1000)
//			.verify.elementPresent('')

	},
	'auto_close_brackets' : function (browser) {
		this.open_preference(browser);
		browser
			.click('input[id="preference.editor.auto_close_brackets"] + ins')
			.click('#preference_applyBt_0')
			.click('#g_prf_btn_ok')
			.waitForElementNotVisible('#dlg_preference', 1000)
//			.verify.elementNotPresent('');
		this.open_preference(browser);
		browser
			.click('input[id="preference.editor.auto_close_brackets"] + ins')
			.click('#preference_applyBt_0')
			.click('#g_prf_btn_ok')
			.waitForElementNotVisible('#dlg_preference', 1000)
//			.verify.elementPresent('')
	},
	'line_wrapping' : function (browser) {
		this.open_preference(browser);
		browser
			.click('input[id="preference.editor.line_wrapping"] + ins')
			.click('#preference_applyBt_0')
			.click('#g_prf_btn_ok')
			.waitForElementNotVisible('#dlg_preference', 1000)
//			.verify.elementNotPresent('.cm-s-default CodeMirror-wrap');
		this.open_preference(browser);
		browser
			.click('input[id="preference.editor.line_wrapping"] + ins')
			.click('#preference_applyBt_0')
			.click('#g_prf_btn_ok')
			.waitForElementNotVisible('#dlg_preference', 1000)
//			.verify.elementPresent('.cm-s-default CodeMirror-wrap')
	},
	'wheel_zoom' : function (browser) {
		this.open_preference(browser);
		browser
			.click('input[id="preference.editor.wheel_zoom"] + ins')
			.click('#preference_applyBt_0')
			.click('#g_prf_btn_ok')
			.waitForElementNotVisible('#dlg_preference', 1000)
//			.verify.elementNotPresent('');
		this.open_preference(browser);
		browser
			.click('input[id="preference.editor.wheel_zoom"] + ins')
			.click('#preference_applyBt_0')
			.click('#g_prf_btn_ok')
			.waitForElementNotVisible('#dlg_preference', 1000)
//			.verify.elementPresent('')
	},

	'show_line_number' : function (browser) {
		this.open_preference(browser);
		browser
			.click('input[id="preference.editor.show_line_numbers"] + ins')
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
	},
/*	'theme_change' : function (browser) {
		browser
			.elementIdSelected('#preference.editor.theme', 'blackboard')
			.click('#preference_applyBt_1')
			.verify.elementPresent('.ui-dialog .CodeMirror-wrap cm-s-blackboard')
			.elementIdSelected('#preference.editor.theme', 'default')
			.click('#preference_applyBt_1')
			.verify.elementPresent('.ui-dialog .CodeMirror-wrap cm-s-default')
			.end();
	}*/
}
