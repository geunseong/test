var fs = require('fs');
var data;
var difference;
console.log();

var change_difference = function (template_name, difference) {
	var data = fs.readFileSync(__dirname + '/templates/' + template_name, 'utf8');
	if(!fs.existsSync(__dirname + '/../testcase/plugins/')) {
		fs.mkdirSync(__dirname + '/../testcase/plugins/')
	}
	for (var plugin in difference) {
		var template = data;
		for (var replacement in difference[plugin]) {
			difference[plugin][replacement] = difference[plugin][replacement].replace(/\n/g, '\\n');
			template = template.replace(replacement.toUpperCase(), difference[plugin][replacement]);
		}
		plugin = plugin.split('.');
		if(!fs.existsSync(__dirname + '/../testcase/plugins/' + plugin[0])) {
			fs.mkdirSync(__dirname + '/../testcase/plugins/' + plugin[0])
		}
		fs.writeFileSync(__dirname + '/../testcase/plugins/' + plugin[0] + '/' + plugin[1] + '.' + template_name, template)
	}
}

//server run file
difference = {
	'jsp.jsp' : {
		tab_name : 'jsp_default',
		console_msg : 'done',
		server_msg : 'message = Hello World'
	},
	'nodejs.express' : {
		tab_name : 'nodejs',
		console_msg : 'Express server listening',
		server_msg : 'Welcome to Express'
	},
	'php.default' : {
		tab_name : 'php',
		console_msg : 'service apache2 start',
		server_msg : 'Hello Goorm'
	},
	'ruby.rubyonrails' : {
		tab_name : 'ruby_rubyonrails',
		console_msg : 'HTTPServer#start',
		server_msg : 'You’re riding Ruby on Rails!'
	},
	'python.django' : {
		tab_name : 'python_django',
		console_msg : 'Starting development server',
		server_msg : 'It worked!'
	}
}
change_difference('server_run.js', difference);

//build file
difference = {
	'cpp.c' : {
		check_list : '"main", "source_path", "build_path"'
	},
	'java.java_console' : {
		check_list : '"main", "source_path", "build_path"'
	},
	'jsp.jsp' : {
		check_list : '"index", "source_path", "build_path"'
	}
}
change_difference('build.js', difference);

//console run file
difference = {
	'cpp.c' : {
		default_msg : 'Hello, goorm!',
		context  : 
			'#include <stdio.h>\n\nint main(){' +
			' printf("PRINT_MSG");' +
			'}'
	},
	'java.java_console' : {
		default_msg : 'Hello goorm!',
		context  : 
			'package project;\n\npublic class main {\n' +
			  'public static void main(String[] args) {\n' +
				'System.out.println("PRINT_MSG");\n' +
			  '}\n' +
			'}'
	},
	'nodejs.default' : {
		default_msg : 'Hello Goorm!',
		context  : 
			'function main(){' +
				' console.log("PRINT_MSG");' +
			'}' +
			'main();'
	},
	'python.default' : {
		default_msg : 'Hello Python',
		context  : 
			'print "PRINT_MSG"'
	},
	'ruby.ruby' : {
		default_msg : 'Hello World!',
		context  :
			'puts "PRINT_MSG"'
	}
}
change_difference('console_run.js', difference);

//input test
difference = {
	'cpp.c' : {
		default_msg : 'Hello, goorm!',
		context  : 
			'#include<stdio.h>\n\n' +
			'int main(void){' +
			'	int a;' +
			'	 while(1) {' +
			'		 scanf("%d", &a);' +
			'		 printf("%d\\\n", a + 12345);' +
			'	 }' +
			'   return 0;' +
			'}'
	},
	'java.java_console' : {
		default_msg : 'Hello goorm!',
		context  : 
		  'package project;\nimport java.util.Scanner;\npublic class main {\n' +
		  'public static void main(String[] args) {\n' +
			'	Scanner scan=new Scanner(System.in);int a;' +
			'	 while(true) {' +
			'		 a=scan.nextInt();' +
			'		 System.out.println(a + 12345);' +
			'	 }' +
			'}}'
	}
}
change_difference('input_test.js', difference);

//lint
difference = {
	'cpp.c' : {
		file_name : 'main.c',
		nth : '2',
		type : 'warning',
		error_msg : 'integer without a cast',
		context : 
		  '#include <stdio.h>\n\n' +
		  'int main(int argc, char* argv[]) {\n' +
		  'printf("a");\n' +
		  'scanf(1);\n' +
		  'return 0;\n' +
		  '}\n'
	},
	'nodejs.default' : {
		file_name : 'main.js',
		nth : '2',
		type : 'error',
		error_msg : 'Expected',
		context : 
		  'function test(){\n' +
		  '  consolee.log(1);\n' +
		  '};\n' +
		  'fu!nction test(){\n' +
		  '  consolee.log(1);\n' +
		  '};\n' +
		  'a.id = null;'
	},
	'python.default' : {
		file_name : 'index.py',
		nth : '1',
		type : 'error',
		error_msg : 'invalid syntax',
		context : 
		  'print "asdfsdf"\n' +
		  'print "Hello python"assdsfsdfsd\n' +
		  'print "tototo"'
	},
	'ruby.ruby' : {
		file_name : 'index.rb',
		nth : '2',
		type : 'error',
		error_msg : 'undefined method',
		context : 
		  '\nsdfgsdf\n' +
		  'a=6\n' +
		  'puts "Hello World!"\n'
	}
}
change_difference('lint.js', difference);