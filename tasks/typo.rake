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
require "#{Dir.pwd}/lib/utils.rb"

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
