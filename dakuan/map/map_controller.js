steal('jquery/controller', 'jquery/view/ejs', 'jquery/dom/form_params', 'jquery/controller/view', 'jquery/lang/observe').then(function( $ ) {
	
	/*
	 * @class Dakuan.Controllers.Map.Map
	 * @parent mapcontrollers
	 * @inherits jQuery.Controller
	 * Controls the map widget
	 */
	$.Controller('Dakuan.Controllers.Map.Map', 
	/*
	 * @Prototype
	 */
	{
		/*
		 * gets the locales for the inital zoom level and attaches the search box controller
		 * @return {void}
		 */
		init: function() {

			Dakuan.Map.Models.Localelabel.findForZoomLevel(10, 1, this.callback(this.zoomToLocales));

			$('#mapSearch').dakuan_map_map_search();
		},

		'#mapSearch localesRemoved': function() {

			this.fishPinLayer.clear();
		},

		'#mapSearch speciesSelected': function( el, ev, speciesId ) {

			var deferred = Dakuan.Map.Models.Locale.findForSpecies(speciesId);

			deferred.done(this.callback('addFishPins'));
		},
		/*
		 * Adds fish pins for the specified locales
		 * @param {Dakuan.Map.Models.Locale.List} locales The list of locales
		 */
		addFishPins: function( locales ) {

			this.fishPinLayer.clear();

			var self = this;

			$.each(locales, function( index, element ) {

				var location = element.getLocation();

				var pin = new Microsoft.Maps.Pushpin(location, {
					text: element.name,
					icon: './dakuan/assets/fishPin.png',
					width: 50,
					height: 50,
					zIndex: 999,
					typeName: "riftMapSpeciesPin id_" + element.id
				});
				self.fishPinLayer.push(pin);
			});

			this.map.setView({
				bounds: locales.getLocationRect()
			});
		},
		
		/*
		 * Moves the map to view the reqested locales. If the map control does not exist, it is created.
		 * @param {Dakuan.Map.Models.Locale.List} locales The list of locales
		 */
		zoomToLocales: function( locales ) {

			var locations = Dakuan.Map.Models.Localelabel.localesToLocations(locales);

			var locationRect = Microsoft.Maps.LocationRect.fromLocations(locations);

			if ( this.map === undefined ) {
				this.createMap(locationRect);
			}
			else {
				this.map.setView({
					bounds: locationRect
				});
			}
		},
		

		onMapLoaded: function(){
			
			//attach events        
			Microsoft.Maps.Events.addHandler(this.map, 'viewchangeend', this.callback('onViewChangeEnd'));

			//create layers
			this.labelsLayer = new Microsoft.Maps.EntityCollection();

			this.fishPinLayer = new Microsoft.Maps.EntityCollection();

			this.map.entities.push(this.labelsLayer);

			this.map.entities.push(this.fishPinLayer);
			
			$(document).trigger('mapLoaded');
		},
		
		/*
		 * Creates the map. map layers and attaches event handlers
		 */
		createMap: function( bounds ) {

			this.map = new Microsoft.Maps.Map(document.getElementById("map"), {
				credentials: "AsZr5U9t2cAH1YZh8fMdisYJ3479SF2aw4MqdnC8-cK8bnHS_qpyNeAvXdXg8WID",
				mapTypeId: Microsoft.Maps.MapTypeId.aerial,
				bounds: bounds,
				showScalebar: false,
				enableSearchLogo: false,
				enableClickableLogo: false,
				showMapTypeSelector: false,
				labelOverlay: Microsoft.Maps.LabelOverlay.hidden
			});

         	// Register and load a new module
             Microsoft.Maps.registerModule("mapLoaded", "./dakuan/map/mapLoadedModule.js");
             Microsoft.Maps.loadModule("mapLoaded", { callback: this.callback('onMapLoaded') });
		},

		/*
		 * Handles the view changed event, dispatching a request for the locales in view
		 */
		onViewChangeEnd: function() {

			Dakuan.Map.Models.Localelabel.findForZoomLevel(this.map.getZoom(), 1, this.callback('onGetLocaleData'));
		},
		
		/*
		 * Handles the arrival of locale data, clearing the old data, populating the new map pins and making styling tweaks
		 * @param {Dakuan.Map.Models.List} data The list of locales
		 */
		onGetLocaleData: function( data ) {

			this.labelsLayer.clear();

			var self = this;

			$.each(data, function( index, element ) {

				var location = element.getLocation();

				if ( self.map.getBounds().contains(location) ) {

					var pin = new Microsoft.Maps.Pushpin(location, {
						text: element.Name,
						icon: '',
						width: 200,
						height: 50,
						zIndex: 500,
						typeName: "riftMapPin id_" + element.Id,
						textOffset: new Microsoft.Maps.Point(0, 35)
					});

					self.labelsLayer.push(pin);
				}
			});

			$('[class*="riftMapPin"]').fadeIn('fast', function() {
				$('.riftMapPin').children().css('text-shadow', '0px 1px 0px #888');
				$('.riftMapPin').children().css('font-weight', 'lighter');
			});
		}
	})
})