exports.command = function(project_name) {
    this
        .open_new_project_dialog()
        .click('.project_wizard_second_button:first-child')
        .click('#g_np_btn_next')
        .waitForElementVisible('.next_wizard_step', 2000)
        .setValue('#input_project_name', project_name)
        .click('#g_np_btn_ok_template')
        .waitForElementNotVisible('#dlg_new_project', 10000)
        .waitForElementNotVisible('#dlg_loading_bar', 10000, false)
        .verify.containsText('#selected_project_name', project_name)
        .pause(2000)
        .waitForElementNotVisible('#dlg_loading_bar', 10000000)

    return this;
};