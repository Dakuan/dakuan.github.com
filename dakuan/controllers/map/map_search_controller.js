steal('jquery/controller', 'jquery/view/ejs', 'jquery/dom/form_params', 'jquery/controller/view').then(function( $ ) {
	$.Controller('Dakuan.Controllers.Map.MapSearch', {
		init: function() {

			this.element.html(this.view('//dakuan/views/map/mapsearch'));

			$('#localeList').tinyscrollbar();

			$('.scrollbar', '#localeList').addClass('disable');

			$('#genusSelect').append($.View('//dakuan/views/map/options', Dakuan.Map.Models.Genus.findAll(), function() {

				$('#genusSelect').removeAttr('disabled');
			}));
		},

		'#genusSelect change': function( el ) {

			this.clear();

			$('#speciesSelect').html($.View('//dakuan/views/map/options', Dakuan.Map.Models.Species.findForGenus(el.val()), function() {

				$('#speciesSelect').prepend($.View('//dakuan/views/map/option', {
					id: 0,
					name: 'select a species'
				}))

				$('#speciesSelect').removeAttr('disabled');
			}));
		},

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

		chain: function( items, start, count, onComplete ) {

			if ( start < count ) {

				var item = items[start];

				var view = this.view('//dakuan/views/map/localelistitem', item)

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