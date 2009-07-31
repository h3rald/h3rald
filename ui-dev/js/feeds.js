function feed_entry(entry){
	var published_at = $.timeago(entry.publishedDate)
	var link = $("<a>"+entry.title+"</a>").attr('href', entry.link);
	return $("<li class='feed-item'></li>").attr("title", published_at).html(link);
};
function display_feed(feed, element){
	if(!feed){
		return false;
	}
	var feed_list = $("<ul></ul>")
	for(var i=0; i<feed.entries.length; i++){
		var entry = feed.entries[i];
		feed_entry(entry).appendTo(feed_list);
	}
	feed_list.appendTo(element)
};
var delicious_feed = function(feed){
	display_feed(feed, "#delicious")
};
var backtype_feed = function(feed){
	display_feed(feed, "#backtype")
};
$.jGFeed('http://feeds.delicious.com/v2/rss/h3rald', delicious_feed, 10)
$.jGFeed('http://feeds.backtype.com/home/21105', backtype_feed, 10)
