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
	// Manage dates
	$('header.home > time').text(Date.today().toString("dddd, MMMM dS yyyy"));
	$('header.home > time').attr('datetime', Date.today().toString("yyyy-MM-dd"));
	$('.timeago').timeago();
	// Hyphenate contents 
	Hyphenator.run();
	// TOC
	$("#auto-toc ol").tableOfContents("#body-text", {startLevel: 1, depth: 6, topLinks: "&uarr;"});
});

