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
		
		this.observer = new Dakuan.Looper(2000, this.callback('ping'));
		
		this.observer.start();
							
		this.list = $("#twitterListContainer").dakuan_twitter_list({ tweets: new Dakuan.Models.Tweet.List(), quedTweets: twitterState }).controller();
				
		this.notification = $('#twitterNotificationContainer').dakuan_twitter_notification({quedTweets: twitterState}).controller();
	},
	
	ping: function(){
		
		steal.dev.log('ping');
	},
	
	'#twitterNotificationContainer requestRefresh' : function(){
		
		this.observer.stop();
		
		this.list.displayCurrentTweets();
	}
})
})