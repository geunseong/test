module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
    // browser
    //   .url('http://qa.goorm.io')
    //   .waitForElementVisible('input.login-form', 2000)
    //   .setValue('input[name=id]', data.username)
    //   .setValue('input[name=pw]', data.password)
    //   .click('button[id=btn-login]')
    //   .waitForElementVisible('div#ide-vm-list', 2000)
    //   .pause(3000)
    //   .waitForElementNotPresent('button.btn-run-ide[disabled=disabled]', 10000)
    //   .click('.btn-run-ide')
    //   .pause(5000)
    //   .waitForElementVisible('#workspace', 120000)
    //   .verify.urlEquals('http://ide.goorm.io/')
    //   .end();
  }
};