steal( 'jquery/controller',
    'jquery/view/ejs',
    'jquery/dom/form_params',
    'jquery/controller/view',
    'jquery/lang/observe')
    .then(function($){
        $.Controller('Dakuan.Controllers.Map.Map',
            {
				init : function(){

       				Dakuan.Map.Models.Localelabel.findForZoomLevel(10, 1, this.callback(this.zoomToLocales));
       				
		         	$('#mapSearch').dakuan_map_map_search();
				},
				
				'#mapSearch localesRemoved' : function(){
					
					this.fishPinLayer.clear();
				},
				
				'#mapSearch speciesSelected' : function(el, ev, speciesId){
					
					var deferred = Dakuan.Map.Models.Locale.findForSpecies(speciesId);
					
					deferred.done(this.callback('addFishPins'));			
				},
				
				addFishPins : function(locales){
					
					this.fishPinLayer.clear();
					
					var self = this;
					
					$.each(locales, function(index, element){
									
						var location = element.getLocation();
						
			        	var pin = new Microsoft.Maps.Pushpin(location, { text: element.name, 
    														icon: './dakuan/assets/fishPin.png', 
															width: 50, 
															height: 50, 
															zIndex: 999,
															typeName: "riftMapSpeciesPin id_" + element.id
														});													
						self.fishPinLayer.push(pin);
					});
					
					this.map.setView({bounds: locales.getLocationRect()});
				},

				zoomToLocales : function(locales){
			
					var locations = Dakuan.Map.Models.Localelabel.localesToLocations(locales);
			
					var locationRect = Microsoft.Maps.LocationRect.fromLocations(locations);
			
					if(this.map === undefined){
			 			this.createMap(locationRect);
					}
					else{
						this.map.setView({bounds : locationRect});
					}			          
				},

				createMap : function(bounds){

					this.map = new Microsoft.Maps.Map(document.getElementById("map"),
				        {
				            credentials: "AsZr5U9t2cAH1YZh8fMdisYJ3479SF2aw4MqdnC8-cK8bnHS_qpyNeAvXdXg8WID",
				            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
				            bounds: bounds,
				            showScalebar: false,
				            enableSearchLogo: false,
				            enableClickableLogo: false,
				            showMapTypeSelector: false,
				            labelOverlay: Microsoft.Maps.LabelOverlay.hidden
				        });

				        //attach events        
				        Microsoft.Maps.Events.addHandler(this.map, 'viewchangeend', this.callback('onViewChangeEnd'));
				        
				        var northEast = bounds.getNorthwest();
				        
				        northEast.longitude += bounds.width;
				        
				        var southWest = bounds.getSoutheast();
				        
				        southWest.longitude -= bounds.width;
				        
				        //create layers
				        this.labelsLayer = new Microsoft.Maps.EntityCollection();
				        
				        this.fishPinLayer = new Microsoft.Maps.EntityCollection();
				        				        
				        this.map.entities.push(this.labelsLayer);
				        
				        this.map.entities.push(this.fishPinLayer);
					},

					onViewChangeEnd : function(){
				
						Dakuan.Map.Models.Localelabel.findForZoomLevel(this.map.getZoom(), 1, this.callback('onGetLocaleData'));
					},

					onGetLocaleData : function(data){
				
						this.labelsLayer.clear();
				
						var self = this;
				
						$.each(data, function(index, element){
				
							var location = element.getLocation();
				
							if(self.map.getBounds().contains(location)){
				
					        	var pin = new Microsoft.Maps.Pushpin(location, { text: element.Name, 
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
				
						$('[class*="riftMapPin"]').fadeIn('fast', function(){
							$('.riftMapPin').children().css('text-shadow', '0px 1px 0px #888');
							$('.riftMapPin').children().css('font-weight', 'lighter');
						});	
					}
            })
    })