steal('jquery/model', 'jquery/model/list', './locale.js', function(){

	$.Model.List('Dakuan.Map.Models.Locale.List',{
		//static
	},
	{
		//prototype
		getLocationRect: function(){
			
			return  Microsoft.Maps.LocationRect.fromLocations(this.getLocations());
		},
		
		getLocations: function(){
			var locations = new Array();
			
			this.each(function(index, element){
				locations.push(element.getLocation());
			});
			
			return locations;
		}
	});
}) 