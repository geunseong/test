exports.command = function(plugin, console_msg, html_msg, callback) {
	var self = this;
	var handles = [];
	this.expect.element('#server_tab_' + plugin + ' .inner_content').to.be.present.after(100);
	this.expect.element('#server_tab_' + plugin + ' .inner_content').text.to.contain(console_msg).before(100000);//check log
	this.getAttribute('#server_tab_' + plugin + ' .server_status :nth-child(3)', 'href', function(result) {
		server_url = result.value;
		self
			.click('#server_tab_' + plugin + ' .server_status :nth-child(3)')
			.pause(10000)
			.windowHandles(function(result) {
				handles = result.value;
				self.verify.equal(result.value.length, 2) //check url exists
				self
					.switchWindow(handles[1])
					.verify.containsText('body',html_msg)
					.switchWindow(handles[0]);
				callback(handles);
			});
		})
	return this;
};