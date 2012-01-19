steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.Detail',
{
	init : function(){
	},
	
	showMobile : function(){
		this.element.html(this.view('home/mobile'));
		this.element.fadeIn();
	}
})
})