steal('jquery/model', './basemodel.js', function() {

	Dakuan.Map.Models.Basemodel('Dakuan.Map.Models.Localelabel',
	/* @Static */
	{
		model: function( data ) {
			return new this(data);
		},
		findForZoomLevel: function( zoomLevel, lakeId, callback ) {

			var url = this.getBaseUrl() + "/GetLocalesForZoomLevel/" + zoomLevel + "?lakeId=" + lakeId + "&callback=?";

			var self = this;

			$.getJSON(url, function( data ) {
				callback(self.models(data));
			});
		},
		localesToLocations: function( locales ) {

			var locations = new Array();

			$.each(locales, function( index, element ) {
				locations.push(element.getLocation());
			});

			return locations;
		}
	},
	/* @Prototype */
	{
		getLocation: function() {
			return new Microsoft.Maps.Location(this.Latitude, this.Longitude);
		}
	});

})