module.exports = {
    'goorm_login': function(browser) {
        var data = browser.globals;
		browser.run_ide(data.username, data.password);
    },
    'open_terminal_window': function(browser) {
        browser
            .pause(1000)
            .click('#main-menu-window')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .click('#main-menu-window a[action="new_terminal_window"]')
            .pause(1000)
            .verify.visible('.ui-dialog-content.terminal')
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'x'])
            .keys(browser.Keys.NULL)
            .pause(500)
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 't'])
            .keys(browser.Keys.NULL)
            .pause(500)
            .verify.visible('.ui-dialog-content.terminal')
            .getText('#selected_project_name', function(result) {
                this.expect.element('span.ui-dialog-title').text.to.contain(result.value)
            });
    },
    'exit_terminal_window': function(browser) {
        browser
            .click('div.ui-dialog-content.terminal > div > span:first-of-type')
            .keys(['exit', browser.Keys.ENTER])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .verify.elementNotPresent('.ui-dialog-content.terminal')
            .end();
    }
};
