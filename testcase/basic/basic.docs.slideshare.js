module.exports = {
	'goorm_login' : function (browser) {
		var data = browser.globals;
    	browser.run_ide(data.username, data.password);
	},
	'open_docs_tab' : function (browser) {
		browser
			.waitForElementPresent('li.me img.user_profile_image', 20000)
			.waitForElementNotVisible('#dlg_loading_bar', 10000)
			.pause(1000)
			.click('#gLayoutTab_document_viewer')
			.waitForElementVisible('#document_viewer', 2000)
	},
	'open_slideshare' : function (browser) {
		browser
			.setValue('#document_viewer_list', 'slideshare_share')
			.waitForElementVisible('#slideshare_url_input', 2000)
			.clearValue('#slideshare_url')
			.setValue('#slideshare_url', 'http://www.slideshare.net/imgombab/goorm-ide-open-beta')
			.click('#slideshare_presentation')
			.pause(3000)
			.frame(0)
				.waitForElementPresent('div#player', 5000)
				.frame(null)
			.click('#slideshare_next')
			.pause(2000)
			.clearValue('#slideshare_url')
			.setValue('#slideshare_url', 'http://www.slideshare.net/cperrone/evolve-or-die-a3-thinking-and-popcorn-flow-in-action-lkce14')
			.click('#slideshare_presentation')
			.pause(3000)
			.frame(0)
				.waitForElementPresent('div#player', 5000)
				.frame(null)
			.click('#slideshare_next')
			.pause(2000)
			.clearValue('#slideshare_url')
			.setValue('#slideshare_url', 'http://www.slideshare.net/jldavid/developing-for-wearables-lessons-learned-best-practices')
			.click('#slideshare_presentation')
			.pause(3000)
			.frame(0)
				.waitForElementPresent('div#player', 5000)
				.frame(null)
			.click('#slideshare_next')
			.pause(2000)
			.click('#slideshare_prev')
			.pause(2000)
	},
	'open_slideshare_palette' : function (browser) {
		browser
			.click('#slideshare_draw_bt')
			.waitForElementVisible('#slideshare_drawing_container', 2000)
			.verify.visible('#slideshare_drawing_container')
			.end();
	}
}
