module.exports = {
    'goorm_login': function(browser) {
        var data = browser.globals;
		browser.run_ide(data.username, data.password);
    },
    'toggle_top': function(browser) {
        browser
            .verify.visible('#goorm-mainmenu')
            .verify.visible('#goorm_main_toolbar')
            .click('div.ui-layout-toggler-north')
            .pause(1000)
            .verify.hidden('#goorm_main_toolbar')
            .click('div.ui-layout-toggler-north')
            .pause(1000)
            .verify.hidden('#goorm_top')
            .click('div.ui-layout-toggler-north')
            .pause(1000)
            .verify.visible('#goorm-mainmenu')
            .verify.visible('#goorm_main_toolbar')
    },
    'goorm_end': function(browser) {
        browser.end();
    }
}
