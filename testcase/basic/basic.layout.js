module.exports = {
    'goorm_login': function(browser) {
        var data = browser.globals;
		browser.run_ide(data.username, data.password);
    },
    'toggle_top': function(browser) {
        browser
            .pause(2000)
            .verify.visible('#goorm-mainmenu')
            .verify.visible('#goorm_main_toolbar')
            .click('div.ui-layout-toggler-north')
            .pause(2000)
            .verify.hidden('#goorm_main_toolbar')
            .click('div.ui-layout-toggler-north')
            .pause(2000)
            .verify.hidden('#goorm_top')
            .click('div.ui-layout-toggler-north')
            .pause(2000)
            .verify.visible('#goorm-mainmenu')
            .verify.visible('#goorm_main_toolbar')
    },
    'show_more_toolbar': function(browser) {
        browser
            .isVisible('#main_debug_toolbar', function(result) {
                if (result.value == true) {
                    this
                        .resizeWindow(900, 700)
                        .pause(3000)
                        .verify.visible('#toolbar_more_button')
                        .maximizeWindow()
                        .pause(3000)
                        .verify.hidden('#toolbar_more_button');
                }
            });
    },
    'goorm_end': function(browser) {
        browser.end();
    }
}
