require 'rubygems'
require 'bb-ruby'

class BbcodeFilter < Nanoc3::Filter
	identifier :bbcode

	def run(content, args)
		content.bbcode_to_html
	end

end
