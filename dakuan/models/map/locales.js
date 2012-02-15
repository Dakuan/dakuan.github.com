steal('jquery/model', 'jquery/model/list', './locale.js', function() {

	/**
	 * @class Dakuan.Map.Models.Locale.List
	 * @parent mapmodels
	 * @inherits jQuery.Model.List
	 * Wraps backend locale services.  
	 */
	$.Model.List('Dakuan.Map.Models.Locale.List', {
	}, 
	
		/* @Prototype */
	{
		
		/*
		 * Converts the list into a Bing Maps Location Rect
		 * @return {Microsoft.Maps.LocationRect} the location rect for the list of locales
		 */
		getLocationRect: function() {

			return Microsoft.Maps.LocationRect.fromLocations(this.getLocations());
		},
		
		/*
		 * Converts the list of locales into an array of Bing Maps Locations
		 * @return {Array}
		 */
		getLocations: function() {
			var locations = new Array();

			this.each(function( index, element ) {
				locations.push(element.getLocation());
			});

			return locations;
		}
	});
})