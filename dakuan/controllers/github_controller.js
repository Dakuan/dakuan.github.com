steal('jquery/controller', 'jquery/view/ejs', 'jquery/dom/form_params', 'jquery/controller/view').then('jquery/ui', function( $ ) {
	$.Controller('Dakuan.Controllers.Github', {
		init: function() {
			
			this.element.html('//dakuan/views/github/repos', Dakuan.Models.Repo.findAll(), function() {
				
				$('.spinContainer').fadeOut(300, function(){
								
					$('#repoContainer').fadeIn(300, function(){
						
						$('#repoContainer').tinyscrollbar();
					});
				});
			});
		}
	})
})