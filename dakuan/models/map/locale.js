steal('jquery/model', './basemodel.js', function() {

	/**
	 * @class Dakuan.Map.Models.Locale
	 * @parent mapmodels
	 * @inherits Dakuan.Map.Models.Basemodel
	 * Wraps backend locale services.  
	 */
	Dakuan.Map.Models.Basemodel('Dakuan.Map.Models.Locale',
	/* @Static */
	{
		model: function( data ) {
			return new this(data);
		},
		
		/*
		 * Finds the locales that have fish living there of the specified species
		 * @param {Int} speciesId the speciesId
		 * @return {Dakuan.Map.Models.Locale.List} the list of locales
		 */
		findForSpecies: function( speciesId ) {

			var url = 'http://riftdata.apphb.com/jsclient/GetLocalesForSpecies/' + speciesId + '?callback=?';

			return $.ajax({
				url: url,
				type: 'get',
				dataType: 'json locale.models'
			});
		}
	},
	/* @Prototype */
	{
		/*
		 * Converts the Locale model into a bing maps location
		 * @return {Microsoft.Maps.Location} The bing maps location for this locale
		 */
		getLocation: function() {

			return new Microsoft.Maps.Location(this.lat, this.lng);
		}
	});

})