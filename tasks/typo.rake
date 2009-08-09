require 'rubygems'
require 'extlib'
require 'pathname'
require 'fileutils'
begin
	require 'mysql'
	require 'sequel'
rescue Exception => e
end
require 'yaml'
require 'iconv'

module TypoUtils

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
		path.mkpath
		(path/name).open('w+') do |f|
			f.print "--"
			f.puts meta.to_yaml
			f.puts "-----"
			f.puts contents
		end	
	end

end

include TypoUtils

namespace :typo do

	task :migrate, :db, :usr, :pwd, :host do |t, args|
		raise RuntimeError, "Please provide :db, :usr, :pass" unless args[:db] && args[:usr] && args[:pwd]
		db = Sequel.mysql args[:db], :user => args[:usr], :password => args[:pwd], :host => args[:host] || 'localhost'
		# Remove all existing pages!
		dir = Pathname.new(Dir.pwd/'content')
		dir.rmtree if dir.exist?
		dir.mkpath
		# Prepare page data
		dataset = db[:contents].where("state = 'published' || type = 'Page'")
		total = dataset.count 
		c = 1
		total_tags = []
		dataset.each do |a|
			puts "Migrating [#{c}/#{total}]: '#{a[:title]}'..."
			meta = {}
			meta['tags'] = get_tags a[:keywords]
			meta['comments'] = get_comments db, a[:id]
			meta['permalink'] = a[:permalink] || a[:name]
			meta['title'] = a[:title]
			meta['type'] = a[:type].downcase
			meta['date'] = a[:published_at]
			meta['toc'] = true
			meta['filters_pre'], extension = get_filter db, a[:text_filter_id]
			contents = convert_code_blocks meta, a[:body]+a[:extended].to_s
			write_page meta, contents, extension
			c = c+1
		end
	end

end
