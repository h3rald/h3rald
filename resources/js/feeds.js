function format_date(d){
	return $.timeago(Date.parse(d));
}

function feed_entry(entry, element){
	var published_at = format_date(entry.publishedDate); 
	var it = $("<li></li>").addClass('feed-item');
	switch(element)
	{
		case "#twitter":
			var content = entry.title
			.replace(/^h3rald:/, '')
			.replace(/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)/, '<a href="$1">$1</a>')
			.replace(/ @([a-zA-Z1-9_]*)/, ' <a href="http://www.twitter.com/$1">@$1</a>')
			.replace(/ #([a-zA-Z1-9_]*)/, ' <a href="http://www.twitter.com/search?q=%23$1">#$1</a>')
			dt = $("<span></span>").addClass('feed-item-date').html(published_at+":");
			tx = $("<span>&#0187; </span>").addClass('feed-item-text').html(content);
			it.append(dt);
			it.append(tx)
			break;
		case "#delicious":
			var content = "<a href='"+entry.link+"'>"+entry.title+"</a>";
			content += "<br />tags: ";
			var categories = Array();
			for (i=0; i<entry.categories.length; i++)
			{
				categories[i] = "<a href='http://delicious.com/h3rald/"+entry.categories[i]+"'>"+entry.categories[i]+"</a> ";
			}
			content += categories.join(', ').replace(/ $/, '');
			dt = $("<span></span>").addClass('feed-item-date').html(published_at+":");
			tx = $("<span>&#0187; </span>").addClass('feed-item-text').html(content);
			it.append(dt);
			it.append(tx)
			break;
	}
	return it;
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
		feed_list.append(feed_entry(entry, element)).fadeIn(1000);
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
function backtype_comments(max)
{
	$.getJSON("/data/comments.json",
			function(data){
			var comment_list = $("<ul></ul>");
			$.each(data.comments, function(i, comment){
				c = $("<li></li>").addClass('feed-item');
				dt = $("<span></span>").addClass('feed-item-date').html(format_date(comment.comment.date)+":");
				tx = $("<span>&#0187; </span>").addClass('feed-item-text').append($('<a></a>').attr('href', comment.comment.url).html(comment.post.title));
				c.append(dt);
				c.append(tx);
				c.appendTo(comment_list);
				if ( i == max ) {
					comment_list.appendTo("#backtype").fadeIn(1000);
					return false;	
					}
				});
			});
}
