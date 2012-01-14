steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view')
	.then(function($){
$.Controller('Dakuan.Controllers.Home',
/** @Prototype */
{
	init : function(){
		this.element.html($.View('./dakuan/views/home/init.ejs'));
	}
})
})