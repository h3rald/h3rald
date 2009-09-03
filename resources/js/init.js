$('img.hover').preload({find: '.png', replace: '_h.png'})
$('img.hover').hover(function(){
		this.src = this.src.replace('.png','_h.png');	
	},function(){
		this.src = this.src.replace('_h','');
	});

$(document).ready(function() {
		$('.timeago').timeago();
		// Drop Caps
		$('h2 + p').each(function(){
			var first_paragraph = this;//$('#content p')[0];
			if (!first_paragraph) return false;
			var node = first_paragraph;
			while (node.childNodes.length) {
			node = node.firstChild;
			}
			var text = node.nodeValue;
			if (!text) return false;
			var first_letter = text.substr(0,1);
			if (first_letter.match(/[a-z]/i)){
				node.nodeValue = text.slice(1,text.length);
				$('<span></span>').addClass('dropcap').html(first_letter).prependTo( first_paragraph );
			}
			});
		});

