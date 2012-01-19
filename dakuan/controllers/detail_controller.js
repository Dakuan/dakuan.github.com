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
		
		switch(args){
			case 'mobile':
			this.showMobile();
			break;
		}
	}
})
})