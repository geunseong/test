exports.command = function(handles, html_msg) {
	var self = this;
	this
		.switchWindow(handles[1])
		.refresh()
		.pause(3000)
		.getText('html', function (result) {
			self.verify.equal(result.value.indexOf(html_msg), -1)
			self
				.closeWindow()
				.switchWindow(handles[0])
		});
	return this;
};