google.load('search', '1');

function OnLoad() {
  // create a search control
  var searchControl = new google.search.SearchControl();

  // create a draw options object so that we
  // can position the search form root
  var draw_options = new google.search.DrawOptions();
  draw_options.setSearchFormRoot(document.getElementById("search_form"));

  // populate with searchers
  var webSearch = new google.search.WebSearch();
	webSearch.setSiteRestriction('h3rald.com');
	var search_options = new google.search.SearcherOptions();
	search_options.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);

  searchControl.addSearcher(webSearch, search_options);


  searchControl.draw(document.getElementById("search_results"), draw_options);
}
google.setOnLoadCallback(OnLoad);
