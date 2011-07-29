require 'redcloth'

module Nanoc3::Helpers::Tagging

	def site_tags
		ts = {}
		@items.each do |p|
			next unless p[:tags]
			p[:tags].each do |t|
				if ts[t]
					ts[t] = ts[t]+1
				else
					ts[t] = 1 
				end
			end
		end
		ts
	end

	def tags_for(article)
		article.attributes[:tags].map{|t| %{<a class="tag" href="/tags/#{t}/">#{t}</a>}}.join
	end

	def link_for_tag(tag, base_url)
		%[<a href="#{base_url}#{tag.downcase}/" rel="tag">#{tag}</a>]
	end

	def tag_link_with_count(tag, count)
		%{#{link_for_tag(tag, '/tags/')} (#{count})}
	end 

	def sorted_site_tags
		site_tags.sort{|a, b| a[0] <=> b[0]}
	end

	def articles_tagged_with(tag)
		@site.items.select{|p| p.attributes[:tags] && p.attributes[:tags].include?(tag)}.sort{|a,b| a.attributes[:date] <=> b.attributes[:date]}.reverse
	end

end

module Nanoc3::Helpers::Blogging

	def check_data(params)
		raise RuntimeError.new('Cannot build feed: site configuration has no base_url') 	if @site.config[:base_url].nil?
		raise RuntimeError.new('Cannot build feed: feed item has no title') if @item[:title].nil?
		raise RuntimeError.new('Cannot build feed: no articles') if feed_articles(params).empty?
		raise RuntimeError.new('Cannot build feed: one or more articles doesn\'t have a date') if feed_articles(params).any? { |a| a[:date].nil? }
	end

	def feed_articles(params) 
		params[:articles] || latest_articles(10)
	end

	def feed_content_proc(params)
		params[:content_proc] || lambda { |a| a.reps[0].content_at_snapshot(:pre)}
	end

	def feed_excerpt_proc(params)
		params[:excerpt_proc] || lambda { |a| a[:excerpt] }
	end

	def rss_feed(params={})
		require 'builder'
		require 'time'
		check_data params
		# Create builder
		buffer = ''
		xml = Builder::XmlMarkup.new(:target => buffer, :indent => 2)
		# Build feed
		xml.instruct!
		xml.rss(:version => '2.0') do
			xml.channel do
				xml.title @item[:title]
				xml.language 'en-us'
				xml.lastBuildDate feed_articles(params).first[:date].rfc822
				xml.ttl '40'
				xml.link @site.config[:base_url]
				xml.description
				feed_articles(params).each do |a|
					xml.item do
						xml.title a[:title]
						xml.description feed_content_proc(params).call(a)
						xml.pubDate a[:date].rfc822
						xml.guid url_for(a)
						xml.link url_for(a)
						xml.author @site.config[:author_email]
						xml.comments url_for(a)+'#comments'
						a[:tags].each do |t|
							xml.category t
						end
					end
				end
			end
			buffer
		end
	end

	# Redefine atom_feed method
	def atom_feed(params={})
		require 'builder'
		require 'time'
		check_data params
		buffer = ''
		xml = Builder::XmlMarkup.new(:target => buffer, :indent => 2)
		xml.instruct!
		xml.feed(:xmlns => 'http://www.w3.org/2005/Atom') do
			xml.id      @site.config[:base_url] + '/'
			xml.title   @item[:title]
			xml.updated feed_articles(params).first[:date].to_iso8601_time
			xml.link(:rel => 'alternate', :href => @site.config[:base_url])
			xml.link(:rel => 'self', :href => @site.config[:base_url]+"/#{@item[:permalink]}/")
			xml.author do
				xml.name(@item[:author_name] || @site.config[:author_name])
				xml.uri(@item[:author_uri] || @site.config[:base_url])
			end
			count = 0
			feed_articles(params).each do |a|
				xml.entry do
					xml.id        atom_tag_for(a)
					xml.title     a[:title]
					xml.published a[:date].to_iso8601_time
					# Subtract a few seconds to avoid having the same update time (compilation time)
					xml.updated((a.mtime-count).to_iso8601_time)
					count = count+1
					xml.link(:rel => 'alternate', :href => url_for(a))
					a[:tags].each do |t|
						xml.category(:term => t, :scheme => "#{@site.config[:base_url]}/tags/#{t}/")
					end
					summary = feed_excerpt_proc(params).call(a)
					xml.summary   summary, :type => 'html' unless summary.nil?
					xml.content(:type => 'html') do |c|
						c << %{<![CDATA[\n#{feed_content_proc(params).call(a)}]]>\n}
					end
				end
			end
		end
		buffer
	end

	def atom_tag_for(item)
		require 'time'
		hostname        = @site.config[:base_url].sub(/.*:\/\/(.+?)\/?$/, '\1')
		formatted_date  = item[:date].to_iso8601_date
		'tag:' + hostname + ',' + formatted_date + ':' + (item.reps[0].path || item.identifier)
	end

	def latest_articles(max=nil)
		total = @site.items.select{|p| p.attributes[:type] == 'article'}.sort{|a, b| a.attributes[:date] <=> b.attributes[:date]}.reverse 
		max ||= total.length
		total[0..max-1]
	end

	def popular_articles(max=nil)
		total = @site.items.select{|p| p.attributes[:date] && p.attributes[:type] == 'article' && p.attributes[:popular]}.sort{|a, b| a.attributes[:date] <=> b.attributes[:date]}.reverse
		max ||= total.length
		total[0..max-1]
	end

	def by_permalink(articles, permalink)
		articles.select{|a| a[:permalink] == permalink}[0] rescue nil
	end

	def articles_by_month
		articles = latest_articles
		m_articles = []
		index = -1
		current_month = ""
		articles.each do |a|
			next unless a.attributes[:date]
			month = a.attributes[:date].strftime("%B %Y")
			if current_month != month then
				# new month
				m_articles << [month, [a]]
				index = index + 1
				current_month = month
			else
				# same month
				m_articles[index][1] << a
			end
		end
		m_articles
	end

	def month_link_with_count(month, count)
		permalink = month.downcase.gsub /\s/, '-'
		%{<a href="/archives/#{permalink}/">#{month}</a> (#{count})}
	end

end

include Nanoc3::Helpers::Tagging
include Nanoc3::Helpers::Blogging
include Nanoc3::Helpers::Rendering
include Nanoc3::Helpers::XMLSitemap
