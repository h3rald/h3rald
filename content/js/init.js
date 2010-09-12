-----
-----
$(function() {
		$('#gallery a').fancybox();
		$('.fancybox').fancybox({
			frameWidth: 850,
			frameHeight: 450
		});
		});
function delicious_counter(data) {
	var posts = data[0].total_posts;
	if (!posts) return;
	var text = posts+" bookmarks";
	if (posts == 1) { text = posts+" bookmark" };
	$('#delcounter').text(text);
}
$(document).ready(function() {
		$('header.home > time').text(Date.today().toString("dddd, MMMM dS yyyy"));
		$('header.home > time').attr('datetime', Date.today().toString("yyyy-MM-dd"));
		/////////////////////////
		$('.timeago').timeago();
		// TOC
		$("#auto-toc ol").tableOfContents("#body-text", {startLevel: 1, depth: 6, topLinks: "&uarr;"});
		// Drop Caps
		/*
		var first_paragraph = $('#content-body p:first');
		if (!first_paragraph) return false;
		var t = first_paragraph.html();
		var first_letter = t.substr(0,1);
		if (first_letter.match(/[a-z]/i)){
		first_paragraph.html(t.slice(1,t.length));
			$('<span></span>').addClass('dropcap').html(first_letter).prependTo( first_paragraph );
		}
		*/
	});

