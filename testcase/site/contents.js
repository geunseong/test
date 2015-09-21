module.exports = {
	'open_site' : function (browser) {
		var data = browser.globals;
    	browser.open_site();
	},
	'check_content' : function (browser) {
		browser
			.waitForElementPresent('#insidepagenav', 2000)
			.waitForElementPresent('#insidepagenav li:first-child',1000)
			.assert.attributeContains('#insidepagenav li:nth-child(1) a', 'href', '#service')
			.assert.attributeContains('#insidepagenav li:nth-child(2) a', 'href', '#ideservice')
			.assert.attributeContains('#insidepagenav li:nth-child(3) a', 'href', '#eduservice')
			.assert.attributeContains('#insidepagenav li:nth-child(4) a', 'href', '#opensource')
			.assert.attributeContains('#insidepagenav li:nth-child(5) a', 'href', 'http://help.goorm.io/')
			.assert.attributeContains('#insidepagenav li:nth-child(6) a', 'href', '#contact')
			.click('#insidepagenav li:nth-child(1) a')
			.pause(1000)
			.verify.visible('#service')
			.click('#insidepagenav li:nth-child(2) a')
			.pause(1000)
			.verify.visible('#browsersupport')
			.click('#insidepagenav li:nth-child(3) a')
			.pause(1000)
			.verify.visible()
			.click('#insidepagenav li:nth-child(4) a')
			.pause(1000)
			.verify.visible()
			// .click('#insidepagenav li:nth-child(5) a')
			// .pause(1000)
			.click('#insidepagenav li:nth-child(6) a')
			.pause(1000)
			.verify.visible()

	}
}
