$(document).ready(function() {
	$.slider();
	$('#up-arrow').click(function(){ $.scrollTo('#header', 1000)});
	$('#down-arrow').click(function(){ $.scrollTo('#footer', 1000)});
});

