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
		contents = %{\n#{count} items are tagged with _#{name}_:

<% @site.pages.select{|p| p.attributes[:tags] && p.attributes[:tags].include?('#{name}')}.sort{|a,b| a.attributes[:date] <=> b.attributes[:date]}.reverse.each do |pg|
dir = (pg.attributes[:type] == 'page') ? '' : '/articles'
%>* <span class="<%= pg.attributes[:type] %>_link"> <a href="<%= dir %>/<%= pg.attributes[:permalink] %>/"><%= pg.attributes[:title] %></a></span>
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

	task :build_tag_pages do
		site = Nanoc::Site.new(YAML.load_file('config.yaml'))
		site.load_data
		tagdir = Pathname(Dir.pwd)/'content/tags'
		tagdir.rmtree if tagdir.exist?
		tagdir.mkpath
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
			write_tag_page tagdir, k, v
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
