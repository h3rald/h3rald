function h3rald_search(){
  var q = $("#h3rald-search-box");
  var rs = $("#h3rald-search-results");
  $.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyD3AAPBIEBeujPRhfEAEp0rxm0_gBVm104&cx=003503231605187715852:_cygcrnuzrg&q="+q.val(), function( data ) {
    rs.empty();
    var info = data.searchInformation;
    $("main").hide();
    rs.removeClass("hidden");
    rs.append("<h2>Search results for <em>"+data.queries.request[0].searchTerms+"</em></h2>");
    $.each(data.items, function(i, e){
      var res = $("<section class=\"search-result\"></section>");
      var rel_url = e.link.replace(/^https?:\/\/h3rald.com/, '');
      var link = function(title){ return "<a href=\""+rel_url+"\">"+title+"</a>"}
      res.append("<h3>"+link(e.htmlTitle)+"</h3>");
      res.append("<p class=\"search-result-link\">"+link("h3rald.com"+rel_url)+"</p>");
      res.append("<p class=\"search-result-snippet\">"+e.htmlSnippet.replace("<br>", "")+"</p>");
      rs.append(res);
    });
  });
}
