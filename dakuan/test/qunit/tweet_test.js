steal("funcunit/qunit", "dakuan/fixtures", "dakuan/models/tweet.js", function(){
	module("Model: Dakuan.Models.Tweet")
	
	test("findAll", function(){
		expect(4);
		stop();
		Dakuan.Models.Tweet.findAll({}, function(tweets){
			ok(tweets)
	        ok(tweets.length)
	        ok(tweets[0].name)
	        ok(tweets[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Dakuan.Models.Tweet({name: "dry cleaning", description: "take to street corner"}).save(function(tweet){
			ok(tweet);
	        ok(tweet.id);
	        equals(tweet.name,"dry cleaning")
	        tweet.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Dakuan.Models.Tweet({name: "cook dinner", description: "chicken"}).
	            save(function(tweet){
	            	equals(tweet.description,"chicken");
	        		tweet.update({description: "steak"},function(tweet){
	        			equals(tweet.description,"steak");
	        			tweet.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Dakuan.Models.Tweet({name: "mow grass", description: "use riding mower"}).
	            destroy(function(tweet){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})