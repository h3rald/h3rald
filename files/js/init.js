
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
		$('.half-hidden').css('opacity', 0.3);
		$('.half-hidden').each(change_opacity)

		// Drop Caps
		$('h2 + p').each(function(){
		var first_paragraph = this;//$('#content p')[0];
		if (!first_paragraph) return false;
		var node = first_paragraph;
		while (node.childNodes.length) {
			node = node.firstChild;
		}
		var text = node.nodeValue;
		var first_letter = text.substr(0,1);
		var match = /[a-zA-Z]/.test(first_letter);
		if ( match ) {
			$('<span></span>').addClass('dropcap').html(first_letter).prependTo( first_paragraph );
		}
		});
		Cufon.replace('.dropcap', {fontFamily: 'Chopin'});

});

