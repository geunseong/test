exports.command = function(content) {
	this
		.execute(function(_content) {
			if(!_content) {
				_content = Math.random().toString();
			}

			var window_list = core.module.layout.workspace.window_manager.window;

			window_list[window_list.length - 1].editor.editor.setValue(_content);
		}, [content])
		.verify.visible('#g_window_tab_list .goorm_tab_menu:last-child .tab_option')

	return this;
};
