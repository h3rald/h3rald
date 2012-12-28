class Nanoc3::RuleContext

  require 'glyph'

	def glyph_config(item)
		Glyph['document.intro'] = RedCloth.new("#{item[:intro]}\n\n#{item[:extended_intro]}").to_html
		Glyph['document.date'] = item[:date].strftime "%A, %d %B %Y"
		Glyph['document.title'] = item[:title]
		Glyph['document.subtitle'] = item[:subtitle]
		Glyph['document.author'] = "Fabio Cevasco"
		Glyph.filter Glyph.file_load("#{Dir.pwd}/lib/data.glyph")
	end

	def glyph_pdf_for(item)
		Glyph['document.output'] = 'pdf'
		Glyph['output.pdf.generator'] = "prince"
		Glyph['site.root'] = ".."
		f = Pathname.new "#{Dir.pwd}/output#{item.identifier.gsub(/\/$/, '')}.glyph"
		f.parent.mkpath
		doc = %{
					h3rald.article[
						@identifier[#{item.identifier}]
						@content[section[#{item.raw_content}]]
					]
		}
		# Write the new raw file using Glyph's file_write method
		Glyph.file_write f, doc
		# Now compile the PDF (works if Prince is installed)
    # Glyph.debug_mode = true
		begin
      puts "Generating PDF for '#{f}'..."
      Glyph.compile f.to_s
			f.unlink
			Pathname.new(f.to_s.gsub(/\.glyph$/, '.html')).unlink
      puts "Done."
		rescue Exception => e
      puts "Glyph Error: #{e.message}"
		end
	end

	def glyph_article_for(item)
		Glyph['document.output'] = 'html5'
		Glyph['site.root'] = ""
		filter :glyph
		layout 'default'
	end

end
