steal('jquery/controller', 'jquery/view/ejs', 'jquery/dom/form_params', 'jquery/controller/view').then('jquery/ui', function( $ ) {
	$.Controller('Dakuan.Controllers.Github', {
		init: function() {

			var deferred = Dakuan.Models.Repo.findAll();

			this.element.html('//dakuan/views/github/repos', Dakuan.Models.Repo.findAll(), function() {
				$('#repoContainer').tinyscrollbar();
			});
		}
	})
})