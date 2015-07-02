exports.command = function(file_name, content) {
	this
		.execute(function(_filename, _content) {
			var window_list = core.module.layout.workspace.window_manager.window;

			window_list[window_list.length - 1].editor.editor.setValue(_content);
		}, [file_name, content])
		.verify.visible('#g_window_tab_list .goorm_tab_menu:last-child .tab_option')

	return this;
};
