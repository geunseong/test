exports.command = function(yes_or_no) {
    this
        .isVisible('#dlg_confirmation', function(result) {
            if (typeof result == 'object') {
                if (result.value == true) {
                    if (yes_or_no == 'yes') {
                        this.click('#g_cfrm_btn_yes')
                            .pause(5000)
                            .waitForElementVisible('#workspace', 120000)
                            .verify.urlEquals('http://ide.goorm.io/')
                            .waitForElementPresent('#terminal > div span[style="color:#8ae234;"]', 30000)
                            .waitForElementNotVisible('#dlg_loading_bar', 10000)
                            .pause(3000);
                    } else {
                        this.click('#g_cfrm_btn_no');
                    }
                }
            }
        });
    return this;
};
