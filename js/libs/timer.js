// Timer
(function ($) {
	var days = 24 * 60 * 60,
		hours = 60 * 60,
		minutes = 60;

	$.fn.countdown = function (prop) {
		var options = $.extend({
			callback: function () {},
			timestamp: 0
		}, prop);

		var left, d, h, m, s;

		(function tick() {
			// time left
			left = Math.floor((options.timestamp - (new Date())) / 1000);

			if (left < 0) {
				left = 0;
			}

			// days left
			d = Math.floor(left / days);
			left -= d * days;

			// hours left
			h = Math.floor(left / hours);
			left -= h * hours;

			// minutes left
			m = Math.floor(left / minutes);
			left -= m * minutes;

			// seconds left
			s = left;

			options.callback(d, h, m, s);

			setTimeout(tick, 1000);
		})();

		return this;
	};
})(jQuery);

$(document).ready(function () {
	var countdown1 = $('[data-time-out]');
	countdown1.each(function(){
		var thisCD = $(this),
				ts = new Date(thisCD.attr('data-time-out')),
				newYear = true;
		if ((new Date()) > ts) {
			ts = (new Date()).getTime() + 10 * 24 * 60 * 60 * 1000;
			newYear = false;
		}

		thisCD.countdown({
			timestamp: ts,
			callback: function (days, hours, minutes, seconds) {
				thisCD.find('.js-stock-countdown-d').html(days.toString().padStart(2,0));
				thisCD.find('.js-stock-countdown-h').html(hours.toString().padStart(2,0));
				thisCD.find('.js-stock-countdown-m').html(minutes.toString().padStart(2,0));
				thisCD.find('.js-stock-countdown-s').html(seconds.toString().padStart(2,0));
			}
		});
	});
});
