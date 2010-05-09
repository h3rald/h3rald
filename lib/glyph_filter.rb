require 'rubygems'
require 'glyph'

class GlyphFilter < Nanoc3::Filter
	identifier :glyph

	def run(content, args)
		doc = %{
		section[
#{content}
		]}
		Glyph.filter doc
	end

end
