module SiteUtils

	def write_tag_page(dir, tag, count)
		meta = {}
		meta[:title] = "Tag: #{tag}"
		meta[:type] = 'page'
		meta[:filters_pre] = ['erb']
		meta[:feed] = "/tags/#{tag}/"
		meta[:feed_title] = "Tag '#{tag}'"
		meta[:permalink] = tag
		pl = (count == 1) ? ' is' : 's are'
		contents = %{
<p>#{count} item#{pl} tagged with <em>#{tag}</em>:</p>
<ul>
	<% articles_tagged_with('#{tag}').each do |a| %>
		<%= render 'dated_article', :article => a %>
	<% end %>
</ul>
		}
		# Write html page
		write_item dir/"#{tag}.textile", meta, contents
	end

	def write_tag_feed_page(dir, tag, format)
		f = format.downcase
		meta = {}
		meta[:title] = "H3RALD - Tag '#{tag}' (#{format} Feed)"	
		meta[:type] = 'feed'
		meta[:permalink] = "tags/#{tag}/#{f}"
		contents = %{<%= #{f}_feed(:articles => articles_tagged_with('#{tag}'))%>}
		write_item dir/"#{tag}-#{f}.xml", meta, contents
	end

	def write_archive_page(dir, name, count)
		meta = {}
		meta[:title] = "Archive: #{name}"
		meta[:type] = 'page'
		meta[:filters_pre] = ['erb']
		meta[:permalink] = name.downcase.gsub /\s/, '-'
		pl = (count == 1) ? ' was' : 's were'
		contents = %{
<p>#{count} article#{pl} written in <em>#{name}</em>:</p>
<ul>
	<% articles_by_month.select{|i| i[0] == "#{name}"}[0][1].each do |a|%>
		<%= render 'dated_article', :article => a %>
	<% end %>
</ul>
		}
		# Write file
		write_item dir/"#{meta[:permalink]}.textile", meta, contents
	end

	def write_item(path, meta, contents)
		path.parent.mkpath
		(path).open('w+') do |f|
			f.print "--"
			f.puts meta.to_yaml
			f.puts "-----"
			f.puts contents
		end	
	end

end

module TypoUtils extend SiteUtils

	# Ignored by Nanoc 3
	def get_filter(db, fid)
		filter = db[:text_filters].where("id = ?", fid).get(:name).downcase
		# Multiple filters are not handled (e.g. markdown smartypants)
		filter = filter.split(' ')[0]
		# Prepare metadata
		case filter
		when 'textile' then
			return ['redcloth'], 'textile'
		when 'markdown' then
			return ['bluecloth'], 'markdown'
		when 'bbcode' then
			return ['bbcode'], 'bbcode'
		else
			return [], 'txt'
		end
	end

	def get_tags(keywords=nil)
		tags = []
		if keywords then
			if keywords.match ',' then
				tags = keywords.downcase.split(", ")
			else
				tags = keywords.downcase.split(" ")
			end
		end
		tags
	end

	def get_comments(db, aid)
		dataset = db[:feedback].where("article_id = ? && state LIKE '%ham%'", aid)
		comments = []
		dataset.each do |c|
			comment = {}
			comment[:id] = c[:id]
			comment[:author] = c[:author]
			comment[:body] = c[:body].to_s
			comment[:url] = c[:url]
			comment[:date] = c[:published_at]
			comments << comment
		end
		comments
	end	

	def convert_code_blocks(meta, contents)
		if contents.match /<typo:code/ then
			# troubles if erb filter is enabled!
			contents.gsub! /<%/, '&lt;%'
			contents.gsub! /%>/, '%&gt;'
			contents.gsub!(/<typo:code lang="([a-zA-Z0-9]+)">/, '<% highlight :\1 do %>')
			contents.gsub!(/<typo:code>/, '<% highlight :text do %>')
			contents.gsub!(/<\/typo:code>/, "<% end %>")
			meta['filters_pre'] = ['erb'].concat meta['filters_pre']
		end
		contents
	end

	def write_page(meta, contents, extension)
		path = (meta['type'] == 'article') ? Pathname.new(Dir.pwd)/"content/articles/" :  Pathname.new(Dir.pwd)/"content/"
		name = "#{meta['permalink']}.#{extension}"
		write_item path/name, meta, contents
	end

end

