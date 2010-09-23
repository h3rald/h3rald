# Monkey patch Nanoc::Helpers::Filtering
require 'coderay'

module Nanoc3::Helpers::Filtering

	def highlight(syntax, &block)
		data = capture(&block)
		# Reconvert <% %>
		data.gsub! /&lt;%/, '<%'
		data.gsub! /%&gt;/, '%>'
		filtered_data = CodeRay.scan(data.strip, syntax).div(:line_numbers => :inline, :tab_width => 2, :css =>:class)
		filtered_data = "<notextile>\n"+filtered_data+"\n</notextile>"
		buffer = eval('_erbout', block.binding)
		buffer << filtered_data
	end

end

include Nanoc3::Helpers::Filtering
