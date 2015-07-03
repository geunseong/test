var saved_filename = '';
var saved_foldername = '';
module.exports = {
	'goorm_login': function(browser) {
		var data = browser.globals;
		browser.run_ide(data.username, data.password)
	},
	'open_project_dialog': function(browser) {
		browser
			.pause(1000)
			.click('#main-menu-file > a')
			.waitForElementPresent('#main-menu-file.open', 1000)
			.click('#main-menu-file a[action=open_project]')
			.waitForElementVisible('#dlg_open_project', 2000)
			.click('#project_open_list .selector_project:last-of-type')
			.click('#g_op_btn_ok')
			.pause(1000)
			.check_confirm_plugin('yes')
			.waitForElementNotVisible('#dlg_open_project', 2000)
			// .waitForElementVisible('#dlg_loading_bar', 2000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.verify.visible('#project_treeview')
	},
	'open_project_table': function(browser) {
		browser
			.click('#project_selectbox')
			.waitForElementPresent('#project_selector > div.btn-group.open', 1000)
			.click('#back_to_project_table > a')
			.waitForElementNotVisible('#project_treeview', 3000)
			.waitForElementVisible('#project_list_jquery_table', 3000)
			.click('#project_list_jquery_table tr:first-of-type td:first-of-type')
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.waitForElementVisible('#project_treeview', 10000)
			.verify.visible('#project_treeview')
	},
	'make_folder_from_tree': function(browser) {
		browser
			.moveToElement('#project_treeview > ul > li.jstree-node > a.jstree-anchor:first-of-type', 30, 10)
			.mouseButtonClick('right')
			.waitForElementVisible('#project\\.explorer\\.folder_context', 1000)
			.moveToElement('#project\\.explorer\\.folder_context a[action="new_context"]', 70, 10)
			.click('#submenu_new a[action="new_file_folder_context"]')
			.waitForElementVisible('#dlg_new_folder', 2000);
		var t = new Date().getTime();
		saved_foldername = 'test' + t;
		browser
			.setValue('#folder_new_target_name', 'test' + t)
			.click('#g_nfo_btn_ok')
			.waitForElementNotVisible('#dlg_new_folder', 5000)
			.pause(2000)
			.getAttribute('#project_treeview > ul > li.jstree-node:first-of-type', 'path', function(result) {
				this.assert.equal(typeof result, 'object');
				this.assert.elementPresent('#project_treeview > ul > li > ul.jstree-children > li[path="' + result.value + '/test' + t + '"]')
			});
	},
	'make_file_from_tree_empty_space': function(browser) {
		browser
			.getElementSize('#project_explorer', function(result) {
				this.assert.equal(typeof result, 'object');
				this.assert.equal(result.status, 0);
				var explorer_h = result.value.height;
				this.getElementSize('#project_treeview', function(_result) {
					this.assert.equal(typeof _result, 'object');
					this.assert.equal(_result.status, 0);
					var treeview_h = _result.value.height;
					if(explorer_h > treeview_h) {
						this
							.moveToElement('#project_explorer', result.value.width/2, treeview_h + (explorer_h - treeview_h)/2)
							.mouseButtonClick('right')
							.waitForElementVisible('#project\\.explorer_context', 3000)
							.click('#project\\.explorer_context a[action="new_file_file"]')
							.waitForElementVisible('#dlg_new_file', 3000);
						var t = new Date().getTime();
						saved_filename = t + '.nightwatch';
						this.setValue('#file_new_target_name', t + '.nightwatch')
							.click('#g_nf_btn_ok')
							.waitForElementNotVisible('#dlg_new_file', 3000)
							.pause(1000)
							.getAttribute('#project_treeview > ul > li.jstree-node:first-of-type', 'path', function(result) {
								this.assert.equal(typeof result, 'object');
								this.assert.elementPresent('#project_treeview > ul > li > ul.jstree-children > li[path="' + result.value + '/' + t + '.nightwatch"]');
							});
					}
				});
			});
	},
	'make_existing_file_no': function(browser) {
		browser
			.moveToElement('#project_treeview > ul > li.jstree-node > a.jstree-anchor:first-of-type', 30, 10)
			.mouseButtonClick('right')
			.waitForElementVisible('#project\\.explorer\\.folder_context', 1000)
			.moveToElement('#project\\.explorer\\.folder_context a[action="new_context"]', 70, 10)
			.click('#submenu_new a[action="new_file_file_context"]')
			.waitForElementVisible('#dlg_new_file', 3000)
			.setValue('#file_new_target_name', saved_filename)
			.click('#g_nf_btn_ok')
			.waitForElementVisible('#dlg_confirmation', 3000)
			.assert.visible('#dlg_confirmation')
			.click('#g_cfrm_btn_no');
	},
	'overwrite_file': function(browser) {
		browser
			.waitForElementNotVisible('#dlg_confirmation', 3000)
			.click('#g_nf_btn_ok')
			.waitForElementVisible('#dlg_confirmation', 3000)
			.click('#g_cfrm_btn_yes')
			.waitForElementNotVisible('#dlg_confirmation', 5000)
			.waitForElementNotVisible('#dlg_new_file', 5000)
			.pause(2000)
			.getAttribute('#project_treeview > ul > li.jstree-node:first-of-type', 'path', function(result) {
				this.assert.equal(typeof result, 'object');
				this.assert.elementPresent('#project_treeview > ul > li > ul.jstree-children > li[path="' + result.value + '/' + saved_filename + '"]');
			});
	},
	'make_folder_with_forbidden_name': function(browser) {
		browser
			.moveToElement('#project_treeview > ul > li.jstree-node > a.jstree-anchor:first-of-type', 30, 10)
			.mouseButtonClick('right')
			.waitForElementVisible('#project\\.explorer\\.folder_context', 1000)
			.moveToElement('#project\\.explorer\\.folder_context a[action="new_context"]', 70, 10)
			.click('#submenu_new a[action="new_file_folder_context"]')
			.waitForElementVisible('#dlg_new_folder', 2000)
			.setValue('#folder_new_target_name', '!@#$%^')
			.click('#g_nfo_btn_ok')
			.waitForElementVisible('#dlg_alert', 3000)
			.click('#g_alert_btn_ok')
			.waitForElementNotVisible('#dlg_alert', 3000)
			.clearValue('#folder_new_target_name')
			.setValue('#folder_new_target_name', saved_foldername)
			.click('#g_nfo_btn_ok')
			.waitForElementNotVisible('#dlg_new_folder', 5000)
			.waitForElementVisible('#dlg_alert', 3000)
			.click('#g_alert_btn_ok')
			.waitForElementNotVisible('#dlg_alert', 3000)
			.pause(1000);
	},
	'delete_file_from_tree': function(browser) {
		browser
			.moveToElement('#project_treeview li.jstree-node[id$="' + saved_filename + '"]', 30, 10)
			.mouseButtonClick('right')
			.waitForElementVisible('#project\\.explorer\\.file_context', 2000)
			.click('#project\\.explorer\\.file_context a[action="delete_context"]')
			.waitForElementVisible('#dlg_confirmation', 3000)
			.click('#g_cfrm_btn_yes')
			.waitForElementNotVisible('#dlg_confirmation', 3000)
			.verify.elementNotPresent('#project_treeview li.jstree-node[id$="' + saved_filename + '"]');
	},
	'check_deleted_file_on_terminal': function(browser) {
		browser
            .click('#terminal > div > span')
            .keys(['l', 's', browser.Keys.ENTER])
            .pause(3000)
            .expect.element('#terminal > div:nth-child(2)').text.to.not.contain(saved_filename)
			.expect.element('#terminal > div:nth-child(3)').text.to.not.contain(saved_filename)
	},
	'rename_folder_from_tree': function(browser) {
		browser
			.moveToElement('#project_treeview > ul > li.jstree-node > a.jstree-anchor:first-of-type', 30, 10)
			.mouseButtonClick('right')
			.waitForElementVisible('#project\\.explorer\\.folder_context', 1000)
			.moveToElement('#project\\.explorer\\.folder_context a[action="new_context"]', 70, 10)
			.click('#submenu_new a[action="new_file_folder_context"]')
			.waitForElementVisible('#dlg_new_folder', 2000);
		var t = new Date().getTime();
		browser
			.setValue('#folder_new_target_name', 'test' + t)
			.click('#g_nfo_btn_ok')
			.waitForElementNotVisible('#dlg_new_folder', 5000)
			.pause(2000)
			.moveToElement('#project_treeview li.jstree-node[id$="test' + t + '"]', 30, 10)
			.mouseButtonClick('left')
			.mouseButtonClick('right')
			.waitForElementVisible('#project\\.explorer\\.folder_context', 2000)
			.click('#project\\.explorer\\.folder_context a[action="rename_context"]')
			.waitForElementVisible('#dlg_rename_file', 3000)
			.clearValue('#input_rename_new_filename')
			.setValue('#input_rename_new_filename', '<script>')
			.click('#g_rf_btn_ok')
			.waitForElementVisible('#dlg_alert', 3000)
			.click('#g_alert_btn_ok')
			.waitForElementNotVisible('#dlg_alert', 3000)
			.clearValue('#input_rename_new_filename')
			.setValue('#input_rename_new_filename', saved_foldername)
			.click('#g_rf_btn_ok')
			.waitForElementVisible('#dlg_alert', 3000)
			.click('#g_alert_btn_ok')
			.clearValue('#input_rename_new_filename');
		t = new Date().getTime();
		browser
			.setValue('#input_rename_new_filename', 'test2' + t)
			.pause(500)
			.click('#g_rf_btn_ok')
			.waitForElementNotVisible('#dlg_rename_file', 5000)
			.pause(1000)
			.end();
	}
}
