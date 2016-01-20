exports.command = function(browser) {
        browser
            .waitForElementPresent('li.me img.user_profile_image', 2000)
            .waitForElementNotVisible('#dlg_loading_bar', 1000)
            .pause(500)
            //.click('#user-email-container')
            //.waitForElementPresent('#fat-menu.open', 1000)
            //.assert.cssClassPresent('#fat-menu', 'open')
            //
            .click('#main-menu-goorm')
            .waitForElementPresent('#main-menu-goorm.open',1000, false)
            //.assert.cssClassPresent('#dropdown-menu', 'open')
            .click(' a[action="account_logout"]')
            .waitForElementVisible('#dlg_confirmation', 1000, false)
            .assert.visible('#confirmation_content_container')
            .click('#g_cfrm_btn_yes')
            .pause(1000)
            .end();
    return browser;
};