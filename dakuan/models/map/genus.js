steal('jquery/model', './basemodel.js', function(){

/**
 * @class Riftmap.Models.Shell
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend shell services.  
 */
Dakuan.Map.Models.Basemodel('Dakuan.Map.Models.Genus',
/* @Static */
{
	model: function(data){
		return new this(data);
	},
	findAll: function(){
		var url= 'http://riftdata.apphb.com/jsclient/getgeneraforlake/1?callback=?';
		
		return $.ajax({
      		url: url,
      		type: 'get',
      		dataType : 'json genus.models' 
    	});
	},
  	findOne : function(){
  		
  	}, 
  	create : function(){
  		
  	},
 	update : function(){
 		
 	},
  	destroy : function(){	
  	}
},
/* @Prototype */
{
});

})