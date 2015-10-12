module.exports = {

  'goorm_login_without_id_and_pw' : function (browser) {
    browser
        .maximizeWindow()
        .url('http://qa.goorm.io')
        .waitForElementVisible('input.login-form', 2000)
        .setValue('input[name=id]', '')
        .setValue('input[name=pw]', '')
        .click('button[id=btn-login]')
        .waitForElementPresent('#btn-login.disabled', 2000)
  },
  'goorm_login_with_only_id' : function (browser) {
    var data = browser.globals;
    browser
        .waitForElementVisible('input.login-form', 2000)
        .setValue('input[name=id]', data.username)
        .setValue('input[name=pw]', '')
        .click('button[id=btn-login]')
        // .waitForElementPresent('#btn-login.disabled', 2000)
        .waitForElementVisible('div#warn-pw', 2000)
  },
  'goorm_login_with_wrong_pw' : function (browser) {
    var data = browser.globals;
    browser
        .waitForElementVisible('input.login-form', 2000)
        .replace_input('input[name=id]', data.username)
        .replace_input('input[name=pw]', '123q12321we')
        .click('button[id=btn-login]')
        .waitForElementVisible('div#warn-pw', 2000)
        .setValue('input[name=id]', '')
        .setValue('input[name=pw]', '')
    
  },
  'goorm_login_with_wrong_id' : function (browser) {
    browser
        .waitForElementVisible('input.login-form', 2000)
        .replace_input('input[name=id]', 'goorm@goorm.com')
        .replace_input('input[name=pw]', '123123qwe')
        .click('button[id=btn-login]')
        .waitForElementVisible('div#warn-email', 2000)
    
  },
  'goorm_login_success' : function (browser) {
    var data = browser.globals;
    browser
        .replace_input('input[name=id]', data.username)
        .replace_input('input[name=pw]', data.password)
        .click('button[id=btn-login]')
        .waitForElementVisible('div#ide-vm-list', 2000)
        .verify.urlEquals('http://qa.goorm.io/my')
        .end();
  }
};