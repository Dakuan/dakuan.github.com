steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.Home',
/** @Prototype */
{
	init : function(){
		
		this.element.html($.View('./dakuan/views/home/init.ejs'));
		
		this.small=false;
		
		this.time = 300;
		
		this.easing = 'easeInOutSine'
	},
	
	fadeOutDeselected: function(index, element){
		
		var self = this;
		
		$(element).fadeOut(self.time, self.easing, function(){
			
			$(element).parent().addClass('deselected', self.time, self.easing, function(){
				
				$(element).parent().fadeOut(self.time, self.easing, function(){
					
					if($('#menu div:visible').length === 1){
						
						$('.selected').addClass('stage2', self.time, self.easing, function(){
							self.small = true;
						});	
					}
				});
			});
		});
	},
	
	switchTo: function(){
		
		var self= this;
		
		var menuElements = $('#menu div');
		
		if(!this.small){
								
			menuElements.not('.selected').children('h2').each(this.callback('fadeOutDeselected'));
		}
		else{
			menuElements.not('.selected').children().fadeIn();
			menuElements.removeClass('selected').removeClass('deselected').removeClass('stage2');
			menuElements.fadeIn();
			self.small=false;
		}			
	},
	
	'#menu div click': function(el, ev){
		
		el.addClass('selected', this.time, this.easing, this.callback('switchTo'));
	}
})
})