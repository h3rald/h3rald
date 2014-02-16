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
  // Search
  $("#h3rald-search-btn").click(function(){
    h3rald_search();
  })
  $("#h3rald-search-box").keydown(function(e){
    q = $("#h3rald-search-box").val();
    if (q.length == 1){
      $("#h3rald-search-results").addClass("hidden");
      $("#main").show();
    }
    if (e.which == 13) {
      e.preventDefault();
      h3rald_search();
    }
  })
});

