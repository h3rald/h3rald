require 'rubygems'
require 'extlib'
require 'pathname'
require 'fileutils'
require 'nanoc3'
require "#{Dir.pwd}/lib/utils.rb"

include SiteUtils

namespace :site do

	task :clean do
		output = Pathname.new(Dir.pwd)/'output'
		puts "Deleting all files in output dir..."
		output.rmtree
		(output/'data').mkpath
	end

	task :update => [:tags, :archives, :compile] do
	end

	task :compile do
		system "nanoc3 co"
	end

	task :run do
		system "nanoc3 aco -s thin"
	end

	task :rebuild => [:clean, :update] do
	end

	task :tags do
		site = Nanoc3::Site.new('.')
		site.load_data
		dir = Pathname(Dir.pwd)/'content/tags'
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
			unless (dir/"#{k}.textile").exist? && (dir/"#{k}-rss.xml").exist? && (dir/"#{k}-atom.xml").exist? then
				puts "Creating tag pages for '#{k}'"
				write_tag_page dir, k, v 
				write_tag_feed_page dir, k, 'RSS' 
				write_tag_feed_page dir, k, 'Atom' 
			end
		end
		# Remove unused tags
		dir.children.each do |c|
			t = c.basename.to_s.gsub /(-(rss|atom))?\..+$/, ''
			unless tags[t] then
				puts "Deleting unused tag page '#{c.basename}'"
				c.delete 
			end
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
		meta[:title] = nil
		meta[:subtitle] = nil
		meta[:type] = 'article'
		meta[:intro] = nil
		meta[:extended_intro] = nil
		meta[:tags] = nil
		meta[:date] = Time.now
		meta[:toc] = true
		meta[:pdf] = true
		file = Pathname.new Dir.pwd/"content/articles/#{meta[:permalink]}.glyph"
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
		meta[:links] = [{"Documentation" => "http://rubydoc.info/gems/#{args[:name]}/#{meta[:version]}/frames"},
										{"Download" => "https://rubygems.org/gems/#{args[:name]}"},
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

end
