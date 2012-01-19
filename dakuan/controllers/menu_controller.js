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
	
	'.square mouseover' : function(el, ev){
				
		this.addRemoveHover(el, false);
	},
	
	'.square mouseout' : function(el, ev){
			
		this.addRemoveHover(el, true);
	},
	
	addRemoveHover: function(el, remove){
		
		var element = $(el);
		
		if(remove){
			
			element.is('h2') ? element.parent().removeClass('hover', this.options.time) : element.removeClass('hover', this.options.time);
		}
		else{
			
			element.is('h2') ? element.parent().addClass('hover', this.options.time) : element.addClass('hover', this.options.time);
		}
	},
		
	fadeOutDeselected: function(index, element){
		
		var self = this;
				
		$(element).addClass('deselected', self.options.time, self.options.easing, function(){
			
			$(element).fadeOut(self.options.time, self.options.easing, function(){
				
				if($('#menu div:visible').length === 1){
					
					$('.selected').addClass('stage2', self.options.time, self.options.easing, function(){
						
						self.options.collapsed = true;
						
						$(document).trigger('requestDetail', 'mobile');
					});	
				}
			});
		});
	},
	
	switchTo: function(){
				
		if(!this.options.collapsed){
								
			$('#menu div').not('.selected').each(this.callback('fadeOutDeselected'));
		}
		else{
			$(document).trigger('hideDetail');
		}			
	},
	
	'{document} detailHidden' : function(el, ev){
		
		var self = this;
		
		var menuElements = $('#menu div');
		
		menuElements.not('.selected').children().fadeIn();
		
		menuElements.removeClass('selected').removeClass('deselected').removeClass('stage2');
		
		menuElements.fadeIn(function(){
			
			self.options.collapsed=false;
		});
	},
	
	'#menu div click': function(el, ev){
		
		if($('#menu div').index(el) > 0 && this.options.collapse === false){
			
			var before = $('#menu div')[0];
		
			el.insertBefore(before);
		}

		el.addClass('selected', this.options.time, this.options.easing, this.callback('switchTo'));
	}
})
})