steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view')
	.then(function($){
$.Controller('Dakuan.Controllers.Menu',
{
	defaults : {
		time : 300,
		easing: 'easeInOutSine',
		collapsed: false
  	}
},
/** @Prototype */
{
	init : function(){
		this.element.html(this.view());
	},
		
	fadeOutDeselected: function(index, element){
		
		var self = this;
		
		$(element).fadeOut(self.time, self.options.easing, function(){
			
			$(element).parent().addClass('deselected', self.options.time, self.options.easing, function(){
				
				$(element).parent().fadeOut(self.options.time, self.options.easing, function(){
					
					if($('#menu div:visible').length === 1){
						
						$('.selected').addClass('stage2', self.options.time, self.options.easing, function(){
							self.options.collapsed = true;
						});	
					}
				});
			});
		});
	},
	
	switchTo: function(){
		
		var self = this;
		
		var menuElements = $('#menu div');
		
		if(!this.small){
								
			menuElements.not('.selected').children('h2').each(this.callback('fadeOutDeselected'));
		}
		else{
			menuElements.not('.selected').children().fadeIn();
			menuElements.removeClass('selected').removeClass('deselected').removeClass('stage2');
			menuElements.fadeIn();
			self.options.collapsed=false;
		}			
	},
	
	'#menu div click': function(el, ev){
		
		el.addClass('selected', this.options.time, this.options.easing, this.callback('switchTo'));
	}
})
})