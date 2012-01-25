steal( 'jquery/controller',
	   'jquery/view/ejs',
	   'jquery/controller/view',
	   'dakuan/models' )
.then( './views/init.ejs', 
       './views/repo.ejs', 
       function($){

/**
 * @class Dakuan.Repo.List
 * @parent index
 * @inherits jQuery.Controller
 * Lists repos and lets you destroy them.
 */
$.Controller('Dakuan.Repo.List',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html(this.view('init',Dakuan.Models.Repo.findAll()) )
	},
	'.destroy click': function( el ){
		if(confirm("Are you sure you want to destroy?")){
			el.closest('.repo').model().destroy();
		}
	},
	"{Dakuan.Models.Repo} destroyed" : function(Repo, ev, repo) {
		repo.elements(this.element).remove();
	},
	"{Dakuan.Models.Repo} created" : function(Repo, ev, repo){
		this.element.append(this.view('init', [repo]))
	},
	"{Dakuan.Models.Repo} updated" : function(Repo, ev, repo){
		repo.elements(this.element)
		      .html(this.view('repo', repo) );
	}
});

});