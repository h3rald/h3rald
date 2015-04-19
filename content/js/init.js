$(document).ready(function() {
	// Manage dates
	$('.timeago').timeago();
	// Hyphenate contents 
	Hyphenator.run();
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
  var navHeight = $('.navbar-collapse').height();

  $('.navbar-collapse').on('show.bs.collapse', function(){
    if($(this).height() != 0){
      navHeight = $(this).height();
    }
    $('body').animate({
      'padding-top': parseInt($("body").css("padding-top")) + navHeight
    }, 300);
  });

  $('.navbar-collapse').on('hide.bs.collapse', function(){
    navHeight = $(this).height();
    $('body').animate({
      'padding-top': parseInt($("body").css("padding-top")) - navHeight
    }, 300);
  });
});

