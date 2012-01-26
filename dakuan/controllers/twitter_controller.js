steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'jquery/lang/observe')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.Twitter',{
	
	defaults: {

	}
},
{
	init : function(){
		
		this.element.html(this.view());
		
		var twitterState = new $.Observe({queLength : 0});
							
		this.list = $("#twitterListContainer").dakuan_twitter_list({ tweets: new Dakuan.Models.Tweet.List(), quedTweets: twitterState });
			
		//this.list = new Dakuan.Controllers.TwitterList('#twitterListContainer', { tweets: new Dakuan.Models.Tweet.List(), quedTweets: twitterState });
			
		$('#twitterNotificationContainer').dakuan_twitter_notification({quedTweets: twitterState});
	},
	
	'#twitterNotificationContainer requestRefresh' : function(){
		
		steal.dev.log('mau!');
	}
})
})