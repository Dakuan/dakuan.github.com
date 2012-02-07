/*
 * @page index Dakuan
 * @tag home
 *
 * ###Dakuan's home page on github
 *  
 */

steal(
	'steal/less',
	'./models/models.js',
	'./controllers/controllers.js',
	'./classes/classes.js'
)
.then('./dakuan.less','./lib/qtip/qtip.js' , function(){
		
	$(document).ready(function(){
		
		$('body').dakuan_shell();
	});
});