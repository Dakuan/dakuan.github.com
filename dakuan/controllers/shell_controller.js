steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view')
	.then(function($){
$.Controller('Dakuan.Controllers.Shell',
/** @Prototype */
{
	init : function(){
		this.showHomeScreen();
	},
	showHomeScreen : function(){
		$('#content').dakuan_home();
	}
})
})