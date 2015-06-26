module.exports = {
  'goorm_login': function(browser) {
    var data = browser.globals;

    browser
      .run_ide(data.username, data.password)
      .waitForElementVisible('#workspace', 200000)
      .waitForElementPresent('.user_profile_image', 10000)
      .pause(2000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)

    // browser
    //   .url(data.urls.local)
    //   .waitForElementVisible('#goorm_id', 20000)
    //   .setValue('#goorm_id', data.username)
    //   .setValue('#goorm_pw', data.password)
    //   .click('#goorm_login_button')
    //   .waitForElementVisible('#workspace', 200000)
    //   .waitForElementPresent('.user_profile_image', 10000)
    //   .pause(2000)
    //   .waitForElementNotVisible('#dlg_loading_bar', 10000)
  },
  'open_new_project_dialog': function(browser) {
    browser.open_new_project_dialog('scm');
  },
  'scm_validation': function(browser) {
    var data = browser.globals;
    var url = 'http://devmngt.goorm.io/svn/goorm_core/trunk/public/modules';

    browser
      .click('#new_proj_scm_test_bt')
      .waitForElementVisible('#dlg_alert', 2000)
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 10000)
      .click('#g_np_btn_next')
      .waitForElementVisible('#dlg_alert', 2000)
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 10000)
      .click('[for=new_scm_type_svn]')
      .setValue('#new_project_scm_config .scm_URL', url)
      .click('[for=new_scm_authorized_bt]')
      .verify.elementNotPresent('#new_project_scm_config .scm_user[disabled]')
      .verify.elementNotPresent('#new_project_scm_config .scm_password[disabled]')
      .setValue('#new_project_scm_config .scm_user', data.svn_id)
      .setValue('#new_project_scm_config .scm_password', data.svn_pw)
      .click('#new_proj_scm_test_bt')
      .waitForElementVisible('#new_proj_scm_test_bt', 2000)
      .verify.cssClassPresent('#new_proj_scm_test_bt', 'btn-success')
      .click('[for=new_scm_revision_certain]')
      .verify.cssClassPresent('#new_proj_scm_test_bt', 'btn-danger')
      .verify.elementNotPresent('#new_project_scm_config .scm_revision_certain[disabled]')
      .setValue('#new_project_scm_config .scm_revision_certain', '1a!')
      .click('#new_proj_scm_test_bt')
      .waitForElementVisible('#dlg_alert', 2000)
      .verify.containsText('#dlg_alert .alert_content_div', 'a, !')
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 10000)
      .click('[for=new_scm_revision_head]')
      .verify.elementPresent('#new_project_scm_config .scm_revision_certain[disabled]')
      .click('#new_proj_scm_test_bt')
      .waitForElementVisible('#new_proj_scm_test_bt', 2000)
      .verify.cssClassPresent('#new_proj_scm_test_bt', 'btn-success')
  },
  'project_create': function(browser) {
    var project_name = ('svn' + Math.random()).replace('.', '');

    browser
      .click('#g_np_btn_next')
      .waitForElementVisible('#input_project_name', 1000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .click('#g_np_btn_ok_scm')
      .waitForElementVisible('#dlg_alert', 2000)
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 10000)
      .setValue('#input_project_name', project_name)
      .click('#g_np_btn_ok_scm')
      .waitForElementNotVisible('#dlg_new_project', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000, false)
      .verify.containsText('#selected_project_name', project_name)
      .pause(2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000000)
      .waitForElementNotVisible('#dlg_alert', 10000)
      .pause(2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
  },
  'new_file': function(browser) {
    browser.new_file('new_file');
  },
  'edit': function (browser) {
    browser.edit('new_file', '@@@');
  },
  'delete_file': function(browser) {
    browser.delete_file('new_file');
  },
  'open_new_project_dialog_big': function(browser) {
    browser.open_new_project_dialog('scm');
  },
  'scm_validation_big': function(browser) {
    var url = 'http://lz4.googlecode.com/svn/trunk';

    browser
      .click('[for=new_scm_type_svn]')
      .setValue('#new_project_scm_config .scm_URL', url)
      .click('[for=new_scm_anonymous_bt]')
      .click('#new_proj_scm_test_bt')
      .waitForElementVisible('#new_proj_scm_test_bt', 10000)
      .verify.cssClassPresent('#new_proj_scm_test_bt', 'btn-success')
  },
  'project_create_big': function(browser) {
    this.project_name = ('svn' + Math.random()).replace('.', '');

    browser
      .click('#g_np_btn_next')
      .waitForElementVisible('#input_project_name', 1000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .click('#g_np_btn_ok_scm')
      .waitForElementVisible('#dlg_alert', 2000)
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 10000)
      .setValue('#input_project_name', this.project_name)
      .click('#g_np_btn_ok_scm')
      .waitForElementNotVisible('#dlg_new_project', 10000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000, false)
      .verify.containsText('#selected_project_name', this.project_name)
      .pause(2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000000)
      .waitForElementNotVisible('#dlg_alert', 10000)
      .pause(2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
  },
  'new_file_big': function(browser) {
    browser.new_file('new_file');
  },
  'edit_big': function (browser) {
    browser.edit('new_file', '@@@');
  },
  'delete_file_big': function(browser) {
    browser.delete_file('new_file');
  },
  'check_enable_menu': function (browser) {
    browser
      .click('#main-menu-scm .dropdown-toggle')
      .waitForElementPresent('#main-menu-scm.open', 2000)
      .verify.cssClassNotPresent('#mainmenu_svn', 'disabled')
      .verify.cssClassNotPresent('#folder_context_svn', 'disabled')
      .verify.cssClassNotPresent('#file_context_svn', 'disabled')
  },
  'move_to_other_project': function(browser) {
    browser.move_to_other_project('svn');
  },
  'check_disable_menu': function (browser) {
    browser
      .click('#main-menu-scm .dropdown-toggle')
      .waitForElementPresent('#main-menu-scm.open', 2000)
      .verify.cssClassPresent('#mainmenu_svn', 'disabled')
      .verify.cssClassPresent('#folder_context_svn', 'disabled')
      .verify.cssClassPresent('#file_context_svn', 'disabled')
  },
  'move_back_to_previous_project': function (browser) {
    browser.move_to_project(this.project_name);
  },
  'check_enable_menu_again': function (browser) {
    browser
      .click('#main-menu-scm .dropdown-toggle')
      .waitForElementPresent('#main-menu-scm.open', 2000)
      .verify.cssClassNotPresent('#mainmenu_svn', 'disabled')
      .verify.cssClassNotPresent('#folder_context_svn', 'disabled')
      .verify.cssClassNotPresent('#file_context_svn', 'disabled')
  },
  'status': function (browser) {
    browser
      .windowSize('current', 1280, 768)
      .waitForElementVisible('#main_scm_toolbar', 2000)
      .click('#main_scm_toolbar [action=scm_commit]')
      .waitForElementVisible('#dlg_svn', 2000)
      .waitForElementVisible('#svn_status_tab', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .verify.containsText('#svn_status_files tr:first-child td:last-child', '/')
      .click('#dlg_svn .close')
      .waitForElementNotVisible('#dlg_svn', 2000)
  },
  'update': function (browser) {
    browser
      .click('#main_scm_toolbar [action=scm_update]')
      .waitForElementVisible('#dlg_svn', 2000)
      .waitForElementVisible('#svn_update_tab', 2000)
      .verify.containsText('#svn_update_tab .scm_selected_path', '/')
  },
  'lock': function (browser) {
    browser
      .click('#svn_lock')
      .waitForElementVisible('#svn_lock_tab', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .verify.containsText('#svn_lock_files tr:first-child td:last-child', '/')
  },
  'resolve': function (browser) {
    browser
      .click('#svn_resolve')
      .waitForElementVisible('#svn_resolve_tab', 2000)
      .verify.containsText('#svn_resolve_tab .scm_selected_path', '/')
  },
  'log': function (browser) {
    browser
      .click('#svn_log')
      .waitForElementVisible('#svn_log_tab', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .verify.containsText('#svn_log_tab .scm_selected_path', '/')
      .verify.elementPresent('#svn_log_contents tr')
      .click('#dlg_svn .close')
      .waitForElementNotVisible('#dlg_svn', 2000)
  },
  'blame': function (browser) {
    browser
      .click('#project_treeview [aria-level="2"]:first-child .jstree-ocl')
      .waitForElementVisible('#project_treeview [aria-level="2"]:first-child .jstree-children', 2000)
      .click('#project_treeview [aria-level="2"]:first-child [file_type]:first-child > a')
      .click('#main_scm_toolbar .scm_update')
      .waitForElementVisible('#dlg_svn', 2000)
      .click('#svn_blame')
      .waitForElementVisible('#svn_blame_tab', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .verify.containsText('#svn_blame_tab .scm_selected_path', '/')
      .verify.elementPresent('#blame_container .CodeMirror-code')
  },
  'diff': function (browser) {
    browser
      .click('#svn_diff')
      .waitForElementVisible('#svn_diff_tab', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .verify.containsText('#svn_diff_tab .scm_selected_path', '/')
  }
}