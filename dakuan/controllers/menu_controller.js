steal('jquery/controller', 'jquery/view/ejs', 'jquery/dom/form_params', 'jquery/controller/view', 'jquery/event/hover').then(function( $ ) {
	
	/*
	 * @class Dakuan.Controllers.Menu
	 * @parent menu
	 * @inherits jQuery.Controller
	 * Controls the menu
	 */
	$.Controller('Dakuan.Controllers.Menu', {
		defaults: {
			time: 300,
			easing: 'easeInOutSine',
			collapsed: false,
			selectedTile: undefined
		}
	},
	/** @Prototype */
	{
		init: function( el, selectedTile ) {

			this.element.html(this.view());

			this.options.selectedTile = selectedTile;

			this.ifAnimate(this.callback('animateShow'), this.callback('show'));
			
			$.route.delegate('detail', 'set', this.callback('onRouteDetailSet'));
			
			$.route.delegate('detail', 'remove', this.callback('onRouteDetailRemove'));
		},
		
		/*
		 * Handles when the value of the routes detail attribute is set
		 * @param {event} event The jQuery event.
		 * @param {string} newVal The new value of the route's detail attribute
		 * @param {string} oldVal The old value of the route's detail attribute
		 */
		onRouteDetailSet: function(event, newVal, oldVal){
			this.options.selectedTile = newVal;
			this.collapseTo(newVal);
		},
		
		/*
		 * Handles the routes detail attribute being removed
		 */	
		onRouteDetailRemove: function(){
			this.options.selectedTile = false;
			$(document).trigger('hideDetail');
		},
		
		/*
		 * Shows the menu without animation
		 */
		show: function() {
			this.element.children().show();
			this.onShowComplete();
		},
		
		/*
		 * Shows the menu with animation
		 */
		animateShow: function() {
			var self = this;
			var tiles = this.element.children();
			var numberOfTiles = tiles.length;
			var i = 0;
			tiles.show('scale', this.options.time, function() {
				i++;
				if ( i === numberOfTiles ) {
					self.onShowComplete();
				}
			});
		},
		
		/*
		 * Handles the completion of the show process
		 */
		onShowComplete: function() {
			steal.dev.log('menu has been shown');
			this.options.collapsed = false;
			this.detailRequested = false;
			if ( this.options.selectedTile ) {
				this.collapseTo(this.options.selectedTile);
			}
		},

		/*
		 * Helper function for switching between animated and non animate paths
		 * @param {function} ifTrue The function to execute if the animation flag is true
		 * @param {function} ifFalse The function to exectue if the animation flag is set to true
		 */
		ifAnimate: function( ifTrue, ifFalse ) {

			var animate = $.route.attr('animate');

			if ( animate == true || animate === undefined ) {
				ifTrue();
			}
			else {
				ifFalse();
			}
		},
		
		/*
		 * Collapses the menu to the specified section
		 * @param {string} tileName The name of the tile
		 */
		collapseTo: function( tileName ) {

			var tile = $('.' + tileName, this.element);

			//shunt it to the front			
			this.moveTileToFront(tile);

			//shrink it
			var self = this;

			var count = 0;

			var animate = $.route.attr('animate');

			if ( animate == true || animate === undefined ) {

				tile.addClass('selected', this.options.time, function() {

					var tilesToHide = $(':not(.selected)', self.element);

					var numberOfTiles = tilesToHide.length;
					var i = 0;
					tilesToHide.addClass('deselected', self.options.time, function() {
						i++;
						if ( i === numberOfTiles ) {
							i = 0;
							tilesToHide.fadeOut('fast', function() {
								i++;
								if ( i === numberOfTiles ) {

									tile.addClass('stage2', self.options.time, function() {

										self.options.collapsed = true;

										$(document).trigger('requestDetail', self.options.selectedTile);
									});
								}
							});
						}
					});
				});
			}
			else {
				tile.addClass('selected').addClass('stage2');

				$(':not(.selected)', self.element).addClass('deselected').fadeOut();

				self.options.collapsed = true;

				$(document).trigger('requestDetail', self.options.selectedTile);
			}
		},

		/*
		 * Moves the specified tile to the front of the list
		 * @param {object} tile The tile jquery object
		 */
		moveTileToFront: function( tile ) {

			if ( $('#menu div').index(tile) > 0 ) {

				var before = $('#menu div')[0];
				
				tile.insertBefore(before);
			}
		},
		
		'.square hoverenter': function( el, ev ) {

			el.addClass('hover', this.options.time);
		},
		
		'.square hoverleave': function( el, ev ) {

			el.removeClass('hover', this.options.time);
		},
		
		'.square click': function( el, ev ) {
			
			if (!this.options.collapsed ) {

				var tileName = el.attr('class').split(' ')[1];

				$.route.attr('detail', tileName);
			}
			else {
						
				$.route.removeAttr('detail');
			}
		},
		
		'{document} detailHidden': function() {

			var tile = $('.selected', this.element);

			var tilesToShow = $('.deselected');

			var self = this;

			tile.removeClass('stage2', this.options.time, function() {
				var numberOfTiles = tilesToShow.length;
				var i = 0;
				tilesToShow.addClass('selected').removeClass('deselected').show('scale', self.options.time, function() {
					i++;
					if ( i === numberOfTiles ) {
						setTimeout(function() {
							$('.square').removeClass('selected', self.options.time, function() {
								self.options.collapsed = false;
							});
						}, 70)

					}
				});
			});
		}
	})
})