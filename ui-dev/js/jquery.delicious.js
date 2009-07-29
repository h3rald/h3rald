/*
 * Del.icio.us jQuery plugin
 *
 * Copyright (c) 2007 Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * $Id: jquery.delicious.js 6273 2009-03-11 13:27:54Z pmclanahan $
 */

(function($){

/**
 * Load a list of bookmarks, tags, network members, and/or fans from delicious.com for
 * a specific user using the delicious.com JSON feeds (http://delicious.com/help/feeds/),
 * and without need for any server-side component.
 *
 * @param String user The delicious.com user who's bookmarks you want to load.
 * @param Map options key/value pairs of optional settings for the list display.
 * @option String type (posts|tags|network|fans) The type of information you wish to retrieve. Default: 'posts'
 * @option String itemTag The type of HTML element you wish to surround every item in the list. Default: 'li'
 * @option String wrapTag The type of HTML element you wish to surround the entire list. Default: 'ul'
 * @option Boolean append If true, this will cause the new list to be appended to the selected elements, if false it will replace it's contents with the list. Default: false
 * @option Boolean favicon If true and the type option is posts, this will attempt to load the favicon.ico file from the domain of each bookmark. Default: true
 * @param Map tOptions key/value pairs of optional settings for the list itself.
 * @option Interger count Available for types 'posts' and 'tags'. Indicates the number of items to retrieve.
 * @option Interger atleast Available for type 'tags'. Select only tags with this minimum number of posts associated.
 * @option String sort (alpha|count) Available for type 'tags'. Sort the list alphanumerically or by number of posts respectively.
 *
 * @type jQuery
 * @name Delicious.com
 * @cat Plugins/Delicious.com
 *
 */
$.fn.delicious = function(user,options,tOptions,cbFnc){
	$.defineTag('script');
	var opts = $.extend({'user':user},$.delicious.opts,options),
		$self = this,
		fn = cbFnc || jQuery.delicious.parsers[opts.type],
		url = 'http://feeds.delicious.com/v2/json/' + (opts.type=='posts'?'':opts.type+'/') + user
			+ (opts.type=='posts' && opts.tag? '/'+opts.tag : '') + '?',
		rOpts = $.extend({raw:'true',callback:name(fn)},$.delicious.types[opts.type],tOptions);

	// prepare tag names for DOM Creator
	opts.itemTag = opts.itemTag.toUpperCase();
	opts.wrapTag = opts.wrapTag.toUpperCase();
	url += $.param(rOpts);
	// removed below due to jQuery 1.1.4 changing behavoir of append() to use $.ajax() to append script elements
	// which failed b/c of cross domain security
	//$('head').append($.SCRIPT({src:url,type:'text/javascript'}));
	document.getElementsByTagName('head')[0].appendChild($.SCRIPT({src:url,type:'text/javascript'}));
	return $self;

	// Ingenious name() closure function from Michael Geary
	// http://mg.to/2006/01/25/json-for-jquery
	function name( callback ) {
		var i = $.delicious.callbacks.length;

		$.delicious.callbacks[i] = function( json ) {
			delete $.delicious.callbacks[i];
			$self.each( function() { callback.apply(this,[json,opts]); } );
		};

		return 'jQuery.delicious.callbacks['+i+']';
	};
};

$.delicious = {

	callbacks : [],

	opts : {
		type : 'posts', // possible values = posts, tags, url, network, or fans
		itemTag : 'li',
		wrapTag : 'ul',
		append : false,
		favicon : true,
		popopen : false
	},

	types : {
		posts : {
			count : 20
		},
		tags : {
			count : 20,
			atleast : 1,
			sort : 'alpha'
		},
		network : {},
		fans : {}
	},

	// Prebuilt Callback Functions
	parsers : {
		posts : function(data,opts){
			var lis = [];
			$.each(data,function(i,oPost){
				var fIcon, oSpan;
				if(opts.favicon)
					fIcon = $.IMG({src:oPost.u.split('/').splice(0,3).join('/')+'/favicon.ico',height:16,width:16,border:0})
				var a_opts = {href:oPost.u}
				if(opts.popopen) a_opts['target'] = '_blank';
				lis[lis.length] = $[opts.itemTag]({},
					$.A(a_opts, opts.favicon ? fIcon : '',
						oSpan = $.SPAN({},oPost.d)
					)
				);
				if(opts.favicon){
					$(fIcon).css({display:'none',position:'absolute'})
						.bind('load',function(){$(this).show('slow')});
					$(oSpan).css({marginLeft:'20px',display:'block'});
				}
			});
			if(!lis.length){
				lis[lis.length] = $[opts.itemTag]({},
					'No posts available'
				);
			}
			$.delicious.add(this,$[opts.wrapTag]({},lis),opts);
		},
		tags : function(data,opts){
			var lis = [];
			$.each(data,function(tName,tCount){
				var fIcon, oSpan;
				var a_opts = {href:'http://delicious.com/'+opts.user+'/'+tName};
				if(opts.popopen) a_opts['target'] = '_blank';
				lis[lis.length] = $[opts.itemTag]({},
					$.A(a_opts, tName + ' ('+tCount+')')
				);
			});
			if(!lis.length){
				lis[lis.length] = $[opts.itemTag]({},
					'No tags available'
				);
			}
			$.delicious.add(this,$[opts.wrapTag]({},lis),opts);
		},
		network : function(data,opts){
			var lis = [];
			$.each(data,function(i,name){
				var a_opts = {href:'http://delicious.com/'+name};
				if(opts.popopen) a_opts['target'] = '_blank';
				lis[lis.length] = $[opts.itemTag]({},
					$.A(a_opts, name)
				);
			});
			if(!lis.length){
				lis[lis.length] = $[opts.itemTag]({},
					'Nothing in network'
				);
			}
			$.delicious.add(this,$[opts.wrapTag]({},lis),opts);
		},
		fans : function(data,opts){
			var lis = [];
			$.each(data,function(i,name){
				var a_opts = {href:'http://delicious.com/'+name};
				if(opts.popopen) a_opts['target'] = '_blank';
				lis[lis.length] = $[opts.itemTag]({},
					$.A(a_opts, name)
				);
			});
			if(!lis.length){
				lis[lis.length] = $[opts.itemTag]({},
					'No fans'
				);
			}
			$.delicious.add(this,$[opts.wrapTag]({},lis),opts);
		}
	},

	add : function(elm,obj,opts){
		$(elm)[opts.append?'append':'html'](obj);
	}

};

/*
 * Code below by Michael Geary
 * Included for convenience
 */

// DOM element creator for jQuery and Prototype by Michael Geary
// http://mg.to/topics/programming/javascript/jquery
// Inspired by MochiKit.DOM by Bob Ippolito
// Free beer and free speech. Enjoy!

$.defineTag = function( tag ) {
	$[tag.toUpperCase()] = function() {
		return $._createNode( tag, arguments );
	}
};

(function() {
	var tags = [
		'a', 'br', 'button', 'canvas', 'div', 'fieldset', 'form',
		'h1', 'h2', 'h3', 'hr', 'img', 'input', 'label', 'legend',
		'li', 'ol', 'optgroup', 'option', 'p', 'pre', 'select',
		'span', 'strong', 'table', 'tbody', 'td', 'textarea',
		'tfoot', 'th', 'thead', 'tr', 'tt', 'ul' ];
	for( var i = tags.length - 1;  i >= 0;  i-- ) {
		$.defineTag( tags[i] );
	}
})();

$.NBSP = '\u00a0';

$._createNode = function( tag, args ) {
	var fix = { 'class':'className', 'Class':'className' };
	var e;
	try {
		var attrs = args[0] || {};
		e = document.createElement( tag );
		for( var attr in attrs ) {
			var a = fix[attr] || attr;
			e[a] = attrs[attr];
		}
		for( var i = 1;  i < args.length;  i++ ) {
			var arg = args[i];
			if( arg == null ) continue;
			if( arg.constructor != Array ) append( arg );
			else for( var j = 0;  j < arg.length;  j++ )
				append( arg[j] );
		}
	}
	catch( ex ) {
		alert( 'Cannot create <' + tag + '> element:\n' +
			args.toSource() + '\n' + args );
		e = null;
	}

	function append( arg ) {
		if( arg == null ) return;
		var c = arg.constructor;
		switch( typeof arg ) {
			case 'number': arg = '' + arg;  // fall through
			case 'string': arg = document.createTextNode( arg );
		}
		e.appendChild( arg );
	}

	return e;
};

})(jQuery);
