/*
 * @page index Dakuan
 * @tag home
 *
 * ###Dakuan's home page on github
 *  
 */

steal('steal/less', './models/models.js', './controllers/controllers.js', './classes/classes.js', '../jquery/dom/route/route.js', './map/mapsteal.js' 

).then('./stylesheets/dakuan.less', './lib/qtip/qtip.js', 'jquery/ui', './lib/tinyscrollbar/tinyscrollbar.js', function() {
	$(document).ready(function() {

		$('body').dakuan_shell();
	});
});