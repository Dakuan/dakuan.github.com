steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'jquery/lang/observe')
	.then('jquery/ui',function($){
$.Controller('Dakuan.Controllers.TwitterNotification',{
	
},
{
	init : function(){
		
		$('#twitterNotification').qtip({
		   content: {
		      text:'click to refresh tweets...'
		   }
		})
		
		this.element.html(this.view('twitter/notification'));
		
		this.options.quedTweets.bind('change', this.callback('onQuedTweetSet'));
	},
	
	onQuedTweetSet: function(ev, attr, how, newVal, oldVal){
		
		if(attr = 'quedTweets'){
			
			if(newVal > 0){
				
				if(newVal === 1){
					
					this.element.html(this.view('twitter/notification', 'there is a new tweet'));
				}
				else{
					
					this.element.html(this.view('twitter/notification', 'there are ' + newVal + ' new tweets'));
				}
					
				this.element.fadeIn();
			}
			else{
				
				this.element.fadeOut();
			}
		}
	},
	
	'#twitterNotification click' : function(){
		
		this.options.quedTweets.attr('queLength', 0);
		
		this.element.trigger('refreshTweets');
	},
	
	destroy: function(){
		
		this.options.quedTweets.unbind();
		
		this._super();
	}	
})
})