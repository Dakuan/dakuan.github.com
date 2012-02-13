steal( 'jquery/controller',
    'jquery/view/ejs',
    'jquery/dom/form_params',
    'jquery/controller/view',
    'jquery/lang/observe')
    .then('jquery/ui',function($){
        $.Controller('Dakuan.Controllers.Job',
            {
                init : function(){
                    this.element.html('//dakuan/views/job/init', {});
                },
                
                '.jobCell click': function(el){
					
                    if(el.children('.expanded').length > 0){
                        $('.expanded', el).slideUp(500, function(){
                            $('.expanded').removeClass('expanded');
                        });
                    }
                    else{

                        $('.expanded').slideUp(500, function(){
                            $('.expanded').removeClass('expanded');
                        });

                        $('.jobContent', el).slideToggle(500, function(){
                            $('.jobContent', el).addClass('expanded');
                        });
                	}
                }
            })
    })