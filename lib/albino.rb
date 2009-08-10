##
# Wrapper for the Pygments command line tool, pygmentize.
#
# Pygments: http://pygments.org/
#
# Assumes pygmentize is in the path.  If not, set its location
# with Albino.bin = '/path/to/pygmentize'
#
# Use like so:
#
#   @syntaxer = Albino.new('/some/file.rb', :ruby)
#   puts @syntaxer.colorize
#
# This'll print out an HTMLized, Ruby-highlighted version
# of '/some/file.rb'.
#
# To use another formatter, pass it as the third argument:
#
#   @syntaxer = Albino.new('/some/file.rb', :ruby, :bbcode)
#   puts @syntaxer.colorize
#
# You can also use the #colorize class method:
#
#   puts Albino.colorize('/some/file.rb', :ruby)
#
# Another also: you get a #to_s, for somewhat nicer use in Rails views.
#
#   ... helper file ...
#   def highlight(text)
#     Albino.new(text, :ruby)
#   end
#
#   ... view file ...
#   <%= highlight text %>
#
# The default lexer is 'text'.  You need to specify a lexer yourself;
# because we are using STDIN there is no auto-detect.
#
# To see all lexers and formatters available, run `pygmentize -L`.
#
# Chris Wanstrath // chris@ozmm.org
#         GitHub // http://github.com
#
require 'rubygems'
require 'open3'
require 'win32/open3' if RUBY_PLATFORM.match /win32/

class Albino
	@@bin = 'pygmentize'

	def self.bin=(path)
		@@bin = path
	end

	def self.colorize(*args)
		new(*args).colorize
	end

	def initialize(target, lexer = :text, format = :html)
		@target  = File.exists?(target) ? File.read(target) : target rescue target
		@options = { :l => lexer, :f => format, :O => 'encoding=utf-8' }
	end

	def execute(command)
		output = ''
		Open3.popen3(command) do |stdin, stdout, stderr|
			stdin.puts @target
			stdin.close
			output = stdout.read.strip
			[stdout, stderr].each { |io| io.close }
		end
		output
	end

	def colorize(options = {})
		html = execute(@@bin + convert_options(options))
		# Work around an RDiscount bug: http://gist.github.com/97682
		html.to_s.sub(%r{</pre></div>\Z}, "</pre>\n</div>")
	end
	alias_method :to_s, :colorize

	def convert_options(options = {})
		@options.merge(options).inject('') do |string, (flag, value)|
			string + " -#{flag} #{value}"
		end
	end
end
