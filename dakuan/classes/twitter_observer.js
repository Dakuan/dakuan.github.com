steal('jquery/class', './looper.js').then(function( $ ) {
/*
	 * @class
	 * Observes a twitter feed and updates an observable when new tweets are recieved
	 */
	$.Class('Dakuan.TwitterObserver',
	/* @static */
	{

	},
	/* @prototype */
	{
		init: function( twitterState, startingTweets ) {

			this.state = twitterState;

			this.tweets = new Dakuan.Models.Tweet.List(startingTweets);

			this.tweets.bind('add', this.callback('onNewTweet'));

			this.looper = new Dakuan.Looper(20000, this.callback('getTweets'))
		},

		observe: function() {

			this.looper.start();
		},

		getTweets: function() {

			steal.dev.log('checking for new tweets...');

			var deferredTweets = Dakuan.Models.Tweet.findAll();

			deferredTweets.done(this.callback('onGotTweets'));
		},

		onGotTweets: function( data ) {

			steal.dev.log(data.length + ' tweets recieved');

			this.tweets.addIfNew(data);
		},

		onNewTweet: function( event, addedTweets ) {

			this.quedTweets = new Dakuan.Models.Tweet.List(addedTweets);

			var queLength = this.state.attr('queLength') + addedTweets.length;

			this.state.attr('queLength', queLength);

			steal.dev.log('qued tweets: ' + queLength);
		},

		destroy: function() {

			this.tweets.unbind();
		}
	});
})