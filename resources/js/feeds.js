function format_date(d){
	return $.timeago(Date.parse(d));
}

function get_json_data(uri, max, element){
	$.getJSON(uri,
		function(data){
			var list = $("<ul></ul>");
			for (var i=0; i<max; i++){
				switch(element){
					case "#backtype":
						var item = backtype_entry(data.comments[i])
					break;
					case "#delicious":
						var item = delicious_entry(data[i])
					break;
					case "#twitter":
						var item = twitter_entry(data[i])
					break;
				}			
				item.appendTo(list);
			}
			list.appendTo(element).fadeIn(1000);
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
		categories[i] = "<a href='http://delicious.com/h3rald/"+bookmark.t[i]+"'>"+bookmark.t[i]+"</a> ";
	}
	content += categories.join(', ').replace(/ $/, '');
	dt = $("<span></span>").addClass('feed-item-date').html(format_date(bookmark.dt)+":");
	tx = $("<span>&#0187; </span>").addClass('feed-item-text').html(content);
	it.append(dt);
	it.append(tx);
	return it
}


// http://api.backtype.com/user/h3rald/comments.json?key=47bf0031e3a18a598b85&html=1
function display_opinions(max){
	get_json_data("/data/opinions.json", max, '#backtype')
}

// http://twitter.com/status/user_timeline/h3rald.json
function display_tweets(max){
	get_json_data("/data/tweets.json", max, '#twitter')
}

// http://feeds.delicious.com/v2/json/h3rald
function display_bookmarks(max){
	get_json_data("/data/bookmarks.json", max, '#delicious')
}

/*
http://github.com/api/v2/json/commits/list/h3rald/concatenative/master 
http://github.com/api/v2/json/commits/list/h3rald/redbook/master 
http://github.com/api/v2/json/commits/list/h3rald/glyph/master 
http://github.com/api/v2/json/commits/list/h3rald/stash/master 
http://github.com/api/v2/json/commits/list/h3rald/rawline/master 
http://github.com/api/v2/json/commits/list/h3rald/h3rald/master 
*/
