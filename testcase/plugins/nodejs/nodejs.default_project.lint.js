var project_name = 'nodejs_test12';
var plugin = 'nodejs';
var detail_type = 'default';
var file_name = 'main.js';

module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
    browser
      .run_ide(data.username, data.password, plugin);
  },
  'create_default_project' : function (browser) {
    browser
      .new_project(plugin, detail_type, project_name)
      .pause(2000)
  },
  'make_error_and_warning_file' : function (browser) {
    browser
      .execute(function() {
        var context = 
          'function test(){\n' +
          '  consolee.log(1);\n' +
          '};\n' +
          'fu!nction test(){\n' +
          '  consolee.log(1);\n' +
          '};\n' +
          'a.id = null;';
        var active = core.module.layout.workspace.window_manager.active_window;
          core.module.layout.workspace.window_manager.window[active].editor.editor.setValue(context);
      })
      .pause(3000)
      .click('button[action=save_file]')
      .pause(2000);
  },
  'run_with_menu' : function (browser) {
    browser
      .run_project('menu')
      .pause(3000)
  },
  'check_output_exist' : function (browser) {
    browser
      .click('#gLayoutOutput_' + plugin)
      .waitForElementVisible('#output_tab_' + plugin + ' tbody tr', 20000, false)
      .verify.containsText('#output_tab_' + plugin + ' tbody', 'Error')
      .verify.elementPresent('.fa-times-circle'); //error
  },
  'division_error_and_warning' : function (browser) {
    browser
      .verify.containsText('#output_tab_nodejs tbody', 'Warning')
      .verify.elementPresent('.fa-exclamation-triangle') //warning
  },
  'check_error_box_and_output' : function (browser) {
    browser
      .verify.containsText('#output_tab_' + plugin + ' tbody', 'Expected')
      .moveToElement('.fa-times-circle', 3, 3)
      .verify.containsText('.error_message_box', 'Expected');
  },
  'check_line' : function (browser) {
    browser
      .pause(1000)
      .click('#output_tab_' + plugin + ' tbody tr:nth-child(2) td:nth-child(3)')
      .pause(3000)
      .getText('#output_tab_' + plugin + ' tbody tr:nth-child(2) td:nth-child(3)', function(result) {
        var line = result.value;
        browser.getText('.CodeMirror-activeline .CodeMirror-linenumber', function(result) {
          browser.verify.equal(line, result.value);
        })
      });
  },
  'check_line2' : function (browser) {
    browser
      .click('.close.tab_close_button')
      .waitForElementNotPresent('[filename="' + file_name + '"]', 10000, false)
      .click('#output_tab_' + plugin + ' tbody tr:nth-child(2) td:nth-child(3)')
      .waitForElementPresent('[filename="' + file_name + '"]', 10000, false)
      .verify.elementPresent('[filename="' + file_name + '"]')
      .pause(2000)
      .getText('#output_tab_' + plugin + ' tbody tr:nth-child(2) td:nth-child(3)', function(result) {
        var line = result.value;
        browser.getText('.CodeMirror-activeline .CodeMirror-linenumber', function(result) {
          browser.verify.equal(line, result.value);
        })
      });
  },
  'delete_project' : function (browser) {
    browser
      .delete_project(project_name)
      .end();
  }
};