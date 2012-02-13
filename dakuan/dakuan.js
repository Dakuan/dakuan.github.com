/*
 * @page index Dakuan
 * @tag home
 *
 * ###Dakuan's home page on github
 *  
 */

steal('steal/less', './models/models.js', './controllers/controllers.js', './classes/classes.js', '../jquery/dom/route/route.js'

).then('./dakuan.less', './lib/qtip/qtip.js', 'jquery/ui', './lib/tinyscrollbar/tinyscrollbar.js', function() {
	$.easing.custom = function( x, t, b, c, d ) {
		var s = 1.70158;
		if ((t /= d / 2) < 1 ) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	}
	$(document).ready(function() {

		$('body').dakuan_shell();
	});
});