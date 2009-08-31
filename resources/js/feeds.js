function format_date(d){
	return $.timeago(Date.parse(d));
}

function get_json_data(uri, options){
	$.getJSON(uri,
		function(data){
			var list = $("<ul></ul>");
			for (var i=0; i<options.max; i++){
				switch(options.element){
					case "#backtype":
						var item = backtype_entry(data.comments[i])
					break;
					case "#delicious":
						var item = delicious_entry(data[i])
					break;
					case "#twitter":
						var item = twitter_entry(data[i])
					break;
					case "#github":
						var item = github_entry(data.commits[i], options.repo)
					break;
				}			
				item.appendTo(list);
			}
			list.appendTo(options.element).fadeIn(1000);
		});
}

function backtype_entry(comment){
	var c = $("<li></li>").addClass('feed-item');
	var dt = $("<span></span>").addClass('feed-item-date').html(format_date(comment.comment.date)+":");
	var tx = $("<span>&#0187; </span>").addClass('feed-item-text').append($('<a></a>').attr('href', comment.comment.url).html(comment.post.title));
	c.append(dt);
	c.append(tx);
	return c
}

function twitter_entry(tweet){
	var it = $("<li></li>").addClass('feed-item');
	var content = tweet.text
		.replace(/^h3rald:/, '')
		.replace(/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)/g, '<a href="$1">$1</a>')
		.replace(/@([a-zA-Z1-9_]*)/g, '<a href="http://www.twitter.com/$1">@$1</a>')
		.replace(/#([a-zA-Z1-9_]*)/g, '<a href="http://www.twitter.com/search?q=%23$1">#$1</a>')
	var dt = $("<span></span>").addClass('feed-item-date').html(format_date(tweet.created_at)+":");
	var tx = $("<span>&#0187; </span>").addClass('feed-item-text').html(content);
	it.append(dt);
	it.append(tx);
	return it
}

function delicious_entry(bookmark){
	var it = $("<li></li>").addClass('feed-item');
	var content = "<a href='"+bookmark.u+"'>"+bookmark.d+"</a>";
	content += "<br />tags: ";
	var categories = Array();
	for (i=0; i<bookmark.t.length; i++)
	{
		categories[i] = "<a href='http://delicious.com/h3rald/"+bookmark.t[i]+"'>"+bookmark.t[i]+"</a>";
	}
	content += categories.join(', ').replace(/ $/, '');
	var dt = $("<span></span>").addClass('feed-item-date').html(format_date(bookmark.dt)+":");
	var tx = $("<span>&#0187; </span>").addClass('feed-item-text').html(content);	
	it.append(dt);
	it.append(tx);
	return it
}

function github_entry(commit, repo){
	var it = $("<li></li>").addClass('commit-data');
	var dt = $("<span></span>").addClass('commit-date').html(format_date(commit.committed_date)+" &middot; ");
	var link = $("<span></span><br />").addClass('commit-link').append($('<a></a>').attr('href', commit.url).html("View"));
	var tx = $("<span></span>").addClass('commit-text').html(commit.message
		.replace(/(closes) #(\d+)/ig, "$1 <a href='http://github.com/h3rald/"+repo+"/issues/#issue/$2'>#$2</a>")+"<br />");
	it.append(tx);
	it.append(dt);
	it.append(link);
	return it
}


// http://api.backtype.com/user/h3rald/comments.json?key=47bf0031e3a18a598b85&html=1
function display_opinions(max){
	get_json_data("/data/opinions.json", {max: max, element: '#backtype'})
}

// http://twitter.com/status/user_timeline/h3rald.json
function display_tweets(max){
	get_json_data("/data/tweets.json", {max: max, element: '#twitter'})
}

// http://feeds.delicious.com/v2/json/h3rald
function display_bookmarks(max){
	get_json_data("/data/bookmarks.json", {max: max, element: '#delicious'})
}

/*
http://github.com/api/v2/json/commits/list/h3rald/concatenative/master 
http://github.com/api/v2/json/commits/list/h3rald/redbook/master 
http://github.com/api/v2/json/commits/list/h3rald/glyph/master 
http://github.com/api/v2/json/commits/list/h3rald/stash/master 
http://github.com/api/v2/json/commits/list/h3rald/rawline/master 
http://github.com/api/v2/json/commits/list/h3rald/h3rald/master 
*/
function display_commits(max, repo)
{
	get_json_data("/data/"+repo+".json", {max: max, element: '#github', repo: repo})
}
