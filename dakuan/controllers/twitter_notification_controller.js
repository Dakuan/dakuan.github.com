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
		
		this.element.html(this.view('twitter/notification'));
		
		this.options.quedTweets.bind('change', this.callback('onQuedTweetSet'));
	},
	
	onQuedTweetSet: function( ev, attr, how, newVal, oldVal ){
		
		if(attr = 'quedTweets'){
			
			this.element.html('there are ' + newVal + ' new tweets');
		}
	},
	
	'#twitterNotification click' : function(){
		
		this.element.trigger('requestRefresh');
	}	
})
})