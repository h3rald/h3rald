$(document).ready(function() {
	$.slider();
	$.accordion();
	$('#up-arrow').click(function(){ $.scrollTo('#header', 1000)});
	$('#down-arrow').click(function(){ $.scrollTo('#footer', 1000)});
});
Cufon.replace('#navigation');
Cufon.replace('h3')('h2')('h4')('h5');

