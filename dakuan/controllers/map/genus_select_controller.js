steal( 'jquery/controller',
    'jquery/view/ejs',
    'jquery/dom/form_params',
    'jquery/controller/view')
    .then(function($){
        $.Controller('Dakuan.Controllers.Map.GenusSelect',
            {
				init : function(){
					
					steal.dev.log('genus select');
					
					var deferred = Dakuan.Map.Models.Genus.findAll();
					
					this.element.html(this.view('//dakuan/views/map/options', deferred)); 				         	
				}
            })
})