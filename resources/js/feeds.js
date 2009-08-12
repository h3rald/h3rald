function feed_entry(entry, element){
	parsed_date = Date.parse(entry.publishedDate);
	if (parsed_date){
		var published_at = parsed_date.toString('ddd, dd MMM at HH:mm:ss');
	} else {
		var published_at = entry.publishedDate;
	}
	switch(element)
	{
		case "#twitter":
			var content = "<em>&#0187; "+published_at+" GMT:</em><br />"+entry.title
			.replace(/^h3rald:/, '')
			.replace(/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)/, '<a href="$1">$1</a>')
			.replace(/ @([a-zA-Z1-9_]*)/, ' <a href="http://www.twitter.com/$1">@$1</a>')
			.replace(/ #([a-zA-Z1-9_]*)/, ' <a href="http://www.twitter.com/search?q=%23$1">#$1</a>')
			break;
		case "#delicious":
			var content = "<em>&#0187; "+published_at+":</em><br /><a href='"+entry.link+"'>"+entry.title+"</a>";
			content += "<br />tags: ";
			var categories = Array();
			for (i=0; i<entry.categories.length; i++)
			{
				categories[i] = "<a href='http://delicious.com/h3rald/"+entry.categories[i]+"'>"+entry.categories[i]+"</a> ";
			}
			content += categories.join(', ').replace(/ $/, '');
			break;
	}
	return $("<li class='feed-item'></li>").html(content);
};
function display_feed(feed, element){
	if (!feed){
		$('<p>An error occurred while retrieving this feed.</p>').appendTo(element);
		return false;
	}
	var feed_list = $("<ul></ul>");
	var entries = feed.entries;
	for(var i=0; i<entries.length; i++){
		var entry = entries[i];
		feed_entry(entry, element).appendTo(feed_list).fadeIn(1000);
	}
	feed_list.appendTo(element)
};
var delicious_feed = function(feed){
	display_feed(feed, "#delicious")
};
var twitter_feed = function(feed){
	display_feed(feed, "#twitter")
};

// http://api.backtype.com/user/h3rald/comments.json?key=47bf0031e3a18a598b85&html=1
function backtype_comments()
{
	$.getJSON("/data/comments.json",
			function(data){
			var comment_list = $("<ul></ul>");
			$.each(data.comments, function(i, comment){
				c = $("<li></li>").addClass('feed-item-ext');
				c.html("<em>&#0187; "+Date.parse(comment.comment.date).toString("dddd, d MMMM - HH:mm:ss")+" GMT:</em><br />");
				c.append($('<a></a>').attr('href', comment.comment.url).html(comment.post.title));
				c.appendTo(comment_list);
				if ( i == 6 ) {
					comment_list.appendTo("#backtype").fadeIn(1000);
					return false;	
					}
				});
			});
}
