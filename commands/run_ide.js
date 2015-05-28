exports.command = function(id, pw) {
    this
        .maximizeWindow()
        .url('http://qa.goorm.io')
        .waitForElementVisible('input.login-form', 2000)
        .setValue('input[name=id]', id)
        .setValue('input[name=pw]', pw)
        .click('button[id=btn-login]')
        .waitForElementVisible('div#ide-vm-list', 10000)
        .pause(3000)
        .waitForElementNotPresent('button.btn-run-ide[disabled=disabled]', 10000)
        .click('.btn-run-ide')
        .pause(5000)
        .waitForElementVisible('#workspace', 120000)
        .verify.urlEquals('http://ide.goorm.io/');
    return this;
};
