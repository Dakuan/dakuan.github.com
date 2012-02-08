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
	init : function(el, selectedTile){
			
		this.options.view = this.view();
		
		this.show(selectedTile);
	},
	
	clear : function(){
		
		this.options.selectedTile = "";
		
		this.element.children().remove();
		
		this.element.hide();
	},
	
	show : function(selectedTile){
		
		this.clear();
			
		this.element.html(this.options.view);
		
		if($.route.attr('animate') !== 'false'){
							
			if(selectedTile != ""){
				
				$('.' + selectedTile).click();
				
				this.element.show();
				
				this.onShown();	
			}
			else{
				
				this.element.show('scale', 1000, this.callback('onShown'));			
			}
		}
		else{
			
			this.options.selectedTile = selectedTile;
			
			$('.' + selectedTile).addClass('selected').addClass('stage2');
			
			$('#menu div').not('.selected').hide();
			
			this.element.show();
			
			$(document).trigger('requestDetail', this.options.selectedTile)
		}
	},
	
	onShown:function(){
		
		this.options.collapsed = false;	
			
		$(document).trigger('menuShown');
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
				
						$('.stage2').qtip(Dakuan.QtipFactory.buildHelperTip('Click this to return to the menu.', {
						   		my: 'bottom left',
						   		at: 'top center'
						   	}));
						
						self.options.collapsed = true;
						
						if($.route.attr('detail') != self.options.selectedTile){
							
							$.route.attr('detail', self.options.selectedTile);
						}
						else{
							$(document).trigger('requestDetail', self.options.selectedTile)
						}
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
		
		// qtip could leak, best not give it the chance
		$('.stage2').qtip('destroy');
				
		var menuElements = $('#menu div');
		
		menuElements.removeClass('selected').removeClass('deselected').removeClass('stage2');
				
		this.show();
	},
	
	'#menu div click': function(el, ev){
		
		this.options.selectedTile = el.attr('class').split(' ')[1];
		
		if($('#menu div').index(el) > 0 && this.options.collapsed === false){
			
			var before = $('#menu div')[0];
		
			el.insertBefore(before);
		}
		
		el.addClass('selected', this.options.time, this.options.easing, this.callback('switchTo'));
	}
})
})