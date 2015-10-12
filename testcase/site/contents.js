module.exports = {
	'open_site' : function (browser) {
		var data = browser.globals;
	    browser
			.maximizeWindow()
			.url('http://qa.goorm.io')
			.waitForElementVisible('input.login-form', 2000)
	},
	'check_main_content' : function (browser) {
		browser
			.waitForElementPresent('#insidepagenav', 2000)
			.waitForElementPresent('#insidepagenav li:first-child',1000)
			.assert.attributeContains('#insidepagenav li:nth-child(1) a', 'href', '#service')
			.assert.attributeContains('#insidepagenav li:nth-child(2) a', 'href', '#ideservice')
			.assert.attributeContains('#insidepagenav li:nth-child(3) a', 'href', '#eduservice')
			.assert.attributeContains('#insidepagenav li:nth-child(4) a', 'href', 'http://help.goorm.io/')
			.assert.attributeContains('#insidepagenav li:nth-child(5) a', 'href', '#contact')
			.click('#insidepagenav li:nth-child(1) a')
			
			.waitForElementVisible('#modals', 1000)

			.waitForElementVisible('#service', 1000)
			.waitForElementVisible('#browsersupport', 1000)
			.waitForElementVisible('#screenshot', 1000)

			.click('#insidepagenav li:nth-child(2) a')
			.waitForElementVisible('#ideservice', 1000)
			.click('#insidepagenav li:nth-child(3) a')
			.waitForElementVisible('#eduservice', 1000)
			.waitForElementVisible('#testimonial', 1000)
			.click('#insidepagenav li:nth-child(5) a')
			.waitForElementVisible('#contact', 1000)
			.waitForElementVisible('#footer', 1000)
	},
	'move_to_help_page' : function (browser) {
		
		browser
			.getAttribute('#insidepagenav li:nth-child(4) a', 'href', function (link) {
				newWindowUrl = link.value;
			})
			.click('#insidepagenav li:nth-child(4) a')

			//windowhandles 로 현재 열려있는 창중 [1]번째(새로 생긴) 창을 확인한 후 이동한다.
			.windowHandles(function(result) {
				var newWindow;
				this.verify.equal(result.value.length, 2, 'There should be 2 windows open');
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.verify.urlContains(newWindowUrl);
			})
			.waitForElementVisible('.help_contents', 2000)
	},
	'check_help_contents' : function(browser){
		for(var menuNum = 1; menuNum<= 3; ++menuNum){
			browser
				.waitForElementVisible('ul#insidepagenav li:nth-child('+menuNum+').active', 1000)
				.waitForElementVisible('.nav.nav-pills.nav-stacked.affix', 1000)		
			if(menuNum === 1){
				max = 8;
			}else if(menuNum === 2){
				max = 3;
			}else{
				max = 15;
			}
			for(var i = 1; i <= max; ++i){ 
				// function(){
				browser
					.waitForElementVisible('.nav.nav-pills.nav-stacked.affix > li:nth-child('+i+').active', 1000)
					.pause(100)
					.click((function(menuNum, i){
						if(i< (menuNum===1?8:menuNum===2?3:15)){
							return '.nav.nav-pills.nav-stacked.affix > li:nth-child('+(i+1)+') > a';
						}else{
							return '.nav.nav-pills.nav-stacked.affix > a';
						}
					})(menuNum, i))
					.waitForElementNotPresent('.nav.nav-pills.nav-stacked.affix > li:nth-child('+i+').active', 1000)
					.waitForElementVisible( (function(menuNum, i){
						if(menuNum === 1){
							switch(i){
								case 1:
									return '#help_intro';
								case 2:
									return '#help_signup';
								case 3:
									return '#help_login';
								case 4:
									return '#help_my_setting';
								case 5:
									return '#help_main_page';
								case 6:
									return '#help_new_project';
								case 7:
									return '#help_do_project_build';
								case 8:
									return '#help_run'
							}
						}else if(menuNum === 2){
							switch(i){
								case 1:
									return '#help_intro';
								case 2:
									return '#help_educator';
								case 3:
									return '#help_user';
							}
						}else{
							//일단 이렇게 해둠
							return 'body';
						}
					})(menuNum, i), 1000)
							
			}
			// after inner loop
			browser
				.click((function(){
					if(menuNum < 3){
						return 'ul#insidepagenav li:nth-child('+(menuNum+1)+')';
					}else{
						return'ul#insidepagenav li:nth-child('+1+')';
					}
				})(menuNum))
				.waitForElementNotPresent('ul#insidepagenav li:nth-child('+menuNum+').active', 1000)
		}
		browser.end();
	}
}
