steal('jquery/model', function(){

/**
 * @class Dakuan.Models.Tweet
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend tweet services.  
 */
$.Model('Dakuan.Models.Tweet',
/* @Static */
{
	findAll: function(){
						
		return $.ajax({
      		//url: 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=MostlyHarmlessd&callback=?',
      		url:'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=domtestbarker&callback=?',
      		type: 'get',
      		dataType : 'json tweet.models' 
    	});
	},
  	findOne : "/tweets/{id}.json", 
  	create : "/tweets.json",
 	update : "/tweets/{id}.json",
  	destroy : "/tweets/{id}.json"

},
/* @Prototype */
{
	formatedText: function () {
		
		return this.getHash(this.text);
	},
	
	makeUrl: function(href, text){
		
		return '<a href="' + href + '">' + text + '</a>'
	},
	
  	getHash:function(text){
  		
  		var words = text.split(' ');
  		
  		var hashedText = '';
  		
  		var self = this;
  		
  		$.each(words, function(index, element){
  			
  			var firstChar = element.charAt(0);
  			
  			switch(firstChar){
  				
  				case '@':
  				
  					hashedText += self.makeUrl('https://twitter.com/#!/search/%40' + element.slice(1), element);
  					
  					break;
  					
				case '#':
				
					hashedText += self.makeUrl('https://twitter.com/#!/search/realtime/%23' + element.slice(1), element);
					
					break;
					
				default:
				
  					hashedText += element;
  			}
  			
  			hashedText += ' ';
  		});
  		
  		return hashedText;	
  	}
});
})