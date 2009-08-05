require 'extlib'
require 'pathname'
require 'fileutils'



task :copy_files do
	pwd = Pathname.new Dir.pwd
	file_dirs = [Pathname.new(pwd/'files/images'), 
		Pathname.new(pwd/'files/js'),
		Pathname.new(pwd/'files/css')]
	file_dirs.each do |d|
		d.find do |src|
			if src.file? then
				rel_path = src.relative_path_from(pwd/'files').to_s
				dst = Pathname.new(pwd/"output/#{rel_path}")
				if !dst.exist? || dst.exist? && !FileUtils.cmp(dst.to_s, src.to_s) then
					dst.parent.mkpath
					FileUtils.cp src.to_s, dst.to_s
					puts "Copied '#{src}'."
				end
			end
		end
	end
		
end
