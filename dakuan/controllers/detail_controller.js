steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'jquery/lang/observe')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.Detail',
{
	init : function(){
		
		var self = this;
		
		$.route.delegate('detail', 'set', this.callback('onRouteDetailSet'));
	},
	
	onRouteDetailSet: function(ev, newVal){
			
		if(newVal){
			this.show(newVal, true);
		}
	},
	
	show : function(section, animate){
		
		this.element.children().remove();
		
		this.element.html(this.view('home/' + section));
		
		switch(section){
			
			case 'about':
			
				$('#twitterContainer').dakuan_twitter();
				
				break;
				
			case 'git':
				
				$('#repoContainer').dakuan_github();
			default:
				
				//this.element.html(this.view('home/' + section));
		}
				
		if(animate == true){
			
			this.element.show('bounce', this.callback('onShowComplete'));
		}
		else{
			
			this.element.show();
			
			this.onShowComplete();
		}
	},
	
	onShowComplete: function(){
		
		$.route.attr('animate', false);
				
		this.element.filter('.scrollContainer').tinyscrollbar();
	},
	
	hide: function(){

		this.element.slideUp(2000, function(){
			
			$.route.removeAttr('detail');
			
			$.route.removeAttr('animate');
			
			$(document).trigger('detailHidden');
		});
	},
	
	'{document} hideDetail' : function(el, ev){
		
		this.hide();
	},
	
	'{document} requestDetail': function(el, ev, args){
		
		this.show(args, $.route.attr('animate'));
	}
})
})