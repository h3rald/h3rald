
$(document).ready(function() {
		$.slider();
		$('#up-arrow').click(function(){ $.scrollTo('#header', 1000)});
		$('#down-arrow').click(function(){ $.scrollTo('#footer', 1000)});
		$('.half-hidden').each(function() {
			$(this).hover(function() {
				$(this).stop().animate({ opacity: 1.0 }, 300);
				},
				function() {
				$(this).stop().animate({ opacity: 0.3 }, 300);
				});
			});
		});

