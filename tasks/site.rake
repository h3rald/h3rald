require 'rubygems'
require 'extlib'
require 'pathname'
require 'fileutils'
require 'nanoc'

module SiteUtils

	def write_tag_page(dir, name, count)
		# Create tag page
		meta = {}
		meta[:title] = "Tag: #{name}"
		meta[:type] = 'page'
		meta[:filters_pre] = ['erb', 'redcloth']
		meta[:permalink] = name
		pl = (count == 1) ? ' is' : 's are'
		contents = %{\n#{count} item#{pl} tagged with _#{name}_:

<% @site.pages.select{|p| p.attributes[:tags] && p.attributes[:tags].include?('#{name}')}.sort{|a,b| a.attributes[:date] <=> b.attributes[:date]}.reverse.each do |pg|
%>* <span class="<%= pg.attributes[:type] %>_link"> <a href="/articles/<%= pg.attributes[:permalink] %>/"><%= pg.attributes[:title] %></a></span>
<% end %>
		}
		# Write file
		(dir/"#{name}.textile").open('w+') do |f|
			f.print "--"
			f.puts meta.to_yaml
			f.puts "-----"
			f.puts contents
		end	
	end

	def write_archive_page(dir, name, count)
		# Create archive page
		meta = {}
		meta[:title] = "Archive: #{name}"
		meta[:type] = 'page'
		meta[:filters_pre] = ['erb', 'redcloth']
		meta[:permalink] = name.downcase.gsub /\s/, '-'
		pl = (count == 1) ? ' was' : 's were'
		contents = %{\n#{count} item#{pl} written in _#{name}_:

<% articles_by_month.select{|i| i[0] == "#{name}"}[0][1].each do |pg|
%>* <span class="<%= pg.attributes[:type] %>_link"> <a href="/articles/<%= pg.attributes[:permalink] %>/"><%= pg.attributes[:title] %></a></span>
<% end %>
		}
		# Write file
		(dir/"#{meta[:permalink]}.textile").open('w+') do |f|
			f.print "--"
			f.puts meta.to_yaml
			f.puts "-----"
			f.puts contents
		end
	end
end

include SiteUtils

namespace :site do

	task :clear_output do
		output = Pathname.new(Dir.pwd)/'output'
		puts "Deleting all files in output dir..."
		output.rmtree
	end

	task :update => [:copy_resources] do
		system "nanoc co"
	end

	task :run => [:copy_resources] do
		system "nanoc aco"
	end

	task :rebuild => [:clear_output, :update] do
	end

	task :tags do
		site = Nanoc::Site.new(YAML.load_file('config.yaml'))
		site.load_data
		dir = Pathname(Dir.pwd)/'content/tags'
		dir.rmtree if dir.exist?
		dir.mkpath
		tags = {}
		# Collect tag and page data
		site.pages.each do |p|
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
		end
	end

	task :archives do
		site = Nanoc::Site.new(YAML.load_file('config.yaml'))
		site.load_data
		dir = Pathname(Dir.pwd)/'content/archives'
		dir.rmtree if dir.exist?
		dir.mkpath
		m_articles = []
		index = -1
		current_month = ""
		# Collect month and page data
		articles = site.pages.select{|p| p.attributes[:date] && p.attributes[:type] == 'article'}.sort{|a, b| a.attributes[:date] <=> b.attributes[:date]}.reverse 
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
			Pathname.new(pwd/'resources/css')]
		files = [pwd/'resources/.htaccess']
		files.each { |f| copy_f.call f }
		file_dirs.each do |d|
			d.find do |src|
				copy_f.call src
			end
		end
	end

end
