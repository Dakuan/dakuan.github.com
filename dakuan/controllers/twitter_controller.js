steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'jquery/lang/observe')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.Twitter',{
	
},
{
	init : function(){
		
		this.element.html(this.view());
			
		var state = new $.Observe({queLength : 0, tweets: new Dakuan.Models.Tweet.List()});
		
		this.twitterState = state
		
		var deferredTweets = Dakuan.Models.Tweet.findAll();
		
		deferredTweets.done(this.callback('onRecievedTweets'));
		
		$('#twitterHeader a').qtip(Dakuan.QtipFactory.buildHelperTip());
				
		this.notification = $('#twitterNotificationContainer').dakuan_twitter_notification({quedTweets: this.twitterState}).controller();
	},
	
	onRecievedTweets : function(tweets){
		
		this.observer = new Dakuan.TwitterObserver(this.twitterState, tweets);
			
		this.list = $("#twitterListContainer").dakuan_twitter_list({ twitterState: this.twitterState, displayedTweets: tweets }).controller();	
	},
	
	'{document} twitterListInit' : function(){
				
		$('#twitterContainer .scrollContainer').tinyscrollbar()
				
		this.observer.observe();
	},
	
	'#twitterNotificationContainer refreshTweets' : function(){
		
		this.list.prependTweets(this.observer.quedTweets);
		
		this.observer.quedTweets = [];
	}
})
})