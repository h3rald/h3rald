
$(document).ready(function() {
		$.preloadCssImages();
		$.slider();
		$('#up-arrow').click(function(){ $.scrollTo('#header', 1000)});
		$('#down-arrow').click(function(){ $.scrollTo('#footer', 1000)});
		// Feeds
		backtype_comments();
		$.jGFeed('http://feeds.delicious.com/v2/rss/h3rald', delicious_feed, 6);
		$.jGFeed('http://twitter.com/statuses/user_timeline/h3rald.rss', twitter_feed, 8);
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
			Cufon.replace('.dropcap', {fontFamily: 'Mutlu', fontSize: '40px'});
			};
		});
});

