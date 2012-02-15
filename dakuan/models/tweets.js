steal('jquery/model', 'jquery/model/list', './tweet.js', function() {

		/**
	 * @class Dakuan.Models.Tweet.List
	 * @parent twitter
	 * @inherits jQuery.Model.List
	 * Wraps backend tweet services.  
	 */
	$.Model.List('Dakuan.Models.Tweet.List', {
		//static
	}, {
		//prototype
/*
		 * empties the array
		 */
		clear: function() {

			var self = this;

			$.each(this, function( index, element ) {
				self.pop(element);
			});
		},

		/*
		 * Determines if a tweet is new or not
		 * @return {Bool} Returns true if the tweet is not already in the list
		 * @param {Dakuan.Models.Tweet} tweet The tweet to test
		 */
		isNew: function( tweet ) {

			if ( this.match('id', tweet.id).length === 0 ) {

				return true;
			}

			return false;
		},

/*
		 * function takes a single tweet or an array of tweets and adds new tweets
		 * @return {void}
		 * @param {Array, Dakuan.Models.Tweet} tweets Tweet or array of tweets
		 */
		addIfNew: function( tweets ) {

			if ( tweets.length ) {

				//input is an array
				var self = this;

				var newTweets = new Array();

				$.each(tweets, function( index, tweet ) {

					if ( self.isNew(tweet) ) {

						newTweets.push(tweet);
					}
				});

				this.push(newTweets);
			}
			else {

				//input is a single object
				if ( this.isNew(tweets) ) {

					this.push(tweets);
				}
			}
		}
	});
})