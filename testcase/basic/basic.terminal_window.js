module.exports = {
    'goorm_login': function(browser) {
        var data = browser.globals;
		      browser.run_ide(data.username, data.password, data.plugin);
    },
    'open_terminal_window': function(browser) {
        browser
            .pause(1000)
            .click('#project_selectbox')
            .waitForElementPresent('#project_selector .dropdown-menu', 2000)
            .click('.project_item')
            .pause(1000)
            .waitForElementPresent('#project_selectbox', 2000)
            .click('#main-menu-window')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .click('#main-menu-window a[action="new_terminal_window"]')
            .pause(1000)
            .verify.visible('.ui-dialog-content.terminal')
            .keys(['exit', browser.Keys.ENTER])
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'x'])
            .keys(browser.Keys.NULL)
            .pause(500)
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 't'])
            .keys(browser.Keys.NULL)
            .pause(500)
            .element('class name','ui-dialog-maximize', function(result) {
              if (result.value && result.value.ELEMENT) {
                this
                  .click('.fa-square-o')
                  .verify.visible('.ui-dialog-content.terminal')
              }
              else {
                this.verify.visible('.ui-dialog-title')
                this.verify.visible('.tab_title')
              }
            })
            .getText('#selected_project_name', function(result) {
                this.expect.element('span.ui-dialog-title').text.to.contain(result.value)
                this.expect.element('span.tab_title').text.to.contain(result.value)
            })
    },
    'check_terminal_folder': function(browser) {
        browser
            .click('div.ui-dialog-content.terminal > div > span:first-of-type')
            .pause(500)
            .keys(['cd bin', browser.Keys.ENTER])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .expect.element('span.ui-dialog-title').text.to.contain('bin');
        browser
            .expect.element('span.tab_title').text.to.contain('bin')
        browser
            .click('div.ui-dialog-content.terminal > div > span:first-of-type')
            .pause(500)
            .keys(['cd ../', browser.Keys.ENTER])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .expect.element('span.ui-dialog-title').text.to.contain('Test');
        browser
            .expect.element('span.tab_title').text.to.contain('Test')
    },
    'exit_terminal_window': function(browser) {
        browser
            .keys(['exit', browser.Keys.ENTER])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .verify.elementNotPresent('.ui-dialog-content.terminal')
            .end();
    }
};
