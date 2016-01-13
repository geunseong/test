exports.command = function(id, pw, plugin) {
    var self = this;
    this
        .maximizeWindow()
        .url('https://qa.goorm.io')
        .waitForElementVisible('input.login-form', 3000)
        .setValue('input[name=id]', id)
        .setValue('input[name=pw]', pw)
        .click('button[id=btn-login]')
        .waitForElementVisible('div#ide-vm-list', 10000)
        .pause(3000)
        .waitForElementVisible('button.btn-run-ide', 10000)
        .waitForElementNotPresent('button.btn-run-ide[disabled=disabled]', 20000);

        var callback = function () {
            self
                .pause(5000)
                .waitForElementVisible('#workspace', 500000) //임시로 300000으로 바꿈 원래 200000
                .verify.urlEquals('https://ide-qa.goorm.io/')
                .waitForElementPresent('#project_treeview', 30000)
                .waitForElementPresent('#terminal > div span[style="color:#8ae234;"]', 30000)
                .pause(3000)
                .getCssProperty('#dlg_confirmation', 'display', function(result) {
                    if (typeof result == 'object') {
                        if (result.value == 'block') {
                            this.click('#g_cfrm_btn_yes')
                                .pause(5000)
                                .waitForElementVisible('#workspace', 200000)
                                .verify.urlEquals('https://ide.qa.goorm.io/')
                                .waitForElementPresent('#terminal > div span[style="color:#8ae234;"]', 30000)
                                .waitForElementNotVisible('#dlg_loading_bar', 10000)
                                .pause(3000)
                        }
                    }
                });
        }

        if (plugin) {
            this.elements('css selector', '.vm-status-software-stack-value', function(result) {
                var flag = true;
                var sync = function(i) {
                    self.elementIdText(result.value[i].ELEMENT, function (value){
                        if (value.value === plugin && flag) {
                            flag = false;
                            this
                                .click('.docker-list-container .panel:nth-child(' + (i + 1) + ') .btn-run-ide');
                            callback();
                        }
                    });
                }
                for(var i = 0; i<result.value.length; i++) {
                    sync(i);
                }
            })
        } else {
            this
                .click('.btn-run-ide');
                callback();
        }
    return this;
};
