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
	},
	'#menu div click': function(el, ev){
		
		el.addClass('selected');
		
		var self= this;
		
		var menuElements = $('#menu div');
		
		if(!this.small){
			
			self.small = true;
			
			var time = 500;
			
			menuElements.not('.selected').children('h2').each(function(index, element){
				$(element).fadeOut(function(){
					$(element).parent().addClass('deselected', time, function(){
						$(element).parent().fadeOut(function(){
							if($('#menu div:visible').length === 1){
								$('.selected').addClass('stage2', time);	
							}
						});
					});
				});
			});
		}
		else{
			menuElements.not('.selected').children().fadeIn();
			menuElements.removeClass('selected').removeClass('deselected').removeClass('stage2');
			menuElements.fadeIn();
			self.small=false;
		}			
	}
})
})