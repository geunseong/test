exports.command = function(folder_name) {
  if(!folder_name) {
    folder_name = Math.random().toString();
  }

  this
    .click('#main-menu-file > a')
    .waitForElementPresent('#main-menu-file.open', 2000)
    .moveToElement('#parent_new_menu', 100, 10)
    .waitForElementVisible('#child_new_menu', 1000)
    .click('#child_new_menu li > a[action=new_file_folder]')
    .waitForElementVisible('#dlg_new_folder', 2000)
    .setValue('#folder_new_target_name', folder_name)
    .click('#g_nfo_btn_ok')
    .waitForElementNotVisible('#dlg_new_folder', 3000)
    .waitForElementPresent('.jstree-node[id$="' + folder_name + '"]', 2000)
  return this;
};