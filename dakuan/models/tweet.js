steal('jquery/model', function() {

	/**
	 * @class Dakuan.Models.Tweet
	 * @parent twitter
	 * @inherits jQuery.Model
	 * Wraps backend tweet services.  
	 */
	$.Model('Dakuan.Models.Tweet',
	/* @Static */
	{
	  	/*
	    * Finds the most recent tweets
	    * @return {Dakuan.Models.Tweet.List} The list of tweets
	    */
		findAll: function() {
			return $.ajax({
				url: 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=MostlyHarmlessd&exclude_replies=true&callback=?',
				type: 'get',
				dataType: 'json tweet.models'
			});
		}
	},
	/* @Prototype */
	{
		  /*
		    * Returns the tweet text with anchor elements for hashtahs @'s and urls
		    * @return {String} The formated text
	    */
		formatedText: function() {

			return this.getHash(this.text);
		},

		/*
		    * Converts text into a anchor element
		    * @param {String} href The href for the anchor
		    * @param {String} text The text for the anchor
		    * @return {String} The anchor as a html string
		*/
		makeUrl: function( href, text ) {

			return '<a target="_blank" href="' + href + '">' + text + '</a>'
		},

		getHash: function( text ) {

			var words = text.split(' ');

			var hashedText = '';

			var self = this;

			$.each(words, function( index, element ) {

				var firstChar = element.charAt(0);

				switch ( firstChar ) {

				case '@':

					hashedText += self.makeUrl('https://twitter.com/#!/search/%40' + element.slice(1), element);

					break;

				case '#':

					hashedText += self.makeUrl('https://twitter.com/#!/search/realtime/%23' + element.slice(1), element);

					break;

				default:

					if ( self.validUrl(element) ) {

						var newelement = self.makeUrl(element, element);
					}
					else {

						var newelement = element;
					}

					hashedText += newelement;
				}

				hashedText += ' ';
			});

			return hashedText;
		},
		
		/*
		 * Determines if the string is a Url
		 * @return {Bool} Returns true if the string is a valid Url
		 * @param {String} str The string to test
		 */
		validUrl: function( str ) {
			var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
			return regexp.test(str);
		}
	});
})