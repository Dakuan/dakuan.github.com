steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view')
	.then(function($){
$.Controller('Dakuan.Controllers.Shell',
/** @Prototype */
{
	init : function(){
		
		this.element.prepend(this.view());
		
		this.showHomeScreen();
	},
	
	showHomeScreen : function(){
		
		$('#content').dakuan_home();
	},

	'.helpButton click': function(){
		
		$('.qtip').each(function(){
		   $(this).qtip('show');
		});
	}
})
})