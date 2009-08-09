
# Monkey patch Nanoc::Helpers::Filtering

module Nanoc::Helpers::Filtering

	def highlight(syntax, &block)
		# Seamlessly ripped off from the filter method...
		# Capture block
		data = capture(&block)
		# Reconvert <% %>
		data.gsub! /&lt;%/, '<%'
		data.gsub! /%&gt;/, '%>'
		# Filter captured data
		filtered_data = "\n<notextile>"+Albino.colorize(data, syntax)+"</notextile>\n" rescue data 
		# Append filtered data to buffer
		buffer = eval('_erbout', block.binding)
		buffer << filtered_data
	end

end

include Nanoc::Helpers::Filtering
