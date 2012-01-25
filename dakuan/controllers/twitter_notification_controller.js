steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'jquery/lang/observe')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.TwitterNotification',{
	
	defaults: {

	}
},
{
	init : function(){
		
		this.options.quedTweets.bind('change', this.callback('onQuedTweetSet'));
	},
	
	onQuedTweetSet: function( ev, attr, how, newVal, oldVal ){
		
		if(attr = 'quedTweets'){
		
			steal.dev.log('there are ' + newVal + ' new tweets');
		}
	}	
})
})