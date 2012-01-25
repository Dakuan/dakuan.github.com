steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'jquery/lang/observe')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.Detail',
{
	init : function(){
	},
	
	show : function(section){
		
		this.element.children().remove();
		
		this.element.html(this.view('home/' + section));
		
		switch(section){
			
			case 'about':
			
				$('#twitterContainer').dakuan_twitter();
				
				break;
				
			default:
				
				//this.element.html(this.view('home/' + section));
		}
		
		this.element.show('bounce');
	},
	
	hide: function(){
		
		this.element.slideUp(2000, function(){
			
			$(document).trigger('detailHidden');
		});
	},
	
	'{document} hideDetail' : function(el, ev){
		
		this.hide();
	},
	
	'{document} requestDetail': function(el, ev, args){
		
		this.show(args);
	}
})
})