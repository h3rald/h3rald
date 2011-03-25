function format_date(d){
	return $.timeago(Date.parse(d));
}

function get_json_data(uri, options){
	$.getJSON(uri,
		function(data){
			var list = $("<ul></ul>");
			for (var i=0; i<options.max; i++){
				var item = github_entry(data.commits[i], options.repo)
				item.appendTo(list);
			}
			list.appendTo(options.element).fadeIn(1000);
		});
}

function github_entry(commit, repo){
	var it = $("<li></li>").addClass('commit-data');
	var dt = $("<span></span>").addClass('commit-date').html(format_date(commit.committed_date)+" &middot; ");
	var link = $("<span></span><br />").addClass('commit-link').append($('<a></a>').attr('href', "https://github.com" + commit.url).html("&raquo; VIEW"));
	var tx = $("<span></span>").addClass('commit-text').html(commit.message
		.replace(/(closes) #(\d+)/ig, "$1 <a href='http://github.com/h3rald/"+repo+"/issues/#issue/$2'>#$2</a>")+"<br />");
	it.append(tx);
	it.append(dt);
	it.append(link);
	return it
}


/*
http://github.com/api/v2/json/commits/list/h3rald/concatenative/master 
http://github.com/api/v2/json/commits/list/h3rald/redbook/master 
http://github.com/api/v2/json/commits/list/h3rald/glyph/master 
http://github.com/api/v2/json/commits/list/h3rald/stash/master 
http://github.com/api/v2/json/commits/list/h3rald/rawline/master 
http://github.com/api/v2/json/commits/list/h3rald/h3rald/master 
http://github.com/api/v2/json/commits/list/h3rald/ruby-compendium/master 
*/
function display_commits(max, repo)
{
	get_json_data("/data/"+repo+".json", {max: max, element: '#github', repo: repo})
}
