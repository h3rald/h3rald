require 'rubygems'
require 'extlib'
require 'pathname'
require 'fileutils'
require 'mysql'
require 'sequel'
require 'yaml'

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

	def convert_code_blocks(text)
		text.gsub!(/<typo:code lang="([a-zA-Z0-9]+)">/, '<% highlight :\1 do %>')
		text.gsub!(/<\/typo:code>/, "<% end %>")
		text
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

namespace :db do

	task :migrate => [:migrate_contents] do
	end

	task :migrate_contents, :db, :usr, :pwd do |t, args|
		raise RuntimeError, "Please provide :db, :usr, :pass" unless args[:db] && args[:usr] && args[:pwd]
		db = Sequel.mysql args[:db], :user => args[:usr], :password => args[:pwd], :host => 'localhost'
		# Remove all existing pages!
		dir = Pathname.new(Dir.pwd/'content')
		dir.rmtree if dir.exist?
		dir.mkpath
		# Prepare page data
		db[:contents].where("state = 'published' || type = 'Page'").each do |a|
			meta = {}
			meta['tags'] = (a[:keywords]) ? a[:keywords].downcase.split(", ") : []
			meta['permalink'] = a[:permalink] || a[:name]
			meta['title'] = a[:title]
			meta['type'] = a[:type].downcase
			meta['date'] = a[:published_at] 
			meta['filters_pre'], extension = get_filter db, a[:text_filter_id]
			contents = a[:body]+a[:extended].to_s
			if contents.match /<typo:code/ then
				contents = convert_code_blocks contents
				meta['filters_pre'] = ['erb'].concat meta['filters_pre']
			end
			write_page meta, contents, extension
		end
	end

end
