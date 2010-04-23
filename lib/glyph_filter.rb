require 'rubygems'
require 'glyph'

class GlyphFilter < Nanoc3::Filter
	identifier :glyph

	def run(content, args)
		doc = %{
		textile[
				section[
					#{content}
				]
		]}
		Glyph.filter doc
	end

end
