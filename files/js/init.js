
$(document).ready(function() {
		$.slider();
		$('#up-arrow').click(function(){ $.scrollTo('#header', 1000)});
		$('#down-arrow').click(function(){ $.scrollTo('#footer', 1000)});
		var change_opacity = function() {
		$(this).hover(function() {
			$(this).stop().animate({ opacity: 1.0 }, 300);
			},
			function() {
			$(this).stop().animate({ opacity: 0.3 }, 300);
			}
			);
		};
		$('.half-hidden').each(change_opacity)
		$('.gsc-clear-button').each(change_opacity)
		});

