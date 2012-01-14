//steal/js dakuan/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('dakuan/scripts/build.html',{to: 'dakuan'});
});
