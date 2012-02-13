steal('jquery/model', function() {

	/**
	 * @class Dakuan.Models.Repo
	 * @parent index
	 * @inherits jQuery.Model
	 * Wraps backend repo services.  
	 */
	$.Model('Dakuan.Models.Repo',
	/* @Static */
	{
		findAll: function() {

			return $.ajax({
				url: 'https://api.github.com/users/dakuan/repos?callback=?',
				type: 'get',
				dataType: 'json repo.models'
			});
		},
		findOne: "/repos/{id}.json",
		create: "/repos.json",
		update: "/repos/{id}.json",
		destroy: "/repos/{id}.json"
	},
	/* @Prototype */
	{});

})