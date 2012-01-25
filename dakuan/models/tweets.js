steal('jquery/model', 'jquery/model/list', './tweet.js', function(){

	$.Model.List('Dakuan.Models.Tweet.List',{
		//static
	},
	{
		//prototype
		clear: function(){
			
			var self = this;
			
			$.each(this, function(index, element){
				self.pop(element);
			});
		},
		
		addIfNew: function(tweet){
			
			if(this.match('id', tweet.id).length === 0){
				
				this.push(tweet);
			}
		}
	});
}) 