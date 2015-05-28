exports.command = function(file_name, content) {
	this
		.click('#main_file_toolbar [action=open_file]')
		.waitForElementVisible('#dlg_open_file', 3000)
		.click('#file_open_files [filename=' + file_name + ']')
		.click('#g_of_btn_ok')
		.waitForElementNotVisible('#dlg_open_file', 3000)
		.waitForElementVisible('div.ui-dialog', 5000)
		.verify.elementPresent('div.ui-dialog')
		.execute(function() {
			var window_list = core.module.layout.workspace.window_manager.window;

			window_list[window_list.length - 1].editor.editor.setValue(content);
		}, [])
		.verify.visible('#g_window_tab_list .goorm_tab_menu:last-child .tab_option')
	return this;
};