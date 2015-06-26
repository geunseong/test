module.exports = {
	'goorm_login' : function (browser) {
		var data = browser.globals;
		browser.run_ide(data.username, data.password)
	},
	'open_project_dialog' : function (browser) {
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
	'open_project_table' : function (browser) {
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
	'make_file_from_tree' : function (browser) {
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
			.getAttribute('#project_treeview > ul > li.jstree-node:first-of-type', 'path', function(result) {
				this.assert.equal(typeof result, 'object');
				this.assert.elementPresent('#project_treeview > ul > li > ul.jstree-children > li[path="' + result.value + '/test' + t + '"]')
			})
			.end();
	}
}
