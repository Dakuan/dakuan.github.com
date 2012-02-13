steal('jquery/class').then(function( $ ) {
	$.Class('Dakuan.QtipFactory',
	/* @static */
	{
		getStyle: function() {
			return {
				classes: 'ui-tooltip-light ui-tooltip-shadow'
			};
		},

		buildHelperTip: function( contentText, position ) {
			return {
				prerender: true,
				content: {
					text: contentText,
					title: {
						text: 'halp!',
						button: true
					}
				},
				style: this.getStyle(),
				position: position
			};
		}
	},
	/* @prototype */
	{});
})