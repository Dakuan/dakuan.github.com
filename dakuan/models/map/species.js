steal('jquery/model', './basemodel.js', function() {

	/**
	 * @class Riftmap.Models.Shell
	 * @parent index
	 * @inherits jQuery.Model
	 * Wraps backend shell services.  
	 */
	Dakuan.Map.Models.Basemodel('Dakuan.Map.Models.Species',
	/* @Static */
	{
		model: function( data ) {
			return new this(data);
		},
		findAll: function() {

		},

		findForGenus: function( genusId ) {
			var url = 'http://riftdata.apphb.com/jsclient/getspeciesforgenera/' + genusId + '?callback=?';

			return $.ajax({
				url: url,
				type: 'get',
				dataType: 'json species.models'
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
	{});

})