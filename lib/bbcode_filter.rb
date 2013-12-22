require 'rubygems'
begin
require 'bb-ruby' 
rescue Exception
end

class BbcodeFilter < Nanoc3::Filter
	identifier :bbcode

	def run(content, args)
    custom_tags = {
      'Small' => [
        /\[small\](.*?)\[\/small\]/mi,
        '<small>\1</small>',
        'small',
        '[small]...[/small]',
        :small
      ]
    }
    content.gsub("\n", "<br />").bbcode_to_html(custom_tags, false) rescue content
	end

end
