require 'rubygems'
require 'extlib'
require 'pathname'
require 'fileutils'
require 'nanoc'


namespace :site do

	task :clear_output do
		output = Pathname.new(Dir.pwd)/'output'
		puts "Deleting all files in output dir..."
		output.rmtree
	end

	task :update => [:copy_resources, :build_tag_pages] do
		system "nanoc co"
	end

	task :run => [:copy_resources, :build_tag_pages] do
		system "nanoc aco"
	end

	task :rebuild => [:clear_output, :update] do
	end

	task :build_tag_pages do
		# TODO
		#site = Nanoc::Site.new(YAML.load_file('config.yaml'))
    #site.load_data
		# site.pages.each { |p| p.tags ...}
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
			Pathname.new(pwd/'resources/css'),
			Pathname.new(pwd/'resources/data')]
		files = [pwd/'resources/.htaccess']
		files.each { |f| copy_f.call f }
		file_dirs.each do |d|
			d.find do |src|
				copy_f.call src
			end
		end
	end

end
