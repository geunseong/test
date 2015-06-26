exports.command = function(project_name) {
	this
		.waitForElementPresent('img.user_profile_image', 10000)
		.waitForElementNotVisible('#dlg_loading_bar', 10000)
		.click('#main-menu-project a[class=dropdown-toggle]')
		.pause(1000)
		.click('#main-menu-project a[action=delete_project]')
		.pause(1000)
		.click('#selector_' + project_name)
		.click('#g_dp_btn_ok')
		.waitForElementVisible('#dlg_confirmation', 50000)
		.click('#g_cfrm_btn_yes')
		.waitForElementVisible('#dlg_notice', 10000)
		.click('#g_nt_btn_ok')
	return this;
};
