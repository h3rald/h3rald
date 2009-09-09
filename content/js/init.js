-----
-----
$(function() {
		$('#gallery a').lightBox();
		});
$(document).ready(function() {
		$('.timeago').timeago();
		// Drop Caps
		$('.content-body p').each(function(){
			var first_paragraph = $('.content-body p:first');
			first_paragraph.addClass('first-p');
			if (!first_paragraph) return false;
			var t = first_paragraph.html();
			var first_letter = t.substr(0,1);
			if (first_letter.match(/[a-z]/i)){
				first_paragraph.html(t.slice(1,t.length));
				$('<span></span>').addClass('dropcap').html(first_letter).prependTo( first_paragraph );
			}
			});
		});

