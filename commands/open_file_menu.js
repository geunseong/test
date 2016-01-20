exports.command = function() {
	this
		.click('#main-menu-file > a')
		.waitForElementPresent('#main-menu-file.open', 2000)
		.click('#main-menu-file a[action=open_file]')
		.waitForElementVisible('#dlg_open_file', 3000)
		.pause(500)
		.click('#file_open_dir_tree > ul > li > div')
		.pause(500)
		.waitForElementPresent('#file_open_files .file_item', 10000)
		.click('#file_open_files .file_item')
		.pause(500)
		.getValue('#file_open_target_name', function (result) {
				this.verify.equal(true, /^[A-Za-z]/.test(result.value))
				this.click('#g_of_btn_ok')
		})

	this
		.click('#dlg_open_file .close') //if it didn't be closed yet
		.waitForElementVisible('div.ui-dialog', 5000, false)
	return this;
};