module Nanoc::Helpers::Tagging

	def site_tags
		ts = {}
		@pages.each do |p|
			next unless p.tags
			p.tags.each do |t|
				if ts[t]
					ts[t] = ts[t]+1
				else
					ts[t] = 1 
				end
			end
		end
		ts
	end

	def tag_link_with_count(tag, count)
		%{#{link_for_tag(tag, '/tags/')} (#{count})}
	end 

	def sorted_site_tags
		site_tags.sort{|a, b| a[1] <=> b[1]}.reverse
	end

end

module Nanoc::Helpers::Site

	def latest_articles(max=nil)
		total = @site.pages.select{|p| p.attributes[:date] && p.attributes[:type] == 'article'}.sort{|a, b| a.attributes[:date] <=> b.attributes[:date]}.reverse 
		max ||= total.length
		total[0..max-1]
	end

	def popular_articles(max=nil)
		total = @site.pages.select{|p| p.attributes[:date] && p.attributes[:type] == 'article' && p.attributes[:popular]}.sort{|a, b| a.attributes[:date] <=> b.attributes[:date]}.reverse
		max ||= total.length
		total[0..max-1]
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

include Nanoc::Helpers::Tagging
include Nanoc::Helpers::Site
