steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'jquery/lang/observe')
	.then(function($){
$.Controller('Dakuan.Controllers.Detail',
{
	init : function(){

	},

	onRouteDetailSet: function(ev, newVal){

		if(newVal){
			this.show(newVal, true);
		}
	},

	show : function(section, animate){

		this.element.children().remove();

		this.element.html(this.view(section));

		switch(section){

			case 'about':
				$('#twitterContainer').dakuan_twitter();

				break;

			case 'git':

				$('#repoContainer').dakuan_github();

				break;

            case 'job':

                $('#jobs').dakuan_job();

			default:

				//this.element.html(this.view('home/' + section));
		}

		if(animate == true){

			this.element.show('scale', this.callback('onShowComplete'));
		}
		else{

			this.element.show();

			this.onShowComplete();
		}
	},

	onShowComplete: function(){

		$.route.attr('animate', false);

		this.element.filter('.scrollContainer').tinyscrollbar();
	},

	hide: function(){
		
		var self = this;

		this.element.fadeOut(500, function(){
			
			self.element.children().remove();

			$.route.removeAttr('detail');

			$.route.removeAttr('animate');

			$(document).trigger('detailHidden');
		});
	},

	'{document} hideDetail' : function(el, ev){
		this.hide();
	},

	'{document} requestDetail': function(el, ev, args){

		steal.dev.log('devils detail');

		this.show(args, $.route.attr('animate'));
	},
})
})