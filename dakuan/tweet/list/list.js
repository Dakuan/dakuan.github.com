steal( 'jquery/controller',
	   'jquery/view/ejs',
	   'jquery/controller/view',
	   'dakuan/models' )
.then( './views/init.ejs', 
       './views/tweet.ejs', 
       function($){

/**
 * @class Dakuan.Tweet.List
 * @parent index
 * @inherits jQuery.Controller
 * Lists tweets and lets you destroy them.
 */
$.Controller('Dakuan.Tweet.List',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html(this.view('init',Dakuan.Models.Tweet.findAll()) )
	},
	'.destroy click': function( el ){
		if(confirm("Are you sure you want to destroy?")){
			el.closest('.tweet').model().destroy();
		}
	},
	"{Dakuan.Models.Tweet} destroyed" : function(Tweet, ev, tweet) {
		tweet.elements(this.element).remove();
	},
	"{Dakuan.Models.Tweet} created" : function(Tweet, ev, tweet){
		this.element.append(this.view('init', [tweet]))
	},
	"{Dakuan.Models.Tweet} updated" : function(Tweet, ev, tweet){
		tweet.elements(this.element)
		      .html(this.view('tweet', tweet) );
	}
});

});