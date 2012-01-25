steal(
	'steal/less',
	'./models/models.js',
	'./controllers/controllers.js')
.then( './dakuan.less', function(){
	$(document).ready(function(){
		$('body').dakuan_shell();
	});
});