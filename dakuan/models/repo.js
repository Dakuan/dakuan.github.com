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
		/*
		 * Gets all the repos from github
		 * @return {Array} an array of repos
		 */
		findAll: function() {

			return $.ajax({
				url: 'https://api.github.com/users/dakuan/repos?callback=?',
				type: 'get',
				dataType: 'json repo.models'
			});
		}
	},
	/* @Prototype */
	{});

})