module.exports = {
    'goorm_login': function(browser) {
        var data = browser.globals;
        browser
            .run_ide(data.username, data.password, data.plugin)
            .pause(1000)
    },
    'open_project_dialog': function(browser) {
  		browser
  			.pause(1000)
  			.click('#main-menu-file > a')
  			.waitForElementPresent('#main-menu-file.open', 1000)
  			.click('#main-menu-file a[action=open_project]')
  			.waitForElementVisible('#dlg_open_project', 2000)
  			.click('#project_open_list .selector_project:last-of-type')
  			.click('#g_op_btn_ok')
  			.pause(1000)
  			.check_confirm_plugin('yes')
  			.waitForElementNotVisible('#dlg_open_project', 2000)
  			// .waitForElementVisible('#dlg_loading_bar', 2000)
  			.waitForElementNotVisible('#dlg_loading_bar', 10000)
  			.verify.visible('#project_treeview')
  	},
    'open_project_table': function(browser) {
  		browser
  			.click('#project_selectbox')
  			.waitForElementPresent('#project_selector > div.btn-group.open', 1000)
  			.click('#back_to_project_table > a')
  			.waitForElementNotVisible('#project_treeview', 3000)
  			.waitForElementVisible('#project_list_jquery_table', 3000)
  			.click('#project_list_jquery_table tr:first-of-type td:first-of-type')
  			.waitForElementNotVisible('#dlg_loading_bar', 10000)
  			.waitForElementVisible('#project_treeview', 10000)
  			.verify.visible('#project_treeview')
  	},
    'open_editor_dialog': function(browser) {
      browser
        .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'x'])
        .keys(browser.Keys.NULL)
        .click('#main-menu-file > a')
        .waitForElementPresent('#main-menu-file.open', 1000)
        .click('#main-menu-file a[action="open_file"]')
        .waitForElementVisible('#dlg_open_file', 2000)
        .click('#dlg_open_file #file_open_files div[filename="src"]')
        .keys(browser.Keys.ENTER)
        .keys(browser.Keys.NULL)
        .pause(500)
        .click('#dlg_open_file #file_open_files > div[filename="main.c"]')
        .keys(browser.Keys.ENTER)
        .keys(browser.Keys.NULL)
        .pause(500)
        .waitForElementNotVisible('#dlg_open_file', 2000)
        .waitForElementNotVisible('#dlg_loading_bar', 2000)
        .verify.visible('.g_windows_tab_li .tab_title[filename="main.c"]')
        .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'x'])
        .keys(browser.Keys.NULL)
    },
    'open_editpr_treeview': function(browser) {
      browser.getAttribute('#project_treeview li[path$="src"]','aria-expanded', function(result) {
          if(result.value == 'false') {
            this.click('#project_treeview li[path*="src"] > i');
          }
      });
      browser
        .waitForElementVisible('#project_treeview li[path$="src"] li[path$="main.c"]', 3000)
        .moveToElement('#project_treeview li[path$="src"] li[path$="main.c"]',10,0,function() {
          this.doubleClick()
        })
        .waitForElementNotVisible('#dlg_loading_bar', 10000)
        .pause(1000)
        .verify.visible('.g_windows_tab_li .tab_title[filename="main.c"]')
    },
    'toggle_top': function(browser) {
        browser
            .pause(2000)
            .click('div.ui-layout-toggler-north')
            .pause(2000)
            .verify.hidden('#goorm_main_toolbar')
            .click('div.ui-layout-toggler-north')
            .pause(2000)
            .verify.hidden('#goorm_top')
            .click('div.ui-layout-toggler-north')
            .pause(2000)
            .verify.visible('#goorm-mainmenu')
            .verify.visible('#goorm_main_toolbar')
    },
    'show_more_toolbar': function(browser) {
        browser
            .isVisible('#main_debug_toolbar', function(result) {
                if (result.value == true) {
                    this
                        .resizeWindow(900, 700)
                        .pause(3000)
                        .verify.visible('#toolbar_more_button')
                        .resizeWindow(1500,1000)
                        .pause(3000)
                        .verify.hidden('#toolbar_more_button');
                }
            });
    },
    'window_perspectives_left': function(browser) {
        browser
            //Using menu
            .pause(1000)
            .verify.visible('#goorm_left')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="left_layout_toggle"]')
            .pause(2000)
            .verify.hidden('#goorm_left')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="left_layout_toggle"]')
            .pause(2000)
            .verify.visible('#goorm_left')
            //Using shortcut
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'l'])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .verify.hidden('#goorm_left')
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'l'])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .verify.visible('#goorm_left')
            //Using toggler
            .click('div.ui-layout-toggler-west')
            .pause(2000)
            .verify.hidden('#goorm_left')
            .click('div.ui-layout-toggler-west')
            .pause(2000)
            .verify.visible('#goorm_left')
    },
    'window_perspectives_right': function(browser) {
        browser
            .verify.visible('#goorm_inner_layout_right')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_layout_toggle"]')
            .pause(2000)
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_layout_toggle"]')
            .pause(2000)
            .verify.visible('#goorm_inner_layout_right')
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'r'])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .verify.hidden('#goorm_inner_layout_right')
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'r'])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .verify.visible('#goorm_inner_layout_right')
            //Using toggler
            .click('div.ui-layout-toggler-east')
            .pause(2000)
            .verify.hidden('#goorm_inner_layout_right')
            .click('div.ui-layout-toggler-east')
            .pause(2000)
            .verify.visible('#goorm_inner_layout_right')
    },
    'window_perspectives_bottom': function(browser) {
        browser
            .verify.visible('#goorm_inner_layout_bottom')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="bottom_layout_toggle"]')
            .pause(2000)
            .verify.hidden('#goorm_inner_layout_bottom')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="bottom_layout_toggle"]')
            .pause(2000)
            .verify.visible('#goorm_inner_layout_bottom')
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'b'])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .verify.hidden('#goorm_inner_layout_bottom')
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'b'])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .verify.visible('#goorm_inner_layout_bottom')
            //Using toggler
            .click('div.ui-layout-toggler-south')
            .pause(2000)
            .verify.hidden('#goorm_inner_layout_bottom')
            .click('div.ui-layout-toggler-south')
            .pause(2000)
            .verify.visible('#goorm_inner_layout_bottom')
    },
    'toggle_workspace': function(browser) {
        browser
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .click('#main-menu-window a[action="toggle_full_workspace"]')
            .pause(2000)
            .verify.hidden('#goorm_left')
            .verify.hidden('#goorm_inner_layout_right')
            .verify.hidden('#goorm_inner_layout_bottom')
            .keys([browser.Keys.ALT, browser.Keys.SHIFT, 'w'])
            .keys(browser.Keys.NULL)
            .pause(2000)
            .verify.visible('#goorm_left')
            .verify.visible('#goorm_inner_layout_right')
            .verify.visible('#goorm_inner_layout_bottom')
    },
    'show_collaboration': function(browser) {
        browser
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_chat_show"]')
            .pause(1000)
            .verify.hidden('#gLayoutTab_chat')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_chat_show"]')
            .pause(1000)
            .verify.visible('#gLayoutTab_chat')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_chat_show"]')
            .pause(1000)
            .keys([browser.Keys.ALT, '1'])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .verify.visible('#gLayoutTab_chat')
            .verify.visible('#chat');
    },
    'show_docs': function(browser) {
        browser
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_slideshare_show"]')
            .pause(1000)
            .verify.hidden('#gLayoutTab_document_viewer')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_slideshare_show"]')
            .pause(1000)
            .verify.visible('#gLayoutTab_document_viewer')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_slideshare_show"]')
            .pause(1000)
            .keys([browser.Keys.ALT, '2'])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .verify.visible('#gLayoutTab_document_viewer')
            .verify.visible('#document_viewer');
    },
    'show_history': function(browser) {
        browser
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_history_show"]')
            .pause(1000)
            .verify.hidden('#gLayoutTab_History')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_history_show"]')
            .pause(1000)
            .verify.visible('#gLayoutTab_History')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_history_show"]')
            .pause(1000)
            .keys([browser.Keys.ALT, '3'])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .verify.visible('#gLayoutTab_History')
            .verify.visible('#history');
    },
    'show_outline': function(browser) {
        browser
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .isVisible('#child_perspectives_menu a[action="right_outline_show"]', function(result) {
                if (result.value === true) {
                    this.click('#child_perspectives_menu a[action="right_outline_show"]')
                        .pause(1000)
                        .verify.hidden('#gLayoutTab_Outline')
                        .click('#main-menu-window > a')
                        .waitForElementPresent('#main-menu-window.open', 2000)
                        .moveToElement('#parent_perspectives_menu', 50, 10)
                        .waitForElementVisible('#child_perspectives_menu', 2000)
                        .click('#child_perspectives_menu a[action="right_outline_show"]')
                        .pause(1000)
                        .verify.visible('#gLayoutTab_Outline')
                        .click('#main-menu-window > a')
                        .waitForElementPresent('#main-menu-window.open', 2000)
                        .moveToElement('#parent_perspectives_menu', 50, 10)
                        .waitForElementVisible('#child_perspectives_menu', 2000)
                        .click('#child_perspectives_menu a[action="right_outline_show"]')
                        .keys([browser.Keys.ALT, '4'])
                        .keys(browser.Keys.NULL)
                        .pause(1000)
                        .verify.visible('#gLayoutTab_Outline')
                        .verify.visible('#outline');
                } else {
                    this.click('#main-menu-window > a')
                        .pause(1000);
                }
            });
    },
    'show_bookmark': function(browser) {
        browser
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_bookmark_show"]')
            .pause(1000)
            .verify.hidden('#gLayoutTab_Bookmark')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_bookmark_show"]')
            .pause(1000)
            .verify.visible('#gLayoutTab_Bookmark')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="right_bookmark_show"]')
            .pause(1000)
            .keys([browser.Keys.ALT, '5'])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .verify.visible('#gLayoutTab_Bookmark')
            .verify.visible('#bookmark');
    },
    'show_debug': function(browser) {
        browser
            .isVisible('#main_debug_toolbar', function(result) {
                if (result.value === true) {
                    this.click('#main-menu-window > a')
                        .waitForElementPresent('#main-menu-window.open', 2000)
                        .moveToElement('#parent_perspectives_menu', 50, 10)
                        .waitForElementVisible('#child_perspectives_menu', 2000)
                        .click('#child_perspectives_menu a[action="bottom_debug_show"]')
                        .pause(1000)
                        .verify.hidden('#gLayoutTab_Debug')
                        .click('#main-menu-window > a')
                        .waitForElementPresent('#main-menu-window.open', 2000)
                        .moveToElement('#parent_perspectives_menu', 50, 10)
                        .waitForElementVisible('#child_perspectives_menu', 2000)
                        .click('#child_perspectives_menu a[action="bottom_debug_show"]')
                        .pause(1000)
                        .verify.visible('#gLayoutTab_Debug')
                        .click('#main-menu-window > a')
                        .waitForElementPresent('#main-menu-window.open', 2000)
                        .moveToElement('#parent_perspectives_menu', 50, 10)
                        .waitForElementVisible('#child_perspectives_menu', 2000)
                        .click('#child_perspectives_menu a[action="bottom_debug_show"]')
                        .pause(1000)
                        .keys([browser.Keys.CONTROL, browser.Keys.SHIFT, '1'])
                        .keys(browser.Keys.NULL)
                        .pause(1000)
                        .verify.visible('#gLayoutTab_Debug')
                        .verify.visible('#debug_tab');
                }
            })
    },
    'show_terminal': function(browser) {
        browser
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="bottom_console_show"]')
            .pause(1000)
            .verify.hidden('#gLayoutTab_Terminal')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="bottom_console_show"]')
            .pause(1000)
            .verify.visible('#gLayoutTab_Terminal')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="bottom_console_show"]')
            .pause(1000)
            .keys([browser.Keys.CONTROL, browser.Keys.SHIFT, '2'])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .keys(['echo Test', browser.Keys.ENTER])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .expect.element('div#terminal > div:nth-child(2)').text.to.contain('Test');
        browser
            .keys(['clear', browser.Keys.ENTER])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .verify.visible('#gLayoutTab_Terminal')
            .verify.visible('#terminal');
    },
    'show_search': function(browser) {
        browser
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="bottom_search_show"]')
            .pause(1000)
            .verify.hidden('#gLayoutTab_Search')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="bottom_search_show"]')
            .pause(1000)
            .verify.visible('#gLayoutTab_Search')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action="bottom_search_show"]')
            .pause(1000)
            .keys([browser.Keys.CONTROL, browser.Keys.SHIFT, '3'])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .verify.visible('#gLayoutTab_Search')
            .verify.visible('#search_treeview');
    },
    'show_output': function(browser) {
        browser
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action^="toggle_bottom_gLayoutOutput"]')
            .pause(1000)
            .verify.hidden('a[id^="gLayoutOutput"]')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action^="toggle_bottom_gLayoutOutput"]')
            .pause(1000)
            .verify.visible('a[id^="gLayoutOutput"]')
            .click('#main-menu-window > a')
            .waitForElementPresent('#main-menu-window.open', 2000)
            .moveToElement('#parent_perspectives_menu', 50, 10)
            .waitForElementVisible('#child_perspectives_menu', 2000)
            .click('#child_perspectives_menu a[action^="toggle_bottom_gLayoutOutput"]')
            .pause(1000)
            .keys([browser.Keys.CONTROL, browser.Keys.SHIFT, '4'])
            .keys(browser.Keys.NULL)
            .pause(1000)
            .verify.visible('a[id^="gLayoutOutput"]')
            .verify.visible('div.output_tab');
    },
    'goorm_end': function(browser) {
        browser.end();
    }
}
