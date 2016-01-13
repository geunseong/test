exports.command = function(method) {
	this
		.waitForElementPresent('img.user_profile_image', 10000)
		.waitForElementNotVisible('#dlg_loading_bar', 10000);
	if (method === 'menu') {
		this
			.click('#main-menu-project a[class=dropdown-toggle]')
			.pause(1000)
			.click('#main-menu-project a[action=build_project]')
	} else if (method === 'toolbar') {
		this
			.click('#main_project_toolbar button[action=build_project]')
	} else if (method === 'rebuild') {
		this
			.click('#server_tab_build .rebuild_btn')
	} else {//if (method === 'keyboard')
		this
			.keys([this.Keys.F5])
			.pause(1000)
			.keys(this.Keys.NULL)
	}
	this
		.pause(1000)
		.click('#g_cfrm_btn_yes') //if there is confirmation
		.pause(1000)
	return this;
};