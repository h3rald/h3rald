
$(document).ready(function() {
		$.preloadCssImages();
		$.slider();
		$('#up-arrow').click(function(){ $.scrollTo('#header', 1000)});
		$('#down-arrow').click(function(){ $.scrollTo('#footer', 1000)});
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
		if (first_letter.match(/[a-zA-Z]/)){
			node.nodeValue = text.slice(1,text.length);
			$('<span></span>').addClass('dropcap').html(first_letter).prependTo( first_paragraph );
			Cufon.replace('.dropcap', {fontFamily: 'Mutlu'});
			};
		});
});

