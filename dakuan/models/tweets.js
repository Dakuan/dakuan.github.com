steal('jquery/model', 'jquery/model/list', './tweet.js', function() {

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
		 */
		isNew: function( tweet ) {

			if ( this.match('id', tweet.id).length === 0 ) {

				return true;
			}

			return false;
		},

/*
		 * function takes a single tweet or an array of tweets and adds new tweets
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