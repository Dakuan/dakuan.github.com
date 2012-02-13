steal('jquery/class').then(function( $ ) {
	$.Class('Dakuan.Looper',
	/* @static */
	{

	},
	/* @prototype */
	{
		init: function( loopTime, callbackToLoop ) {

			this.loopTime = loopTime;

			this.callbackToLoop = callbackToLoop;
		},

		start: function() {

			this.looper();
		},

		stop: function() {

			clearTimeout(this.timer);
		},

		looper: function() {

			this.callbackToLoop();

			this.timer = setTimeout(this.callback('looper'), this.loopTime);
		}
	});
})