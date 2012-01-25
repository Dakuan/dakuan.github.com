steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.Home',
{
	init : function(){
		
		this.element.html(this.view());
		
		$('#menu').dakuan_menu(this.getBrowserHash());
		
		$('#detailContainer').dakuan_detail();
	},
	
	getBrowserHash: function(){
		return hash = window.location.hash.substr(2);
	}
})
})