module.exports = {
  'goorm_login': function(browser) {
    var data = browser.globals;

    browser
      .url(data.urls.qa)
      .waitForElementVisible('input.login-form', 2000)
      .setValue('input[name=id]', data.username)
      .setValue('input[name=pw]', data.password)
      .click('button[id=btn-login]')
      .waitForElementVisible('div#ide-vm-list', 2000)
      .pause(2000)
      .waitForElementNotPresent('button#btn-run-ide[disabled=disabled]', 10000)
      .click('#btn-run-ide')
      .waitForElementVisible('#workspace', 200000)
      .verify.urlEquals(data.urls.ide)
      .waitForElementVisible('#workspace', 200000)
      .waitForElementPresent('.user_profile_image', 10000)
      .pause(2000)
      .waitForElementNotVisible('#dlg_loading_bar', 100000)

    // browser
    //   .url(data.urls.local)
    //   .waitForElementVisible('#goorm_id', 10000)
    //   .setValue('#goorm_id', data.username)
    //   .setValue('#goorm_pw', data.password)
    //   .click('#goorm_login_button')
    //   .waitForElementVisible('#workspace', 200000)
    //   .waitForElementPresent('.user_profile_image', 10000)
    //   .pause(2000)
    //   .waitForElementNotVisible('#dlg_loading_bar', 10000)
  },
  'open_new_project_dialog': function(browser) {
    browser
      .click('#main_file_toolbar [action=new_project]')
      .waitForElementVisible('#dlg_new_project', 2000)
      .pause(5000)
      .click('[href="#new_project_scm"]')
      .waitForElementVisible('#new_project_scm', 2000)
  },
  'scm_validation': function(browser) {
    var url = 'https://github.com/openstack/horizon.git';

    browser
      .click('#new_proj_scm_test_bt')
      .waitForElementVisible('#dlg_alert', 2000)
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 10000)
      .click('#g_np_btn_next')
      .waitForElementVisible('#dlg_alert', 2000)
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 10000)
      .click('[for=new_scm_type_git]')
      .setValue('#new_project_scm_config .scm_URL', url)
      .click('[for=new_scm_anonymous_bt]')
      .click('#new_proj_scm_test_bt')
      .waitForElementVisible('#new_proj_scm_test_bt', 10000)
      .verify.cssClassPresent('#new_proj_scm_test_bt', 'btn-success')
      .click('[for=new_scm_revision_certain]')
      .verify.cssClassPresent('#new_proj_scm_test_bt', 'btn-danger')
      .verify.elementNotPresent('#new_project_scm_config .scm_revision_certain[disabled]')
      .setValue('#new_project_scm_config .scm_revision_certain', '1a!')
      .click('#new_proj_scm_test_bt')
      .waitForElementVisible('#dlg_alert', 5000)
      .verify.containsText('#dlg_alert .alert_content_div', '!')
      .click('#g_alert_btn_ok')
      .waitForElementNotVisible('#dlg_alert', 10000)
      .click('[for=new_scm_revision_head]')
      .verify.elementPresent('#new_project_scm_config .scm_revision_certain[disabled]')
      .click('#new_proj_scm_test_bt')
      .waitForElementVisible('#new_proj_scm_test_bt', 10000)
      .verify.cssClassPresent('#new_proj_scm_test_bt', 'btn-success')
  },
  'project_create': function(browser) {
    var project_name = ('git' + Math.random()).replace('.', '');

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
      .pause(5000)
      .verify.containsText('#loading_bar_row .progress_wrapper:first-child .row', 'Receiving objects')
      .verify.containsText('#loading_bar_row .progress_wrapper:nth-child(2) .row', 'Resolving deltas')
      .verify.containsText('#loading_bar_row .progress_wrapper:last-child .row', 'Checking out files')
      .waitForElementNotVisible('#dlg_loading_bar', 10000000)
      .waitForElementNotVisible('#dlg_alert', 10000)
      .pause(2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
  },
  'new_file': function(browser) {
    var file_name = 'new_file';

    browser
      .click('#main_file_toolbar [action=new_file_file]')
      .waitForElementVisible('#dlg_new_file', 2000)
      .setValue('#file_new_target_name', file_name)
      .click('#g_nf_btn_ok')
      .waitForElementNotVisible('#dlg_new_file', 10000)
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
  },
  'edit': function (browser) {
    var file_name = 'new_file';

    browser
      .click('#main_file_toolbar [action=open_file]')
      .waitForElementVisible('#dlg_open_file', 3000)
      .click('#file_open_files [filename=' + file_name + ']')
      .click('#g_of_btn_ok')
      .waitForElementNotVisible('#dlg_open_file', 3000)
      .waitForElementVisible('div.ui-dialog', 5000)
      .verify.elementPresent('div.ui-dialog')
      .execute(function () {
        var window_list = core.module.layout.workspace.window_manager.window;

        window_list[window_list.length - 1].editor.editor.setValue('@@@');
      }, [])
      .verify.visible('#g_window_tab_list .goorm_tab_menu:last-child .tab_option')
  },
  'delete_file': function(browser) {
    var file_name = 'new_file';

    browser
      .click('.jstree-node[id$="' + file_name + '"] a')
      .click('#main-menu-file .dropdown-toggle')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('[action=delete_file]')
      .waitForElementVisible('#dlg_confirmation', 2000)
      .click('#g_cfrm_btn_yes')
      .waitForElementNotVisible('#dlg_confirmation', 10000)
      .waitForElementNotPresent('.jstree-node[id$="' + file_name + '"]', 2000)
  },
  'open_new_project_dialog_bitbucket': function(browser) {
    browser
      .click('#main_file_toolbar [action=new_project]')
      .waitForElementVisible('#dlg_new_project', 2000)
      .pause(5000)
      .click('a[href="#new_project_scm"]')
      .waitForElementVisible('#new_project_scm', 2000)
  },
  'scm_validation_bitbucket': function(browser) {
    var url = 'https://bitbucket.org/JJayde/goorm_java_exam_bit.git';

    browser
      .click('[for=new_scm_type_git]')
      .setValue('#new_project_scm_config .scm_URL', url)
      .click('[for=new_scm_anonymous_bt]')
      .click('#new_proj_scm_test_bt')
      .waitForElementVisible('#new_proj_scm_test_bt', 10000)
      .verify.cssClassPresent('#new_proj_scm_test_bt', 'btn-success')
  },
  'project_create_bitbucket': function(browser) {
    this.project_name = ('git' + Math.random()).replace('.', '');

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
      .pause(5000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000000)
      .waitForElementNotVisible('#dlg_alert', 10000)
      .pause(2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
  },
  'new_file_bitbucket': function(browser) {
    var file_name = 'new_file';

    browser
      .click('#main_file_toolbar [action=new_file_file]')
      .waitForElementVisible('#dlg_new_file', 2000)
      .setValue('#file_new_target_name', file_name)
      .click('#g_nf_btn_ok')
      .waitForElementNotVisible('#dlg_new_file', 10000)
      .waitForElementPresent('.jstree-node[id$="' + file_name + '"]', 2000)
  },
  'edit_bitbucket': function (browser) {
    var file_name = 'new_file';

    browser
      .click('#main_file_toolbar [action=open_file]')
      .waitForElementVisible('#dlg_open_file', 3000)
      .click('#file_open_files [filename=' + file_name + ']')
      .click('#g_of_btn_ok')
      .waitForElementNotVisible('#dlg_open_file', 3000)
      .waitForElementVisible('div.ui-dialog', 5000)
      .verify.elementPresent('div.ui-dialog')
      .execute(function () {
        var window_list = core.module.layout.workspace.window_manager.window;

        window_list[window_list.length - 1].editor.editor.setValue('@@@');
      }, [])
      .verify.visible('#g_window_tab_list .goorm_tab_menu:last-child .tab_option')
  },
  'delete_file_bitbucket': function(browser) {
    var file_name = 'new_file';

    browser
      .click('.jstree-node[id$="' + file_name + '"] a')
      .click('#main-menu-file .dropdown-toggle')
      .waitForElementPresent('#main-menu-file.open', 2000)
      .click('[action=delete_file]')
      .waitForElementVisible('#dlg_confirmation', 2000)
      .click('#g_cfrm_btn_yes')
      .waitForElementNotVisible('#dlg_confirmation', 10000)
      .waitForElementNotPresent('.jstree-node[id$="' + file_name + '"]', 2000)
  },
  'check_enable_menu': function (browser) {
    browser
      .click('#main-menu-scm .dropdown-toggle')
      .waitForElementPresent('#main-menu-scm.open', 2000)
      .verify.cssClassNotPresent('#mainmenu_git', 'disabled')
      .verify.cssClassNotPresent('#folder_context_git', 'disabled')
      .verify.cssClassNotPresent('#file_context_git', 'disabled')
  },
  'move_to_other_project': function(browser) {
    browser
      .click('#project_selectbox')
      .waitForElementPresent('#project_selector .open', 2000)
      .click('.project_item:not([project_path*=git])')
      .pause(2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
  },
  'check_disable_menu': function (browser) {
    browser
      .click('#main-menu-scm .dropdown-toggle')
      .waitForElementPresent('#main-menu-scm.open', 2000)
      .verify.cssClassPresent('#mainmenu_git', 'disabled')
      .verify.cssClassPresent('#folder_context_git', 'disabled')
      .verify.cssClassPresent('#file_context_git', 'disabled')
  },
  'move_back_to_previous_project': function (browser) {
    browser
      .click('#project_selectbox')
      .waitForElementPresent('#project_selector .open', 2000)
      .click('[project_path$=' + this.project_name + ']')
      .pause(2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
  },
  'check_enable_menu_again': function (browser) {
    browser
      .click('#main-menu-scm .dropdown-toggle')
      .waitForElementPresent('#main-menu-scm.open', 2000)
      .verify.cssClassNotPresent('#mainmenu_git', 'disabled')
      .verify.cssClassNotPresent('#folder_context_git', 'disabled')
      .verify.cssClassNotPresent('#file_context_git', 'disabled')
  },
  'status': function (browser) {
    browser
      .click('#project_treeview [aria-level="1"] > a')
      .windowSize('current', 1280, 768)
      .waitForElementVisible('#main_scm_toolbar', 2000)
      .click('#main_scm_toolbar [action=scm_status]')
      .waitForElementVisible('#dlg_git', 2000)
      .waitForElementVisible('#git_status_tab', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .verify.containsText('#git_status_files tr:first-child td:last-child', '/')
  },
  'branch': function (browser) {
    browser
      .click('#git_branch')
      .waitForElementVisible('#git_branch_tab', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .verify.containsText('#git_branch_list [name=master_published]', 'P')
      .verify.containsText('#git_branch_list [name=master_merged]', 'M')
      .verify.containsText('#git_branch_list tbody tr:first-child td:nth-child(4)', 'master')
      .verify.containsText('#git_branch_list [name=master_current]', '*')
  },
  'log': function (browser) {
    browser
      .click('#git_log')
      .waitForElementVisible('#git_log_tab', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .verify.containsText('#git_log_tab .scm_selected_path', '/')
      .verify.elementPresent('#git_log_contents tr')
  }
}