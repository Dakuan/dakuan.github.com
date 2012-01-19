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
	
	'.square, .square > h2 mouseover' : function(el, ev){
				
		this.addRemoveHover(el, false);
	},
	
	'.square, .square > h2 mouseout' : function(el, ev){
			
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
						self.element.trigger('requestDetail', 'mobile');
					});	
				}
			});
		});
	},
	
	switchTo: function(){
		
		var self = this;
		
		var menuElements = $('#menu div');
		
		if(!this.options.collapsed){
								
			menuElements.not('.selected').each(this.callback('fadeOutDeselected'));
		}
		else{
			menuElements.not('.selected').children().fadeIn();
			menuElements.removeClass('selected').removeClass('deselected').removeClass('stage2');
			menuElements.fadeIn();
			self.options.collapsed=false;
		}			
	},
	
	'#menu div click': function(el, ev){
		
		if($('#menu div').index(el) > 0){
			
			var before = $('#menu div')[0];
		
			el.insertBefore(before);
		}

		el.addClass('selected', this.options.time, this.options.easing, this.callback('switchTo'));
	}
})
})