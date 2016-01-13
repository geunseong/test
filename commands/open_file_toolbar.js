exports.command = function() {
	this
		.click('#main_file_toolbar [action=open_file]')
		.waitForElementVisible('#dlg_open_file', 3000)
		.pause(2000)
		.click('#file_open_dir_tree > ul > li > div')
		.pause(1000)
	/*for(var i = 0; i<file_name.length; i++) {
		this
			.waitForElementVisible('#file_open_files [filename="' + file_name[i] + '"]', 8000, false, function(e){console.log(e)})
			.click('#file_open_files [filename="' + file_name[i] + '"]')
			.pause(1000)
			.keys([this.Keys.ENTER])
			.pause(300)
			.keys(this.Keys.NULL)
	}*/
		.waitForElementPresent('#file_open_files .file_item', 10000)
		.click('#file_open_files .file_item')
		.pause(500)
		.getValue('#file_open_target_name', function (result) {
				this.verify.equal(true, /^[A-Za-z]/.test(result.value))
				this.click('#g_of_btn_ok')
		})

	/*this
		.click('#dlg_open_file .close') //if it didn't be closed yet*/
		.waitForElementNotPresent('dlg_open_file', 10000)
		.waitForElementPresent('#terminal > div span[style="color:#8ae234;"]', 30000)
	return this;
};