module.exports = {
    'goorm_login': function(browser) {
      var data = browser.globals;

      // browser
      //   .run_ide(data.username, data.password)
      //   .waitForElementVisible('#workspace', 200000)
      //   .waitForElementPresent('.user_profile_image', 10000)
      //   .pause(2000)
      //   .waitForElementNotVisible('#dlg_loading_bar', 100000)

      browser
        .url(data.urls.local)
        .waitForElementVisible('#goorm_id', 20000)
        .setValue('#goorm_id', data.username)
        .setValue('#goorm_pw', data.password)
        .click('#goorm_login_button')
        .waitForElementVisible('#workspace', 200000)
        .waitForElementPresent('.user_profile_image', 10000)
        .pause(2000)
        .waitForElementNotVisible('#dlg_loading_bar', 10000)
    },
    'scm_validation': function(browser) {
      var data = browser.globals;
      var url = 'http://devmngt.goorm.io/svn/goorm_core/trunk/public/modules';

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
        .click('[for=new_scm_type_svn]')
        .setValue('#new_project_scm_config .scm_URL', url)
        .click('[for=new_scm_authorized_bt]')
        .verify.elementNotPresent('#new_project_scm_config .scm_user[disabled]')
        .verify.elementNotPresent('#new_project_scm_config .scm_password[disabled]')
        .setValue('#new_project_scm_config .scm_user', data.svn_id)
        .setValue('#new_project_scm_config .scm_password', data.svn_pw)
        .click('#new_proj_scm_test_bt')
        .waitForElementVisible('#new_proj_scm_test_bt', 10000)
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
    'check_files': function(browser) {
      var file_name = 'new_file';

      browser
        .new_file(file_name)
        .edit(file_name, '@@@')
        .delete_file(file_name)
    },
    'scm_validation_big': function(browser) {
      var url = 'http://lz4.googlecode.com/svn/trunk';

      browser
        .open_new_project_dialog('scm')
        .click('[for=new_scm_type_svn]')
        .setValue('#new_project_scm_config .scm_URL', url)
        .click('[for=new_scm_anonymous_bt]')
        .click('#new_proj_scm_test_bt')
        .waitForElementVisible('#new_proj_scm_test_bt', 10000)
        .verify.cssClassPresent('#new_proj_scm_test_bt', 'btn-success')
    },
    'project_create_big': function(browser) {
      this.big_project_name = ('svn' + Math.random()).replace('.', '');

      browser
        .click('#g_np_btn_next')
        .waitForElementVisible('#input_project_name', 1000)
        .waitForElementNotVisible('#dlg_loading_bar', 10000)
        .click('#g_np_btn_ok_scm')
        .waitForElementVisible('#dlg_alert', 2000)
        .click('#g_alert_btn_ok')
        .waitForElementNotVisible('#dlg_alert', 10000)
        .setValue('#input_project_name', this.big_project_name)
        .click('#g_np_btn_ok_scm')
        .waitForElementNotVisible('#dlg_new_project', 10000)
        .waitForElementNotVisible('#dlg_loading_bar', 10000, false)
        .verify.containsText('#selected_project_name', this.big_project_name)
        .pause(2000)
        .waitForElementNotVisible('#dlg_loading_bar', 10000000)
        .waitForElementNotVisible('#dlg_alert', 10000)
        .pause(2000)
        .waitForElementNotVisible('#dlg_loading_bar', 10000)
    },
    'check_files_big': function(browser) {
      var file_name = 'new_file';

      browser
        .new_file(file_name)
        .edit(file_name, '@@@')
        .delete_file(file_name)
    },
    'check_enable_menu': function (browser) {
      browser
        .click('#main-menu-scm .dropdown-toggle')
        .waitForElementPresent('#main-menu-scm.open', 2000)
        .verify.cssClassNotPresent('#mainmenu_svn', 'disabled')
        .verify.cssClassNotPresent('#folder_context_svn', 'disabled')
        .verify.cssClassNotPresent('#file_context_svn', 'disabled')
    },
    'check_disable_menu': function (browser) {
      browser
        .move_to_other_project('svn')
        .click('#main-menu-scm .dropdown-toggle')
        .waitForElementPresent('#main-menu-scm.open', 2000)
        .verify.cssClassPresent('#mainmenu_svn', 'disabled')
        .verify.cssClassPresent('#folder_context_svn', 'disabled')
        .verify.cssClassPresent('#file_context_svn', 'disabled')
    },
    'check_enable_menu_again': function (browser) {
      browser
        .move_to_project(this.big_project_name)
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
        .click('#main_file_toolbar [action=open_file]')
        .waitForElementVisible('#dlg_open_file', 2000)
        .click('#file_open_dir_tree .jstree-node:nth-child(2)')
        .click('#file_open_files .file_item:first-child')
        .getText('#file_open_files .file_item:first-child', function (result) {
          this
            .click('#g_of_btn_ok')
            .waitForElementNotVisible('#dlg_open_file', 2000)
            .edit(result.value, Math.random().toString())
            .click('#main_file_toolbar [action=save_file]')
            .click('#main_scm_toolbar [action=scm_commit]')
            .waitForElementVisible('#dlg_svn', 2000)
            .waitForElementVisible('#svn_status_tab', 2000)
            .waitForElementNotVisible('#dlg_loading_bar', 10000)
            .verify.containsText('#svn_status_files tr:first-child td:last-child', result.value)
            .click('#dlg_svn .close')
            .waitForElementNotVisible('#dlg_svn', 2000)
            .click('#project_treeview [folder_only] > .jstree-anchor')
            .click('#main_scm_toolbar [action=scm_commit]')
            .waitForElementVisible('#dlg_svn', 2000)
            .waitForElementVisible('#svn_status_tab', 2000)
            .waitForElementNotVisible('#dlg_loading_bar', 10000)
            .verify.containsText('#svn_status_files tr:first-child td:last-child', '/')
            .waitForElementVisible('#svn_status_files input[name*="' + result.value + '"]', 2000)
        })
    },
    'revert': function (browser) {
      browser
        .click('#svn_status_deselectall')
        .waitForElementNotPresent('#svn_status_files input:checked', 2000)
        .click('#svn_status_files input[scm_type*="M"]')
        .waitForElementVisible('#svn_status_files input:checked', 2000)
        .getAttribute('#svn_status_files input:checked', 'name', function (result) {
          this
            .click('#svn_revert_bt')
            .waitForElementVisible('#dlg_confirmation', 2000)
            .click('#g_cfrm_btn_yes')
            .waitForElementNotVisible('#dlg_confirmation', 2000)
            .waitForElementNotVisible('#dlg_loading_bar', 10000)
            .waitForElementNotPresent('#svn_status_files input[name*="' + result.value + '"]', 2000)
            .waitForElementVisible('#dlg_confirmation', 2000, false)
            .click('#g_cfrm_btn_no')
            .waitForElementNotVisible('#dlg_confirmation', 2000, false)
        })
    },
    'commit': function (browser) {
      browser
        .click('#dlg_svn .close')
        .waitForElementNotVisible('#dlg_svn', 2000)
        .move_to_project(this.project_name)
        .click('#main_scm_toolbar [action=scm_commit]')
        .waitForElementVisible('#dlg_svn', 2000)
        .click('#svn_commit_bt')
        .waitForElementVisible('#dlg_svn_commit', 2000)
        .getAttribute('#svn_status_files input:checked', 'name', function (result) {
          this
            .verify.containsText('#svn_commit_files td:last-child', result.value)
            .click('#dlg_svn_commit .btn')
            .waitForElementVisible('#dlg_alert', 2000)
            .click('#g_alert_btn_ok')
            .waitForElementNotVisible('#dlg_alert', 2000)
            .setValue('#svn_commit_comment', 'test')
            .click('#dlg_svn_commit .close')
            .waitForElementNotVisible('#dlg_svn_commit', 2000)
            // .click('#dlg_svn_commit .btn')
            // .waitForElementVisible('#dlg_confirmation', 2000)
            // .click('#g_cfrm_btn_yes')
            // .waitForElementNotVisible('#dlg_confirmation', 2000)
            // .waitForElementNotVisible('#dlg_loading_bar', 10000)
            // .waitForElementNotVisible('#dlg_svn_commit', 2000)
            // .waitForElementNotPresent('#svn_status_files input[scm_type*="M"]', 2000)
            // .waitForElementNotPresent('#svn_status_files input[scm_type*="A"]', 2000)
        })
    },
    'add': function (browser) {
      browser
        .click('#svn_status_files input[scm_type*="?"]')
        .waitForElementVisible('#svn_status_files input:checked', 2000)
        .click('#svn_add_bt')
        .waitForElementVisible('#dlg_confirmation', 2000)
        .click('#g_cfrm_btn_yes')
        .waitForElementNotVisible('#dlg_confirmation', 2000)
        .waitForElementNotVisible('#dlg_loading_bar', 2000)
        .waitForElementVisible('#svn_status_files input[scm_type*="A"]', 2000)
    },
    'remove': function (browser) {
      browser
        .click('#svn_treeview [aria-level="2"]:first-child')
        .waitForElementNotVisible('#dlg_loading_bar', 10000)
        .click('#svn_status_files input')
        .waitForElementVisible('#svn_status_files input:checked', 2000)
        .click('#svn_remove_bt')
        .waitForElementVisible('#dlg_confirmation', 2000)
        .click('#g_cfrm_btn_yes')
        .waitForElementNotVisible('#dlg_confirmation', 2000)
        .waitForElementNotVisible('#dlg_loading_bar', 2000)
        .waitForElementVisible('#svn_status_files input[scm_type*="D"]', 2000)
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
      var self = this;

      browser
        .click('#project_treeview [aria-level="2"]:first-child .jstree-ocl')
        .waitForElementVisible('#project_treeview [aria-level="2"]:first-child .jstree-children', 2000)
        .click('#project_treeview [aria-level="2"]:first-child .jstree-children [file_type]:first-child .jstree-anchor')
        .getText('#project_treeview [aria-level="2"]:first-child .jstree-children [file_type]:first-child .jstree-anchor', function (result) {
          self.file_name = result.value;

          this
            .click('#main_scm_toolbar .scm_update')
            .waitForElementVisible('#dlg_svn', 2000)
            .click('#svn_blame')
            .waitForElementVisible('#svn_blame_tab', 2000)
            .verify.cssClassPresent('#svn_tabview .nav-tabs li:first-child', 'disabled')
            .waitForElementNotVisible('#dlg_loading_bar', 10000)
            .verify.containsText('#svn_blame_tab .scm_selected_path', result.value)
            .verify.elementPresent('#blame_container .CodeMirror-code')
        })
    },
    'diff': function (browser) {
      browser
        .click('#svn_diff')
        .waitForElementVisible('#svn_diff_tab', 2000)
        .waitForElementNotVisible('#dlg_loading_bar', 10000)
        .verify.containsText('#svn_diff_tab .scm_selected_path', this.file_name)
        .click('#dlg_svn .close')
    },
    'property_create_project': function(browser) {
      var data = browser.globals;
      var url = 'http://devmngt.goorm.io/svn/goorm_core/trunk/public/modules';
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
        .click('[for=config_scm_type_svn]')
        .setValue('#scm_configuration_tab .scm_URL', url)
        .click('[for=prop_scm_revision_head]')
        .click('[for=config_scm_authorized_bt]')
        .setValue('#prop_scm_id', data.svn_id)
        .setValue('#prop_scm_pw', data.svn_pw)
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