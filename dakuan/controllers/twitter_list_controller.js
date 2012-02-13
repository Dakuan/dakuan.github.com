steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.TwitterList',{
	
},
{
	init : function(){
		
		//this.element.html(this.view('twitter/tweets.ejs', this.options.displayedTweets));
			
		this.prependTweets(this.options.displayedTweets);
	},
		
	prependTweets : function(tweets){
				
		this.chain(tweets, 0, tweets.length, function(){
					
			$(document).trigger('twitterListInit');
		});
	},
	
	chain: function(tweets, start, count, onComplete){
		
		if(start < count){
			
			var tweet = tweets[start];
			
			var view = this.view('twitter/tweet.ejs', tweets[start])
			
			if(start === 0){
				
				this.element.prepend(view);
			}
			else{
				
				$(tweets[start -1].elements()[0]).after(view);
			}
			
			var self = this;
			
			$(tweet.elements()[0]).slideDown(100, 'easeInOutCirc', function(){
				
				$('#twitterContainer .scrollContainer').tinyscrollbar_update()
				
				self.chain(tweets, ++start, count, onComplete);
			});
		}
		else{
			
			if(onComplete){
			
				onComplete();
			}
		}
	}
})
})