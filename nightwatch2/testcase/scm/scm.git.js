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
    //   .waitForElementVisible('#goorm_id', 100000)
    //   .setValue('#goorm_id', data.username)
    //   .setValue('#goorm_pw', data.password)
    //   .click('#goorm_login_button')
    //   .waitForElementVisible('#workspace', 200000)
    //   .waitForElementPresent('.user_profile_image', 10000)
    //   .pause(2000)
    //   .waitForElementNotVisible('#dlg_loading_bar', 10000)
  },
  'scm_validation': function(browser) {
    var url = 'https://github.com/openstack/horizon.git';

    browser
      .open_new_project_dialog('scm')
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
  'check_files': function(browser) {
    var file_name = 'new_file';

    browser
      .new_file(file_name)
      .edit('@@@')
      .delete_file(file_name)
  },
  'scm_validation_bitbucket': function(browser) {
    var url = 'https://bitbucket.org/JJayde/goorm_java_exam_bit.git';

    browser
      .open_new_project_dialog('scm')
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
  'check_files_bitbucket': function(browser) {
    var file_name = 'new_file';

    browser
      .new_file(file_name)
      .edit('@@@')
      .delete_file(file_name)
  },
  'check_enable_menu': function (browser) {
    browser
      .click('#main-menu-scm .dropdown-toggle')
      .waitForElementPresent('#main-menu-scm.open', 2000)
      .verify.cssClassNotPresent('#mainmenu_git', 'disabled')
      .verify.cssClassNotPresent('#folder_context_git', 'disabled')
      .verify.cssClassNotPresent('#file_context_git', 'disabled')
  },
  'check_disable_menu': function (browser) {
    browser
      .move_to_other_project('git')
      .click('#main-menu-scm .dropdown-toggle')
      .waitForElementPresent('#main-menu-scm.open', 2000)
      .verify.cssClassPresent('#mainmenu_git', 'disabled')
      .verify.cssClassPresent('#folder_context_git', 'disabled')
      .verify.cssClassPresent('#file_context_git', 'disabled')
  },
  'check_enable_menu_again': function (browser) {
    browser
      .move_to_project(this.project_name)
      .click('#main-menu-scm .dropdown-toggle')
      .waitForElementPresent('#main-menu-scm.open', 2000)
      .verify.cssClassNotPresent('#mainmenu_git', 'disabled')
      .verify.cssClassNotPresent('#folder_context_git', 'disabled')
      .verify.cssClassNotPresent('#file_context_git', 'disabled')
  },
  'status': function(browser) {
    browser
      .windowSize('current', 1280, 768)
      .waitForElementVisible('#main_scm_toolbar', 2000)
      .click('#main_file_toolbar [action=open_file]')
      .waitForElementVisible('#dlg_open_file', 2000)
      .waitForElementVisible('#file_open_files .file_item', 10000)
      .click('#file_open_files .file_item')
      .getText('#file_open_files .file_item', function(result) {
        this
          .click('#g_of_btn_ok')
          .waitForElementNotVisible('#dlg_open_file', 2000)
          .edit()
          .click('#main_file_toolbar [action=save_file]')
          .waitForElementNotVisible('#g_window_tab_list .goorm_tab_menu:last-child .tab_option', 10000)
          .click('#main_scm_toolbar [action=scm_commit]')
          .waitForElementVisible('#dlg_git', 2000)
          .waitForElementVisible('#git_status_tab', 2000)
          .waitForElementNotVisible('#dlg_loading_bar', 10000)
          .verify.containsText('#git_status_files tr:first-child td:last-child', result.value)
          .click('#dlg_git .close')
          .waitForElementNotVisible('#dlg_git', 2000)
          .click('#project_treeview [folder_only] > .jstree-anchor')
          .click('#main_scm_toolbar [action=scm_commit]')
          .waitForElementVisible('#dlg_git', 2000)
          .waitForElementVisible('#git_status_tab', 2000)
          .waitForElementNotVisible('#dlg_loading_bar', 10000)
          .verify.containsText('#git_status_files tr:first-child td:last-child', '/')
          .waitForElementVisible('#git_status_files input[name*="' + result.value + '"]', 2000)
      })
  },
  'undo_change': function (browser) {
    browser
      .click('#git_status_deselectall')
      .waitForElementNotPresent('#git_status_files input:checked', 2000)
      .click('#git_status_files input[scm_type*="M"]')
      .waitForElementVisible('#git_status_files input:checked', 2000)
      .getAttribute('#git_status_files input:checked', 'name', function (result) {
        this
          .click('#git_status_tab .dropdown-toggle')
          .waitForElementVisible('#git_status_tab .dropdown-menu', 2000)
          .click('#undo_changes_bt')
          .waitForElementVisible('#dlg_confirmation', 2000)
          .click('#g_cfrm_btn_yes')
          .waitForElementNotVisible('#dlg_confirmation', 2000)
          .waitForElementNotVisible('#dlg_loading_bar', 10000)
          .waitForElementNotVisible('#dlg_alert', 10000)
          .waitForElementNotPresent('#git_status_files input[name*="' + result.value + '"]', 2000)
      })
  },
  'commit': function (browser) {
    var self = this;

    browser
      .click('#dlg_git .close')
      .waitForElementNotVisible('#dlg_git', 2000)
      .click('#main_scm_toolbar [action=scm_commit]')
      .waitForElementVisible('#dlg_git', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 2000)
      .click('#git_commit_bt')
      .waitForElementVisible('#dlg_git_commit', 2000)
      .getAttribute('#git_status_files input:checked', 'name', function (result) {
        self.file_name = result.value;

        this
          .verify.containsText('#git_commit_files td:last-child', result.value)
          .click('#dlg_git_commit .btn')
          .waitForElementVisible('#dlg_alert', 2000)
          .click('#g_alert_btn_ok')
          .waitForElementNotVisible('#dlg_alert', 2000)
          .setValue('#git_commit_comment', 'test')
          .click('#dlg_git_commit .btn')
          .waitForElementVisible('#dlg_confirmation', 2000)
          .click('#g_cfrm_btn_yes')
          .waitForElementNotVisible('#dlg_confirmation', 2000)
          .waitForElementNotVisible('#dlg_git_commit', 2000)
          .waitForElementNotVisible('#dlg_loading_bar', 10000)
          .waitForElementNotVisible('#dlg_alert', 10000)
          .waitForElementNotPresent('#git_status_files input[scm_type*="M"]', 2000)
          .waitForElementNotPresent('#git_status_files input[scm_type*="A"]', 2000)
      })
  },
  'add': function (browser) {
    browser
      .click('#dlg_git .close')
      .waitForElementNotVisible('#dlg_git', 2000)
      .new_file()
      .click('#main_scm_toolbar [action=scm_commit]')
      .waitForElementVisible('#dlg_git', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 2000)
      .click('#git_status_files input[scm_type*="?"]')
      .waitForElementVisible('#git_status_files input:checked', 2000)
      .click('#git_add_bt')
      .waitForElementVisible('#dlg_confirmation', 2000)
      .click('#g_cfrm_btn_yes')
      .waitForElementNotVisible('#dlg_confirmation', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 2000)
      .waitForElementNotVisible('#dlg_alert', 10000)
      .waitForElementVisible('#git_status_files input[staged*="A"]', 2000)
  },
  'undo_add': function (browser) {
    browser
      .click('#git_status_files input[staged*="A"]')
      .waitForElementVisible('#git_status_files input:checked', 2000)
      .getAttribute('#git_status_files input:checked', 'name', function (result) {
        this
          .click('#git_status_tab .dropdown-toggle')
          .waitForElementVisible('#git_status_tab .dropdown-menu', 2000)
          .click('#undo_add_bt')
          .waitForElementVisible('#dlg_confirmation', 2000)
          .click('#g_cfrm_btn_yes')
          .waitForElementNotVisible('#dlg_confirmation', 2000)
          .waitForElementNotVisible('#dlg_loading_bar', 10000)
          .waitForElementNotVisible('#dlg_alert', 10000)
          .waitForElementVisible('#git_status_files input[name*="' + result.value + '"][scm_type*="?"]', 2000)
      })
  },
  'remove': function (browser) {
    browser
      .click('#git_treeview [file_type]:last-child')
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .waitForElementVisible('#git_status_files input:checked', 2000)
      .getAttribute('#git_status_files input:checked', 'name', function (result) {
        this
          .click('#git_remove_bt')
          .waitForElementVisible('#dlg_confirmation', 2000)
          .click('#g_cfrm_btn_yes')
          .waitForElementNotVisible('#dlg_confirmation', 2000)
          .waitForElementNotVisible('#dlg_loading_bar', 2000)
          .waitForElementNotVisible('#dlg_alert', 10000)
          .waitForElementVisible('#git_status_files input[staged*="D"]', 2000)
          .waitForElementNotPresent('#git_treeview [path$="' + result.value + '"]', 2000)
          .waitForElementNotPresent('#project_treeview [path$="' + result.value + '"]', 2000)
      })
  },
  'push': function(browser) {
    var data = browser.globals;

    browser
      .click('#git_push_bt')
      .waitForElementVisible('#dlg_scm_auth', 2000)
      .setValue('#scm_auth_id', 'git')
      .setValue('#scm_auth_password', 'git')
      .click('#g_scm_auth_btn_ok')
      .waitForElementNotVisible('#dlg_scm_auth', 2000)
      .waitForElementVisible('#dlg_alert', 10000)
      .click('#g_alert_btn_ok')
      .click('#git_push_bt')
      .waitForElementVisible('#dlg_scm_auth', 2000)
      .setValue('#scm_auth_id', data.git_id)
      .setValue('#scm_auth_password', data.git_pw)
      .click('#g_scm_auth_btn_ok')
      .waitForElementNotVisible('#dlg_scm_auth', 2000)
      .waitForElementVisible('#dlg_notice', 10000)
      .click('#g_nt_btn_ok')
      .waitForElementNotVisible('#dlg_notice', 2000)
      .waitForElementVisible('#dlg_git_push', 2000)
      .verify.containsText('#dlg_git_push .panel-body', this.file_name)
      .click('#g_push_btn_ok')
      .waitForElementNotVisible('#dlg_git_push', 2000)
      .waitForElementVisible('#dlg_confirmation', 2000)
      .click('#g_cfrm_btn_yes')
      .waitForElementNotVisible('#dlg_confirmation', 2000)
      .waitForElementVisible('#dlg_loading_bar', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .waitForElementNotVisible('#dlg_alert', 10000)
  },
  'undo_push': function(browser) {
    browser
      .click('#git_status_tab .dropdown-toggle')
      .waitForElementVisible('#git_status_tab .dropdown-menu', 2000)
      .click('#undo_push_bt')
      .waitForElementVisible('#dlg_confirmation', 2000)
      .click('#g_cfrm_btn_yes')
      .waitForElementNotVisible('#dlg_confirmation', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .waitForElementNotVisible('#dlg_alert', 10000)
      .click('#git_push_bt')
      .waitForElementVisible('#dlg_git_push', 10000)
      .expect.element('#dlg_git_push .panel-body').text.to.match(/\w/)
      .click('#dlg_git_push .close')
      .waitForElementNotVisible('#dlg_git_push', 10000)
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
      .click('#git_treeview [aria-level="1"] .jstree-anchor')
      .waitForElementNotVisible('#dlg_loading_bar', 2000)
      .click('#git_log')
      .waitForElementVisible('#git_log_tab', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .verify.containsText('#git_log_tab .scm_selected_path', '/')
      .verify.elementPresent('#git_log_contents tr')
      .click('#dlg_git .close')
      .waitForElementNotVisible('#dlg_git', 2000)
  },
  'blame': function(browser) {
    var self = this;

    browser
      .click('#project_treeview [file_type]:last-child .jstree-anchor')
      .getText('#project_treeview [file_type]:last-child .jstree-anchor', function (result) {
        self.file_name = result.value;

        this
          .click('#main_scm_toolbar .scm_pull')
          .waitForElementVisible('#dlg_git', 2000)
          .click('#git_blame')
          .waitForElementVisible('#git_blame_tab', 2000)
          .verify.cssClassPresent('#git_tabview .nav-tabs li:first-child', 'disabled')
          .waitForElementNotVisible('#dlg_loading_bar', 10000)
          .verify.containsText('#git_blame_tab .scm_selected_path', result.value)
          .verify.elementPresent('#blame_container .CodeMirror-code')
      })
  },
  'diff': function (browser) {
    browser
      .click('#git_diff')
      .waitForElementVisible('#git_diff_tab', 2000)
      .waitForElementNotVisible('#dlg_loading_bar', 10000)
      .verify.containsText('#git_diff_tab .scm_selected_path', this.file_name)
      .click('#dlg_git .close')
  },
  'property_create_project': function(browser) {
      var url = 'https://bitbucket.org/JJayde/goorm_java_exam_bit.git';
      var project_name = ('property' + Math.random()).replace('.', '');

      if(project_name.length > 25) {
        project_name = project_name.slice(0, 25);
      }

      browser
        .pause(2000)
        .create_template_project(project_name)
        .click('#main-menu-project')
        .waitForElementVisible('#main-menu-project .dropdown-menu', 2000)
        .click('#project_property_open')
        .waitForElementVisible('#dlg_project_property', 2000)
        .click('[id="property_treeview/Property/SCM"]')
        .waitForElementVisible('#scm_configuration_tab', 2000)
        .click('[for=config_scm_type_git]')
        .setValue('#scm_configuration_tab .scm_URL', url)
        .click('[for=prop_scm_revision_head]')
        .click('[for=config_scm_anonymous_bt]')
        .click('#config_scm_test_bt')
        .waitForElementVisible('#config_scm_test_bt', 10000)
        .verify.cssClassPresent('#config_scm_test_bt', 'btn-success')
        .click('#scm_checkout_bt')
        .waitForElementNotVisible('#dlg_project_property', 2000)
        .waitForElementNotVisible('#dlg_loading_bar', 10000000)
        .waitForElementNotVisible('#dlg_alert', 10000)
        .pause(2000)
        .waitForElementNotVisible('#dlg_loading_bar', 10000)
    }
}