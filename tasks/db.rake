require 'rubygems'
require 'extlib'
require 'pathname'
require 'fileutils'
require 'mysql'
require 'sequel'
require 'yaml'


namespace :db do

	task :migrate => [:migrate_contents] do
	end

	task :migrate_contents, :db, :usr, :pwd do |t, args|
		raise RuntimeError, "Please provide :db, :usr, :pass" unless args[:db] && args[:usr] && args[:pwd]
		write_article = lambda do |meta, contents|
			path = (meta['type'] == 'article') ? Pathname.new(Dir.pwd)/"content/articles/" :  Pathname.new(Dir.pwd)/"content/"
			name = "#{meta['permalink']}.#{meta['filter_pre']}"
			path.mkpath
			(path/name).open('w+') do |f|
				f.print "--"
				f.puts meta.to_yaml
				f.puts "-----"
				f.puts contents
			end	
		end
		db = Sequel.mysql args[:db], :user => args[:usr], :password => args[:pwd], :host => 'localhost'
		db[:contents].where("state = 'published' || type = 'Page'").each do |a|
			meta = {}
			meta['tags'] = (a[:keywords]) ? a[:keywords].downcase.split(", ") : []
			meta['filter_pre'] = db[:text_filters].where("id = ?", a[:text_filter_id]).get(:name).downcase
			meta['permalink'] = a[:permalink] || a[:name]
			meta['title'] = a[:title]
			meta['type'] = a[:type].downcase
			write_article.call meta, a[:body]+a[:extended].to_s
		end
	end

end
