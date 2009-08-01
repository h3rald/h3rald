function feed_entry(entry, element){
	var published_at = $.timeago(entry.publishedDate);
	
	switch(element)
	{
		case "#twitter":
			var content = entry.title
				.replace(/^h3rald:/, '')
				.replace(/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)/, '<a href="$1">#$1</a>')
				.replace(/@([a-zA-Z1-9_]*)/, '<a href="http://www.twitter.com/$1">@$1</a>')
				.replace(/#([a-zA-Z1-9_]*)/, '<a href="http://www.twitter.com/search?q=%23$1">#@$1</a>')
			break;
		case "#delicious":
			var content = "<a href='"+entry.link+"'>"+entry.title+"</a>";
			content += " (";
			var categories = Array();
			for (i=0; i<entry.categories.length; i++)
			{
				categories[i] = "<a href='http://delicious.com/popular/"+entry.categories[i]+"'>@"+entry.categories[i]+"</a> ";
			}
			content += categories.join(', ').replace(/ $/, '');
			content += ")"
			break;
		case "#backtype":
			var content = "<a href='"+entry.link+"'>"+entry.title+"</a>";
			break;
			
	}
	return $("<li class='feed-item'></li>").attr("title", published_at).html(content);
};
function display_feed(feed, element){
	if(!feed){
		return false;
	}
	var feed_list = $("<ul></ul>")
	for(var i=0; i<feed.entries.length; i++){
		var entry = feed.entries[i];
		feed_entry(entry, element).appendTo(feed_list).fadeIn(1000);
	}
	feed_list.appendTo(element)
};
var delicious_feed = function(feed){
	display_feed(feed, "#delicious")
};
var backtype_feed = function(feed){
	display_feed(feed, "#backtype")
};
var twitter_feed = function(feed){
	display_feed(feed, "#twitter")
};
$.jGFeed('http://feeds.delicious.com/v2/rss/h3rald', delicious_feed, 8)
$.jGFeed('http://feeds.backtype.com/home/21105', backtype_feed, 10)
$.jGFeed('http://twitter.com/statuses/user_timeline/h3rald.rss', twitter_feed, 7)
