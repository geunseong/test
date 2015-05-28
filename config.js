module.exports = {
  src_folders : ["testcase"],
  output_folder : "reports",
  custom_commands_path : "commands",
  custom_assertions_path : "",
  page_objects_path : "",
  globals_path : "",

  selenium : {
    start_process : true,
    server_path : "./lib/selenium-server-standalone-2.45.0.jar",
    log_path : false,
    host : "127.0.0.1",
    port : 4444,
    cli_args : {
      "webdriver.chrome.driver" : "./lib/chromedriver",
      "webdriver.ie.driver" : ""
    }
  },

  test_settings : {
    default : {
      launch_url : "http://qa.goorm.io",
      selenium_port  : 4444,
      selenium_host  : "localhost",
      silent: true,
      screenshots : {
        enabled : false,
        path : ""
      },
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        acceptSslCerts: true
      },
      globals : require('./data/account')
    },

    firefox : {
      desiredCapabilities: {
        browserName: "firefox",
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
