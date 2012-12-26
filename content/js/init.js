$(document).ready(function() {
	// Manage dates
	$('.timeago').timeago();
	// Hyphenate contents 
	Hyphenator.run();
	// IE6 Warning
	var sevenup_options = {
  enableClosing: false,
  enableQuitBuggingMe: false,
  overlayColor: "#000000",  
  lightboxColor: "#ffffff",
  borderColor: "#6699ff",
  downloadLink: "http://www.google.com/chrome",
  overrideLightbox: false,
  lightboxHTML: null,
  showToAllBrowsers: false
	};
	sevenUp.plugin.black.test(sevenup_options, false);
});

