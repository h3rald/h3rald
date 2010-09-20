/*
	TableOfContents Plugin for jQuery (by Doug Neiner)
	
	Version: 0.8
		
	Based on code and concept by Janko Jovanovic 
	  in his article: http://www.jankoatwarpspeed.com/post/2009/08/20/Table-of-contents-using-jQuery.aspx
	
	This plugin is offered under the MIT license.
	(c) 2009 by Doug Neiner, http://dougneiner.com
*/
(function($){$.TableOfContents=function(el,scope,options){var base=this;base.$el=$(el);base.el=el;base.toc="";base.listStyle=null;base.tags=["h1","h2","h3","h4","h5","h6"];base.init=function(){base.options=$.extend({},$.TableOfContents.defaultOptions,options);if(typeof(scope)=="undefined"||scope==null)scope=document.body;base.$scope=$(scope);var $first=base.$scope.find(base.tags.join(', ')).filter(':first');if($first.length!=1)return;base.starting_depth=base.options.startLevel;if(base.options.depth<1)base.options.depth=1;var filtered_tags=base.tags.splice(base.options.startLevel-1,base.options.depth);base.$headings=base.$scope.find(filtered_tags.join(', '));if(base.options.topLinks!==false){var id=$(document.body).attr('id');if(id==""){id=base.options.topBodyId;document.body.id=id};base.topLinkId=id};if(base.$el.is('ul')){base.listStyle='ul'}else if(base.$el.is('ol')){base.listStyle='ol'};base.buildTOC();if(base.options.proportionateSpacing===true&&!base.tieredList()){base.addSpacing()};return base};base.tieredList=function(){return(base.listStyle=='ul'||base.listStyle=='ol')};base.buildTOC=function(){base.current_depth=base.starting_depth;base.$headings.each(function(i,element){var depth=this.nodeName.toLowerCase().substr(1,1);if(i>0||(i==0&&depth!=base.current_depth)){base.changeDepth(depth)};base.toc+=base.formatLink(this,depth,i)+"\n";if(base.options.topLinks!==false)base.addTopLink(this)});base.changeDepth(base.starting_depth,true);if(base.tieredList())base.toc="<li>\n"+base.toc+"</li>\n";base.$el.html(base.toc)};base.addTopLink=function(element){var text=(base.options.topLinks===true?"Top":base.options.topLinks);var $a=$("<a href='#"+base.topLinkId+"' class='"+base.options.topLinkClass+"'></a>").html(text);$(element).append($a)};base.formatLink=function(element,depth,index){var id=element.id;if(id==""){id=base.buildSlug($(element).text());element.id=id};var a="<a href='#"+id+"'";if(!base.tieredList())a+=" class='"+base.depthClass(depth)+"'";a+=">"+base.options.levelText.replace('%',$(element).text())+'</a>';return a};base.changeDepth=function(new_depth,last){if(last!==true)last=false;if(!base.tieredList()){base.current_depth=new_depth;return true};if(new_depth>base.current_depth){var opening_tags=[];for(var i=base.current_depth;i<new_depth;i++){opening_tags.push('<'+base.listStyle+'>'+"\n")};var li="<li>\n";base.toc+=opening_tags.join(li)+li}else if(new_depth<base.current_depth){var closing_tags=[];for(var i=base.current_depth;i>new_depth;i--){closing_tags.push('</'+base.listStyle+'>'+"\n")};base.toc+="</li>\n"+closing_tags.join('</li>'+"\n");if(!last){base.toc+="</li>\n<li>\n"}}else{if(!last){base.toc+="</li>\n<li>\n"}};base.current_depth=new_depth};base.buildSlug=function(text){text=text.toLowerCase().replace(/[^a-z0-9 -]/gi,'').replace(/ /gi,'-');text=text.substr(0,50);return text};base.depthClass=function(depth){return base.options.levelClass.replace('%',(depth-(base.starting_depth-1)))};base.addSpacing=function(){var start=base.$headings.filter(':first').position().top;base.$headings.each(function(i,el){var $a=base.$el.find('a:eq('+i+')');var pos=(($(this).position().top-start)/(base.$scope.height()-start))*base.$el.height();$a.css({position:"absolute",top:pos})})};return base.init()};$.TableOfContents.defaultOptions={startLevel:1,depth:3,levelClass:"toc-depth-%",levelText:"%",topLinks:false,topLinkClass:"toc-top-link",topBodyId:"toc-top",proportionateSpacing:false};$.fn.tableOfContents=function(scope,options){return this.each(function(){var toc=new $.TableOfContents(this,scope,options);delete toc})}})(jQuery);
