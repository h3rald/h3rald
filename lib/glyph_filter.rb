require 'rubygems'
require 'glyph'

class GlyphFilter < Nanoc3::Filter
	identifier :glyph

	def run(content, args)
		Glyph.filter content
	end

end
