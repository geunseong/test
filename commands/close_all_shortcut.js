exports.command = function(file_name) {
	this
		.keys(this.Keys.ALT)
		.keys(this.Keys.SHIFT)
		.keys('x')
		.pause(1000)
		.keys(this.Keys.NULL)
		.pause(1000)
	return this;
};