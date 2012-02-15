steal('jquery/model', './basemodel.js', function() {

	/**
	 * @class Dakuan.Map.Models.Species
	 * @parent mapmodels
	 * @inherits jQuery.Model
	 * Wraps backend species services.  
	 */
	Dakuan.Map.Models.Basemodel('Dakuan.Map.Models.Species',
	/* @Static */
	{
		model: function( data ) {
			return new this(data);
		},

		/*
		 * Gets all the species within the specified genera
		 * @return {Array} An array of species models
		 */
		findForGenus: function( genusId ) {
			
			var url = 'http://riftdata.apphb.com/jsclient/getspeciesforgenera/' + genusId + '?callback=?';

			return $.ajax({
				url: url,
				type: 'get',
				dataType: 'json species.models'
			});
		}
	},
	/* @Prototype */
	{});

})