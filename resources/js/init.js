Cufon.replace('#navigation a', {fontFamily: 'Mutlu', hover: true, fontSize: '35px'});
Cufon.replace('h2', {fontFamily: 'Mutlu', fontSize: '40px'});
Cufon.replace('h3', {fontFamily: 'Mutlu', hover: true, fontSize: '35px'});
Cufon.replace('.standard h4', {fontFamily: 'Mutlu', fontSize: '28px'});
$(document).ready(function() {
		// Feeds
		display_opinions(7);
		display_tweets(7);
		display_bookmarks(7);
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
			if (first_letter.match(/a-zA-Z/))
			{
				node.nodeValue = text.slice(1,text.length);
				$('<span></span>').addClass('dropcap').html(first_letter).prependTo( first_paragraph );
			}
			});
		Cufon.replace('.dropcap', {fontFamily: 'Mutlu'});
		});
Cufon.now();

