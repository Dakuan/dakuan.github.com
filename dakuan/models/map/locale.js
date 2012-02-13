steal('jquery/model', './basemodel.js', function() {

	/**
	 * @class Riftmap.Models.Shell
	 * @parent index
	 * @inherits jQuery.Model
	 * Wraps backend shell services.  
	 */
	Dakuan.Map.Models.Basemodel('Dakuan.Map.Models.Locale',
	/* @Static */
	{
		model: function( data ) {
			return new this(data);
		},
		findAll: function() {},
		findForSpecies: function( speciesId ) {

			var url = 'http://riftdata.apphb.com/jsclient/GetLocalesForSpecies/' + speciesId + '?callback=?';

			return $.ajax({
				url: url,
				type: 'get',
				dataType: 'json locale.models'
			});
		},
		findOne: function() {

		},
		create: function() {

		},
		update: function() {

		},
		destroy: function() {}


	},
	/* @Prototype */
	{
		getLocation: function() {

			return new Microsoft.Maps.Location(this.lat, this.lng);
		}
	});

})