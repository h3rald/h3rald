require 'rubygems'
begin
require 'bb-ruby' 
rescue Exception
end

class BbcodeFilter < Nanoc3::Filter
	identifier :bbcode

	def run(content, args)
		content.bbcode_to_html rescue content
	end

end
