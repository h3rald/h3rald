require 'rubygems'
require 'extlib'
require 'pathname'
require 'fileutils'
require 'nanoc3'
require 'lib/utils.rb'

include SiteUtils

namespace :site do

	task :clean do
		output = Pathname.new(Dir.pwd)/'output'
		puts "Deleting all files in output dir..."
		output.rmtree
		(output/'data').mkpath
	end

	task :update => [:copy_resources] do
		system "nanoc3 co"
	end

	task :run => [:copy_resources] do
		system "nanoc3 aco -s thin"
	end

	task :rebuild => [:clean, :update] do
	end

	task :tags do
		site = Nanoc3::Site.new('.')
		site.load_data
		dir = Pathname(Dir.pwd)/'content/tags'
		dir.rmtree if dir.exist?
		dir.mkpath
		tags = {}
		# Collect tag and page data
		site.items.each do |p|
			next unless p.attributes[:tags]
			p.attributes[:tags].each do |t|
				if tags[t]
					tags[t] = tags[t]+1
				else
					tags[t] = 1 
				end
			end
		end
		# Write pages
		tags.each_pair do |k, v|
			write_tag_page dir, k, v
			write_tag_feed_page dir, k, 'RSS'
			write_tag_feed_page dir, k, 'Atom'
		end
	end

	task :archives do
		site = Nanoc3::Site.new('.')
		site.load_data
		dir = Pathname(Dir.pwd)/'content/archives'
		dir.rmtree if dir.exist?
		dir.mkpath
		m_articles = []
		index = -1
		current_month = ""
		# Collect month and page data
		articles = site.items.select{|p| p.attributes[:date] && p.attributes[:type] == 'article'}.sort{|a, b| a.attributes[:date] <=> b.attributes[:date]}.reverse 
		articles.each do |a|
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
		# Write pages
		m_articles.each do |m|
			write_archive_page dir, m[0], m[1].length
		end
	end

	task :article, :name do |t, args|
		raise RuntimeError, "Name not specified" unless args[:name]
		raise RuntimeError, "Article name can only contain letters, numbers and dashes" unless args[:name].match /^[a-zA-Z0-9-]+$/
		meta = {}
		meta[:permalink] = args[:name]
		meta[:title] = ""
		meta[:tags] = []
		meta[:date] = Time.now
		meta[:toc] = true
		meta[:type] = 'article'
		file = Pathname.new Dir.pwd/"content/articles/#{meta[:permalink]}.textile"
		raise "File '#{file}' already exists!" if file.exist?
		write_item file, meta, ''
	end

	task :page, :name do |t, args|
		raise RuntimeError, "Name not specified" unless args[:name]
		raise RuntimeError, "Page name can only contain letters, numbers and dashes" unless args[:name].match /^[a-zA-Z0-9-]+$/
		meta = {}
		meta[:permalink] = args[:name]
		meta[:title] = ""
		meta[:type] = 'page'
		file = Pathname.new Dir.pwd/"content/#{meta[:permalink]}.textile"
		raise "File '#{file}' already exists!" if file.exist?
		write_item file, meta, ''
	end

	task :project, :name do |t, args|
		raise RuntimeError, "Name not specified" unless args[:name]
		raise RuntimeError, "Project name can only contain letters, numbers and dashes" unless args[:name].match /^[a-zA-Z0-9-]+$/
		meta = {}
		meta[:permalink] = args[:name]
		meta[:title] = ""
		meta[:github] = args[:name]
		meta[:status] = "Active"
		meta[:version] = "0.1.0"
		meta[:type] = 'project'
		meta[:links] = [{"Documentation" => "http://#{args[:name]}.rubyforge.org"},
										{"Download" => "http://rubyforge.org/projects/#{args[:name]}"},
										{"Source" => "http://github.com/h3rald/#{args[:name]}/tree/master"}, 
										{"Tracking" => "http://github.com/h3rald/#{args[:name]}/issues"}]
		contents = %{
<%= render 'project_data', :tag => '#{args[:name]}' %>

h3. Installation

h3. Usage

<%= render 'project_updates', :tag => '#{args[:name]}' %>
		}
		file = Pathname.new Dir.pwd/"content/#{meta[:permalink]}.textile"
		raise "File '#{file}' already exists!" if file.exist?
		write_item file, meta, contents 
	end

	task :copy_resources do
		pwd = Pathname.new Dir.pwd
		copy_f = lambda do |src|
			if src.file? then
				rel_path = src.relative_path_from(pwd/'resources').to_s
				dst = Pathname.new(pwd/"output/#{rel_path}")
				if !dst.exist? || dst.exist? && !FileUtils.cmp(dst.to_s, src.to_s) then
					dst.parent.mkpath
					FileUtils.cp src.to_s, dst.to_s
					puts "Copied '#{src}'."
				end
			end
		end
		file_dirs = [Pathname.new(pwd/'resources/images'), 
			Pathname.new(pwd/'resources/js'),
			Pathname.new(pwd/'resources/img'),
			Pathname.new(pwd/'resources/files'),
			Pathname.new(pwd/'resources/css')]
		files = [pwd/'resources/.htaccess', pwd/'resources/robots.txt',  pwd/'resources/favicon.ico']
		files.each { |f| copy_f.call f }
		file_dirs.each do |d|
			d.find do |src|
				copy_f.call src
			end
		end
	end

end
