var fs = require('fs');
var path = require('path');

module.exports = {
  'goorm_login' : function (browser) {
    var data = browser.globals;
    browser.run_ide(data.username, data.password);
  },
  'project_close' : function (browser) {
    var project = 'Test2';
    browser
      .open_project_menu(project);
  },
  'file_import_file_without_project' : function (browser) {
    browser
      .click('button#project_selectbox')
      .waitForElementPresent('#project_selector > div.open', 3000)
      .click('li#back_to_project_table > a')
      .pause(1000)
      .waitForElementVisible('#dlg_alert', 2000)
      .click('button#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 3000)
  },
  'project_open' : function (browser) {
    var project = 'Test2';
    browser
      .open_project_menu(project);
  },
  'file_import_file' : function (browser) {
    var file_name = 'import_file1';
    content = '';

    var path = require('path').resolve(process.cwd() + '/photo/'+file_name);
    console.log(path);
    require('fs').readFile(path, function(err, data){
      if (!err){
        console.log('received data: ' + data);
        content = data;
      }else{
        console.log(err);
      }
    });

    browser
      .delete_file(file_name)
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('#main-menu-file a[action=import_file]')
      .waitForElementVisible('#dlg_import_file', 5000)
      .setValue('input[id="file_import_file"]',require('path').resolve(process.cwd() + '/photo/'+file_name))
      .click('#g_if_btn_ok') //if it didn't be closed yet 
      .pause(1000)
      .waitForElementNotVisible('#dlg_import_file', 5000)
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)      
      .waitForElementVisible('#dlg_notice', 5000)
      .click('#g_nt_btn_ok')
      .waitForElementNotVisible('#dlg_notice', 5000)
      //임포트 후 확인
      .waitForElementPresent('.jstree-node[id$="' + file_name.trim() + '"]', 2000)
      .open_file_toolbar(file_name)
      .verify.containsText('div.CodeMirror-activeline > pre > span', content)
  },
  'file_import_duplicate_file' : function (browser) {
    var file_name = 'extract.zip';
    var content = '';

    browser
      .click('#main_file_toolbar [action=open_file]')
      .waitForElementVisible('#dlg_import_file', 5000)
      .pause(1000)
      .setValue('input[id="file_import_file"]',require('path').resolve(process.cwd() + '/photo/'+file_name))
      .click('#g_if_btn_ok') //if it didn't be closed yet 
      .waitForElementVisible('#dlg_confirmation', 5000)
      .click('#g_cfrm_btn_yes')
      .waitForElementNotVisible('#dlg_confirmation', 5000)
      .waitForElementNotVisible('#dlg_import_file', 5000)
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)      
      .waitForElementVisible('#dlg_notice', 5000)
      .click('#g_nt_btn_ok')
      .waitForElementNotVisible('#dlg_notice', 5000)
      .delete_file('import_file1')
  },
  // 'file_import_duplicate_file' : function (browser) {
  //   var file_name = 'fake_zip.zip';
  //   var content = '';

  //   browser
  //     .click('#main-menu-file > a')
  //     .waitForElementPresent('#main-menu-file.open', 2000)
  //     .click('#main-menu-file a[action=import_file]')
  //     .waitForElementVisible('#dlg_import_file', 5000)
  //     .pause(1000)
  //     .setValue('input[id="file_import_file"]',require('path').resolve(process.cwd() + '/photo/'+file_name))
  //     .click('#g_if_btn_ok') //if it didn't be closed yet 
  //     .waitForElementNotVisible('#dlg_import_file', 5000)
  //     .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)      
  //     .waitForElementVisible('#dlg_notice', 5000)
  //     .click('#g_nt_btn_ok')
  //     .waitForElementNotVisible('#dlg_notice', 5000)
  // },
  // 'file_import_many_files' : function (browser) {
  //   var file_name = 'import_file1, extract.zip, fake_zip.zip';
  //   var content = '';

  //   browser
  //     .click('#main-menu-file > a')
  //     .waitForElementPresent('#main-menu-file.open', 2000)
  //     .click('#main-menu-file a[action=import_file]')
  //     .waitForElementVisible('#dlg_import_file', 5000)
  //     .setValue('input[id="file_import_file"]',require('path').resolve(process.cwd() + '/photo/'+file_name))
  //     .click('#g_if_btn_ok') //if it didn't be closed yet 
  //     .waitForElementVisible('#dlg_confirmation', 5000)
  //     .click('#g_cfrm_btn_yes')
  //     .waitForElementNotVisible('#dlg_confirmation', 5000)  
  //     .waitForElementNotVisible('#dlg_import_file', 5000)
  //     .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)          
  //     .waitForElementVisible('#dlg_notice', 5000)
  //     .click('#g_nt_btn_ok')
  //     .waitForElementNotVisible('#dlg_notice', 5000)
  //     
  // },
  'file_extract_valid_file' : function (browser) {
    var extension = '.zip';
    var file_name = "extract";
    extension.trim();
    file_name.trim();

    browser
      .getText('.jstree-node[id$="' + file_name+extension + '"]', function(result) {
        file_name = result.value;
      })
      .waitForElementPresent('.jstree-node[id$="' + file_name+extension + '"]', 2000)
      .click('.jstree-node[id$="' + file_name+extension + '"]')
      .pause(1000)    
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('#main-menu-file a[action=decompress_file]')
      .waitForElementVisible('#dlg_confirmation', 5000)
      .click('#g_cfrm_btn_yes') //if it didn't be closed yet 
      .waitForElementNotVisible('#dlg_confirmation', 5000)
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)      
  },
  'file_extract_valid_file_many_times' : function (browser) {
    var extension = '.zip';
    var file_name = "extract";
    extension.trim();
    file_name.trim();

    browser
      .getText('.jstree-node[id$="' + file_name+extension + '"]', function(result) {
        file_name = result.value;
      })
      .waitForElementPresent('.jstree-node[id$="' + file_name+extension + '"]', 2000)
      .click('.jstree-node[id$="' + file_name+extension + '"]')
      .pause(1000)    
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('#main-menu-file a[action=decompress_file]')
      .waitForElementVisible('#dlg_confirmation', 5000)
      .click('#g_cfrm_btn_yes') //if it didn't be closed yet 
      .waitForElementNotVisible('#dlg_confirmation', 5000)
      .waitForElementPresent('.jstree-node[id$="' + file_name + '_1"]', 2000)
      .delete_file(file_name)
      .delete_file(file_name+"_1")
  },
  'file_extract_invalid_file' : function (browser) {
    var extension = '.zip';
    var file_name = "fake_zip";
    extension.trim();
    file_name.trim();

    browser
      .getText('.jstree-node[id$="' + file_name+extension + '"]', function(result) {
        file_name = result.value;
      })
      .waitForElementPresent('.jstree-node[id$="' + file_name+extension + '"]', 2000)
      .click('.jstree-node[id$="' + file_name+extension + '"]')
      .pause(1000)    
      .click('#main-menu-file > a')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('#main-menu-file a[action=decompress_file]')
      .waitForElementVisible('#dlg_confirmation', 5000)
      .click('#g_cfrm_btn_yes') //if it didn't be closed yet 
      .waitForElementNotVisible('#dlg_confirmation', 5000)
      .waitForElementVisible('#dlg_alert', 5000)
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 5000)
      .waitForElementNotPresent('.jstree-node[id$="' + file_name + '"]', 2000) 
  }


}
