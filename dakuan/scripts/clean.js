//steal/js dakuan/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/clean',function(){
	steal.clean('dakuan/dakuan.html',{indent_size: 1, indent_char: '\t'});
});
