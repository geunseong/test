module.exports = {
    'goorm_login': function(browser) {
        var data = browser.globals;
		browser.run_ide(data.username, data.password);
    },
    'open_terminal_window': function(browser) {
        browser
            .click('#main-menu-window')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .click('#main-menu-window a[action="new_terminal_window"]')
            .pause(1000)
            .verify.visible('.ui-dialog-content.terminal')
            .keys([browser.Keys.ALT, 'x'])
            .keys(browser.Keys.NULL)
            .pause(500)
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 't'])
            .keys(browser.Keys.NULL)
            .pause(500)
            .verify.visible('.ui-dialog-content.terminal')
            .end();
    }
};
