exports.command = function(id, pw, plugin) {
    var self = this;
    this
        .maximizeWindow()
        .url('http://qa.goorm.io')
        .waitForElementVisible('input.login-form', 2000)
        .setValue('input[name=id]', id)
        .setValue('input[name=pw]', pw)
        .click('button[id=btn-login]')
        .waitForElementVisible('div#ide-vm-list', 10000)
        .pause(3000)
        .waitForElementNotPresent('button.btn-run-ide[disabled=disabled]', 10000);

        var callback = function () {
            self
                .pause(5000)
                .waitForElementVisible('#workspace', 120000)
                .verify.urlEquals('http://ide.goorm.io/')
                .pause(1000)
                .click('#g_cfrm_btn_no') //if there is confirmation
                .waitForElementPresent('img.user_profile_image', 100000)
                .waitForElementNotVisible('#dlg_loading_bar', 100000)
                .pause(3000)
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
