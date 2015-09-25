exports.command = function(file_name) {
	file_name = file_name.split('/');
	this
		.click('#main_file_toolbar [action=save_file]')
		.pause(2000)
	return this;
};