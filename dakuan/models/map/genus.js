steal('jquery/model', './basemodel.js', function() {

	/**
	 * @class Dakuan.Map.Models.Genus
	 * @parent mapmodels
	 * @inherits Dakuan.Map.Models.Basemodel
	 * Wraps backend genus services.  
	 */
	Dakuan.Map.Models.Basemodel('Dakuan.Map.Models.Genus',
	/* @Static */
	{
		model: function( data ) {
			return new this(data);
		},
		
		/*
		 * Gets all the genera
		 * @return {Array} the array of genera
		 */
		findAll: function() {
			var url = 'http://riftdata.apphb.com/jsclient/getgeneraforlake/1?callback=?';

			return $.ajax({
				url: url,
				type: 'get',
				dataType: 'json genus.models'
			});
		}
	},
	/* @Prototype */
	{});

})