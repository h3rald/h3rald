require 'rubygems'
require 'glyph'

Glyph.class_eval do

	macro :article do
		interpret %{textile[
			#@value
		]}
	end

end
