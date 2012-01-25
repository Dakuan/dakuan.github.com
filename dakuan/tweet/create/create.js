steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'dakuan/models' )
	.then('./views/init.ejs', function($){

/**
 * @class Dakuan.Tweet.Create
 * @parent index
 * @inherits jQuery.Controller
 * Creates tweets
 */
$.Controller('Dakuan.Tweet.Create',
/** @Prototype */
{
	init : function(){
		this.element.html(this.view());
	},
	submit : function(el, ev){
		ev.preventDefault();
		this.element.find('[type=submit]').val('Creating...')
		new Dakuan.Models.Tweet(el.formParams()).save(this.callback('saved'));
	},
	saved : function(){
		this.element.find('[type=submit]').val('Create');
		this.element[0].reset()
	}
})

});