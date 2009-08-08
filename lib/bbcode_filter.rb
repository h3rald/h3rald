require 'rubygems'
require 'bb-ruby'

class BbcodeFilter < Nanoc::Filter
	identifier :bbcode

	def run(content)
		content.bbcode_to_html
	end

end
