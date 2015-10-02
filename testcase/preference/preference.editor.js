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
			.waitForElementVisible('#dlg_preference', 2000)},
	'font_change' : function (browser) {
		browser
			.click('select[id="preference.editor.font_family"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="Courier New"]')
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-lines').to.have.css('font-family').to.have.contains('Courier New');
		browser
			.click('select[id="preference.editor.font_family"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="Lucida Console"]')
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-lines').to.have.css('font-family').which.contains('Lucida Console');
		browser
			.click('select[id="preference.editor.font_family"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="Nanum Gothic Coding"]')
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-lines').to.have.css('font-family').which.contains('Nanum Gothic Coding');
		browser
			.click('select[id="preference.editor.font_family"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="Source Code Pro"]')
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-lines').to.have.css('font-family').which.contains('Source Code Pro');
	
	},
	'font_size_change' : function (browser) {
		this.open_preference(browser);
		browser
			.click('select[id="preference.editor.font_size"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="15"]')
			.click('#preference_applyBt_0')
			//.assert.cssProperty(".ui-dialog .CodeMirror-wrap cm-s-default","font-size","15px")
			.getcssProperty('class="ui-dialog .CodeMirror-wrap cm-s-default"', 'font-size', function (res) {
				this.assert.equal(res,'15px');
			})

			.click('select[id="preference.editor.font_size"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="20"]')
			.click('#preference_applyBt_0')
			//.assert.cssProperty(".ui-dialog .CodeMirror-wrap cm-s-default","font-size","20px")
		//	.expect.element('.ui-dialog .CodeMirror-wrap cm-s-default').to.have.css('font-size').which.matchs(/20px/)

			.click('select[id="preference.editor.font_size"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="12"]')
			.click('#preference_applyBt_0')
			//.assert.cssProperty(".ui-dialog .CodeMirror-wrap cm-s-default","font-size","12px")
	//		.expect.element('.ui-dialog .CodeMirror-wrap cm-s-default').to.have.css('font-size').which.matchs(/12px/)
	},
/*	'line_spacing' : function (browser) {
		this.open_preference(browser);
		browser
			.click('select[id="preference.editor.line_spacing"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="2"]')
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-wrap cm-s-default').to.have.css('line-height').which.contains('1.2')

			.click('select[id="preference.editor.line_spacing"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="5"]')
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-wrap cm-s-default').to.have.css('line-height').which.contains('1.5')

			.click('select[id="preference.editor.line_spacing"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="1"]')
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-wrap cm-s-default').to.have.css('line-height').which.contains('1.1')

			.click('select[id="preference.editor.line_spacing"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="3"]')
			.click('#preference_applyBt_0')
			.expect.element('.ui-dialog .CodeMirror-wrap cm-s-default').to.have.css('line-height').which.contains('1.3')
	},

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
	},*/
	'theme_change' : function (browser) {
		this.open_preference(browser);
		browser
			.click('#editor_theme')

			.click('select[id="preference.editor.theme"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="blackboard"]')
			.click('#preference_applyBt_1')
			//.attributeEquals(".ui-dialog .CodeMirror-wrap cm-s-blackboard","true");
		browser
			.click('select[id="preference.editor.theme"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="ambiance"]')
			.click('#preference_applyBt_1')
			//.attributeEquals(".ui-dialog .CodeMirror-wrap cm-s-ambiance","true");
		browser
			.click('select[id="preference.editor.theme"]')
			.keys(['\uE005','\uE006'])
			.click('option[value="default"]')
			.click('#preference_applyBt_1')
			//.attributeEquals(".ui-dialog .CodeMirror-wrap cm-s-default","true")
			.end();
	}
}
