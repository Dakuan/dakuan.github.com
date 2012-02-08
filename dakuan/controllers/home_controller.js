steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.Home',
{
	init : function(){
		
		this.element.html(this.view());
		
		$('#detailContainer').dakuan_detail();
		
		$('#menu').dakuan_menu($.route.attr('detail'));	
	}
})
})