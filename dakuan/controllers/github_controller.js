steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.Repo',
{
	init : function(){
		
		this.element.html(this.view(Dakuan.Models.Repo.findAll()));
	}
})
})