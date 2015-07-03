module.exports = {
    'goorm_login': function(browser) {
        var data = browser.globals;
		browser.run_ide(data.username, data.password);
    },
    // 'toggle_top': function(browser) {
    //     browser
    //         .pause(2000)
    //         .verify.visible('#goorm-mainmenu')
    //         .verify.visible('#goorm_main_toolbar')
    //         .click('div.ui-layout-toggler-north')
    //         .pause(2000)
    //         .verify.hidden('#goorm_main_toolbar')
    //         .click('div.ui-layout-toggler-north')
    //         .pause(2000)
    //         .verify.hidden('#goorm_top')
    //         .click('div.ui-layout-toggler-north')
    //         .pause(2000)
    //         .verify.visible('#goorm-mainmenu')
    //         .verify.visible('#goorm_main_toolbar')
    // },
    // 'show_more_toolbar': function(browser) {
    //     browser
    //         .isVisible('#main_debug_toolbar', function(result) {
    //             if (result.value == true) {
    //                 this
    //                     .resizeWindow(900, 700)
    //                     .pause(3000)
    //                     .verify.visible('#toolbar_more_button')
    //                     .maximizeWindow()
    //                     .pause(3000)
    //                     .verify.hidden('#toolbar_more_button');
    //             }
    //         });
    // },
    'window_perspectives_left': function(browser) {
        browser
            .pause(1000)
            .verify.visible('#goorm_left')
            .click('#main-menu-window')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="left_layout_toggle"]')
            .pause(2000)
            .verify.hidden('#goorm_left')
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'l'])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .verify.visible('#goorm_left');
    },
    'window_perspectives_right': function(browser) {
        browser
            .verify.visible('#goorm_inner_layout_right')
            .click('#main-menu-window')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_layout_toggle"]')
            .pause(2000)
            .verify.hidden('#goorm_inner_layout_right')
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'r'])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .verify.visible('#goorm_inner_layout_right');
    },
    'window_perspectives_bottom': function(browser) {
        browser
            .verify.visible('#goorm_inner_layout_bottom')
            .click('#main-menu-window')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="bottom_layout_toggle"]')
            .pause(2000)
            .verify.hidden('#goorm_inner_layout_bottom')
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'b'])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .verify.visible('#goorm_inner_layout_bottom');
    },
    'show_collaboration': function(browser) {
        browser
            .click('#main-menu-window')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_chat_show"]')
            .pause(1000)
            .verify.hidden('#gLayoutTab_chat')
            .keys([browser.Keys.ALT, '1'])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .verify.visible('#gLayoutTab_chat');
    },
    'show_docs': function(browser) {
        browser
            .click('#main-menu-window')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_slideshare_show"]')
            .pause(1000)
            .verify.hidden('#gLayoutTab_document_viewer')
            .keys([browser.Keys.ALT, '2'])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .verify.visible('#gLayoutTab_document_viewer');
    },
    'show_history': function(browser) {
        browser
            .click('#main-menu-window')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_history_show"]')
            .pause(1000)
            .verify.hidden('#gLayoutTab_History')
            .keys([browser.Keys.ALT, '3'])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .verify.visible('#gLayoutTab_History');
    },
    'show_outline': function(browser) {
        browser
            .click('#main-menu-window')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .isVisible('#child_perspectives_menu a[action="right_outline_show"]', function(result) {
                console.log('result:', result);
                if(result.value === true) {
                    this.click('#child_perspectives_menu a[action="right_outline_show"]')
                        .pause(1000)
                        .verify.hidden('#gLayoutTab_Outline')
                        .keys([browser.Keys.ALT, '4'])
                        .keys(browser.Keys.NULL)
                        .pause(1000)
                        .verify.visible('#gLayoutTab_Outline');
                } else {
                    this.click('#main-menu-window')
                        .pause(1000);
                }
            })
    },
    'show_bookmark': function(browser) {
        browser
            .click('#main-menu-window')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_bookmark_show"]')
            .pause(1000)
            .verify.hidden('#gLayoutTab_Bookmark')
            .keys([browser.Keys.ALT, '5'])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .verify.visible('#gLayoutTab_Bookmark');
    },
    'goorm_end': function(browser) {
        browser.end();
    }
}
