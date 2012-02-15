steal('jquery/controller', 'jquery/view/ejs', 'jquery/dom/form_params', 'jquery/controller/view').then(function( $ ) {
	
	/*
	 * @class Dakuan.Controllers.Map.MapSearch
	 * @parent mapcontrollers
	 * @inherits jQuery.Controller
	 * Controls the map search
	 */
	$.Controller('Dakuan.Controllers.Map.MapSearch',
	/*
	 * @Prototype
	 */ {
		
		/*
		 * Initialises the controller
		 * <ol>
		 * 	<li>Loads the view</li>
		 * 	<li>Attaches a scrollbar</li>
		 * 	<li>Loads the data for the genus drop down list</li>
		 * </ol>
		 */
		init: function() {

			this.element.html(this.view('//dakuan/map/views/mapsearch'));

			$('#localeList').tinyscrollbar();

			$('.scrollbar', '#localeList').addClass('disable');

			$('#genusSelect').append($.View('//dakuan/map/views/options', Dakuan.Map.Models.Genus.findAll(), function() {

				$('#genusSelect').removeAttr('disabled');
			}));
		},

		'#genusSelect change': function( el ) {

			this.clear();

			$('#speciesSelect').html($.View('//dakuan/map/views/options', Dakuan.Map.Models.Species.findForGenus(el.val()), function() {

				$('#speciesSelect').prepend($.View('//dakuan/map/views/option', {
					id: 0,
					name: 'select a species'
				}))

				$('#speciesSelect').removeAttr('disabled');
			}));
		},
		/*
		 * Clears the locales list
		 */
		clear: function( onComplete ) {

			$('ul', '#localeList').children().remove();

			this.element.trigger('localesRemoved');
		},

		'#speciesSelect change': function( el ) {

			this.clear();

			this.element.trigger('speciesSelected', el.val());

			var self = this;

			Dakuan.Map.Models.Locale.findForSpecies(el.val()).done(function( data ) {

				self.chain(data, 0, data.length);
			})
		},
		
		/*
		 * Daisy chains the animation of the locales sliding down
		 */
		chain: function( items, start, count, onComplete ) {

			if ( start < count ) {

				var item = items[start];

				var view = this.view('//dakuan/map/views/localelistitem', item)

				if ( start === 0 ) {

					$('ul', '#localeList').prepend(view);
				}
				else {

					$(items[start - 1].elements()[0]).after(view);
				}

				var self = this;

				$(item.elements()[0]).slideDown(100, 'easeInOutCirc', function() {

					$('#localeList').tinyscrollbar_update()

					self.chain(items, ++start, count, onComplete);
				});
			}
			else {

				if ( onComplete ) {

					onComplete();
				}
			}
		}

	})
})