steal('jquery/controller', 'jquery/view/ejs', 'jquery/dom/form_params', 'jquery/controller/view', 'jquery/lang/observe').then('jquery/ui', function( $ ) {
	
		/*
	 * @class Dakuan.Controllers.Twitter
	 * @parent twitter
	 * @inherits jQuery.Controller
	 * Controls the twitter widget
	 */
	$.Controller('Dakuan.Controllers.Twitter',  
	/*
	 * @Prototype
	 */{
		init: function() {

			this.element.html(this.view());

			var state = new $.Observe({
				queLength: 0,
				tweets: new Dakuan.Models.Tweet.List()
			});

			this.twitterState = state

			var deferredTweets = Dakuan.Models.Tweet.findAll();

			deferredTweets.done(this.callback('onRecievedTweets'));

			$('#twitterHeader a').qtip(Dakuan.QtipFactory.buildHelperTip());

			this.notification = $('#twitterNotificationContainer').dakuan_twitter_notification({
				quedTweets: this.twitterState
			}).controller();
		},
		
		/*
		 * Callback for when the initial twitter service call is completed
		 * @param {Dakuan.Models.Tweet.List} tweets The list of tweets
		 */
		onRecievedTweets: function( tweets ) {

			var self = this;
			
			$('.spinContainer').fadeOut(200, function(){
				
				self.observer = new Dakuan.TwitterObserver(self.twitterState, tweets);
	
				self.list = $("#twitterListContainer").dakuan_twitter_list({
					twitterState: self.twitterState,
					displayedTweets: tweets
				}).controller();
			});
		},

		'{document} twitterListInit': function() {

			$('#twitterContainer .scrollContainer').tinyscrollbar()

			this.observer.observe();
		},

		'#twitterNotificationContainer refreshTweets': function() {

			this.list.prependTweets(this.observer.quedTweets);

			this.observer.quedTweets = [];
		}
	})
})