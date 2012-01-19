steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.Home',
{
	init : function(){
		
		this.element.html(this.view());
		
		$('#menu').dakuan_menu();
		
		$('#detailContainer').dakuan_detail();
	},
	
	'#menu requestDetail': function(el, ev, args){
		
		switch(args){
			case 'mobile':
			$('#detailContainer').controller().showMobile();
			break;
		}
	}
})
})