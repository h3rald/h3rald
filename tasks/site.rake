require 'rubygems'
require 'extlib'
require 'pathname'
require 'fileutils'
require 'nanoc3'
require "#{Dir.pwd}/lib/utils.rb"

include SiteUtils

namespace :site do

	task :article, :name do |t, args|
		raise RuntimeError, "Name not specified" unless args[:name]
		raise RuntimeError, "Article name can only contain letters, numbers and dashes" unless args[:name].match /^[a-zA-Z0-9-]+$/
		meta = {}
		meta[:permalink] = args[:name]
		meta[:title] = nil
		meta[:subtitle] = nil
		meta[:type] = 'article'
		meta[:intro] = " |\n  "
		meta[:extended_intro] = " |\n  "
		meta[:tags] = nil
		meta[:date] = Time.now
		meta[:pdf] = true
		file = Pathname.new Dir.pwd/"content/articles/#{meta[:permalink]}.glyph"
		raise "File '#{file}' already exists!" if file.exist?
		write_item file, meta, "$[document.intro]\n\n"
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
