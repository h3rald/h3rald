function feed_entry(entry, element){
	var published_at = $.timeago(entry.publishedDate);

	switch(element)
	{
		case "#twitter":
			var content = entry.title
			.replace(/^h3rald:/, '')
			.replace(/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)/, '<a href="$1">$1</a>')
			.replace(/ @([a-zA-Z1-9_]*)/, ' <a href="http://www.twitter.com/$1">@$1</a>')
			.replace(/ #([a-zA-Z1-9_]*)/, ' <a href="http://www.twitter.com/search?q=%23$1">#$1</a>')
			break;
		case "#delicious":
			var content = "&#0187; <a href='"+entry.link+"'>"+entry.title+"</a>";
			content += "<br />tags: ";
			var categories = Array();
			for (i=0; i<entry.categories.length; i++)
			{
				categories[i] = "<a href='http://delicious.com/h3rald/"+entry.categories[i]+"'>"+entry.categories[i]+"</a> ";
			}
			content += categories.join(', ').replace(/ $/, '');
			break;
	}
	return $("<li class='feed-item'></li>").attr("title", published_at).html(content);
};
function display_feed(feed, element){

	if(!feed){
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
var backtype_feed = function(feed){
	display_feed(feed, "#backtype")
};
var twitter_feed = function(feed){
	display_feed(feed, "#twitter")
};

function backtype_comments()
{
	$.getJSON("js/comments.json",
			function(data){
			var comment_list = $("<ul></ul>");
			$.each(data.comments, function(i, comment){
				c = $("<li></li>").addClass('feed-item-ext').attr('title', comment.comment.content);
				c.html("<em>On: </em>");
				c.append($('<a></a>').attr('href', comment.comment.url).html(comment.post.title));
				c.appendTo(comment_list);
				if ( i == 6 ) {
					comment_list.appendTo("#backtype")
					return false;	
					}
				});
			});
}
backtype_comments()
$.jGFeed('http://feeds.delicious.com/v2/rss/h3rald', delicious_feed, 6)
$.jGFeed('http://twitter.com/statuses/user_timeline/h3rald.rss', twitter_feed, 8)
