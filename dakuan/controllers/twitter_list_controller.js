steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.TwitterList',{
	
	defaults: {
		loading: true
	}
},
{
	init : function(){
				
		var deferredTweets = Dakuan.Models.Tweet.findAll();
		
		deferredTweets.done(this.callback('onFirstLoad'));
		
		deferredTweets.fail(this.callback('getTweetsFailed'));
	},
	
	onFirstLoad : function(tweets){
		
		this.element.html(this.view('twitter/tweets.ejs', tweets));
		
		$.each(tweets, this.callback('addNewTweet'));
		
		this.options.loading = false;
			
		this.checkStatus();
	},
	
	getTweetsFailed: function(){
		
		alert('meh! getting tweets failed');
	},
	
	checkStatus : function(){
		
		steal.dev.log('checking status....loading status:' + this.options.loading);
		
		var deferredTweets = Dakuan.Models.Tweet.findAll();
		
		var self = this;
		
		deferredTweets.done(function(data){
			
			$.each(data, self.callback('addNewTweet'));
		});
				
		setTimeout(this.callback('checkStatus'), 20000);
	},
	
	addNewTweet: function(index, tweet){
	
		this.options.tweets.addIfNew(tweet);
	},
	
	'{tweets} add' : function(tweets, event, items){
		
		if(!this.options.loading){
			
			var queLength = this.options.quedTweets.attr('queLength');
			
			this.options.quedTweets.attr('queLength', ++queLength);
			
			steal.dev.log('qued tweets: ' + queLength);
		}
	}
})
})