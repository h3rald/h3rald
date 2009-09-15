-----
-----
function format_date(d){return $.timeago(Date.parse(d));}
function get_json_data(uri,options){$.getJSON(uri,function(data){var list=$(
"<ul></ul>"
);for (var i=0;i<options.max;i++){switch(options.element){case
"#backtype"
:var item=backtype_entry(data.comments[i])
break;case
"#delicious"
:var item=delicious_entry(data[i])
break;case
"#twitter"
:var item=twitter_entry(data[i])
break;case
"#github"
:var item=github_entry(data.commits[i],options.repo)
break;}
 item.appendTo(list);}
list.appendTo(options.element).fadeIn(1000);});}
function backtype_entry(comment){var c=$(
"<li></li>"
).addClass(
'feed-item'
);var dt=$(
"<span></span>"
).addClass(
'feed-item-date'
).html(format_date(comment.comment.date+
" GMT"
)+
":"
);var tx=$(
"<span>&#0187; </span>"
).addClass(
'feed-item-text'
).append($(
'<a></a>'
).attr(
'href'
,comment.comment.url).html(comment.post.title));c.append(dt);c.append(tx);return c}
function twitter_entry(tweet){var it=$(
"<li></li>"
).addClass(
'feed-item'
);var content=tweet.text
.replace(
/^h3rald:/,
''
)
.replace(
/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;
/~\+#])?)/g,
'<a href="$1">$1</a>'
)
.replace(
/@([a-zA-Z1-9_]*)/g,
'<a href="http://www.twitter.com/$1">@$1</a>'
)
.replace(
/#([a-zA-Z1-9_]*)/g,
'<a href="http://www.twitter.com/search?q=%23$1">#$1</a>'
)
var dt=$(
"<span></span>"
).addClass(
'feed-item-date'
).html(format_date(tweet.created_at)+
":"
);var tx=$(
"<span>&#0187; </span>"
).addClass(
'feed-item-text'
).html(content);it.append(dt);it.append(tx);return it}
function delicious_entry(bookmark){var it=$(
"<li></li>"
).addClass(
'feed-item'
);var content=
"<a href='"
+bookmark.u+
"'>"
+bookmark.d+
"</a>"
;content+=
"<br />tags: "
;var categories=Array();for (i=0;i<bookmark.t.length;i++){categories[i]=
"<a href='http://delicious.com/h3rald/"
+bookmark.t[i]+
"'>"
+bookmark.t[i]+
"</a>"
;}
content+=categories.join(
', '
).replace(
/ $/,
''
);var dt=$(
"<span></span>"
).addClass(
'feed-item-date'
).html(format_date(bookmark.dt)+
":"
);var tx=$(
"<span>&#0187; </span>"
).addClass(
'feed-item-text'
).html(content);it.append(dt);it.append(tx);return it}
function github_entry(commit,repo){var it=$(
"<li></li>"
).addClass(
'commit-data'
);var dt=$(
"<span></span>"
).addClass(
'commit-date'
).html(format_date(commit.committed_date)+
" &middot; "
);var link=$(
"<span></span><br />"
).addClass(
'commit-link'
).append($(
'<a></a>'
).attr(
'href'
,commit.url).html(
"View"
));var tx=$(
"<span></span>"
).addClass(
'commit-text'
).html(commit.message
.replace(
/(closes) #(\d+)/ig,
"$1 <a href='http://github.com/h3rald/"
+repo+
"/issues/#issue/$2'>#$2</a>"
)+
"<br />"
);it.append(tx);it.append(dt);it.append(link);return it}
function display_opinions(max){get_json_data(
"/data/opinions.json"
,{max:max,element:
'#backtype'
})}
function display_tweets(max){get_json_data(
"/data/tweets.json"
,{max:max,element:
'#twitter'
})}
function display_bookmarks(max){get_json_data(
"/data/bookmarks.json"
,{max:max,element:
'#delicious'
})}
function display_commits(max,repo){get_json_data(
"/data/"
+repo+
".json"
,{max:max,element:
'#github'
,repo:repo})}----------
(function($){$.timeago=function(timestamp){if (timestamp instanceof Date) return inWords(timestamp);else if (typeof timestamp==
"string"
) return inWords($.timeago.parse(timestamp));else return inWords($.timeago.parse($(timestamp).attr(
"title"
)));};var $t=$.timeago;$.extend($.timeago,{settings:{refreshMillis:60000,allowFuture:false,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:
"ago"
,suffixFromNow:
"from now"
,ago:null,
fromNow:null,
seconds:
"less than a minute"
,minute:
"about a minute"
,minutes:
"%d minutes"
,hour:
"about an hour"
,hours:
"about %d hours"
,day:
"a day"
,days:
"%d days"
,month:
"about a month"
,months:
"%d months"
,year:
"about a year"
,years:
"%d years"
}},inWords:function(distanceMillis){var $l=this.settings.strings;var prefix=$l.prefixAgo;var suffix=$l.suffixAgo||$l.ago;if (this.settings.allowFuture){if (distanceMillis<0){prefix=$l.prefixFromNow;suffix=$l.suffixFromNow||$l.fromNow;}
distanceMillis=Math.abs(distanceMillis);}
var seconds=distanceMillis / 1000;var minutes=seconds / 60;var hours=minutes / 60;var days=hours / 24;var years=days / 365;var words=seconds<45&&substitute($l.seconds,Math.round(seconds))||seconds<90&&substitute($l.minute,1)||minutes<45&&substitute($l.minutes,Math.round(minutes))||minutes<90&&substitute($l.hour,1)||hours<24&&substitute($l.hours,Math.round(hours))||hours<48&&substitute($l.day,1)||days<30&&substitute($l.days,Math.floor(days))||days<60&&substitute($l.month,1)||days<365&&substitute($l.months,Math.floor(days / 30))||years<2&&substitute($l.year,1)||substitute($l.years,Math.floor(years));return $.trim([prefix,words,suffix].join(
" "
));},parse:function(iso8601){var s=$.trim(iso8601);s=s.replace(
/-/,
"/"
).replace(
/-/,
"/"
);s=s.replace(
/T/,
" "
).replace(
/Z/,
" UTC"
);s=s.replace(
/([\+-]\d\d)\:?(\d\d)/,
" $1$2"
);
return new Date(s);}});$.fn.timeago=function(){var self=this;self.each(refresh);var $s=$t.settings;if ($s.refreshMillis>0){setInterval(function(){self.each(refresh);},$s.refreshMillis);}
return self;};function refresh(){var date=$t.parse(this.title);if (!isNaN(date)){$(this).text(inWords(date));}
return this;}
function inWords(date){return $t.inWords(distance(date));}
function distance(date){return (new Date().getTime()-date.getTime());}
function substitute(stringOrFunction,value){var string=$.isFunction(stringOrFunction)?stringOrFunction(value):stringOrFunction;return string.replace(
/%d/i,value);}
document.createElement(
'abbr'
);})(jQuery);----------
Date.CultureInfo={name:
"en-US"
,englishName:
"English (United States)"
,nativeName:
"English (United States)"
,dayNames:[
"Sunday"
,
"Monday"
,
"Tuesday"
,
"Wednesday"
,
"Thursday"
,
"Friday"
,
"Saturday"
],abbreviatedDayNames:[
"Sun"
,
"Mon"
,
"Tue"
,
"Wed"
,
"Thu"
,
"Fri"
,
"Sat"
],shortestDayNames:[
"Su"
,
"Mo"
,
"Tu"
,
"We"
,
"Th"
,
"Fr"
,
"Sa"
],firstLetterDayNames:[
"S"
,
"M"
,
"T"
,
"W"
,
"T"
,
"F"
,
"S"
],monthNames:[
"January"
,
"February"
,
"March"
,
"April"
,
"May"
,
"June"
,
"July"
,
"August"
,
"September"
,
"October"
,
"November"
,
"December"
],abbreviatedMonthNames:[
"Jan"
,
"Feb"
,
"Mar"
,
"Apr"
,
"May"
,
"Jun"
,
"Jul"
,
"Aug"
,
"Sep"
,
"Oct"
,
"Nov"
,
"Dec"
],amDesignator:
"AM"
,pmDesignator:
"PM"
,firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:
"mdy"
,formatPatterns:{shortDate:
"M/d/yyyy"
,longDate:
"dddd, MMMM dd, yyyy"
,shortTime:
"h:mm tt"
,longTime:
"h:mm:ss tt"
,fullDateTime:
"dddd, MMMM dd, yyyy h:mm:ss tt"
,sortableDateTime:
"yyyy-MM-ddTHH:mm:ss"
,universalSortableDateTime:
"yyyy-MM-dd HH:mm:ssZ"
,rfc1123:
"ddd, dd MMM yyyy HH:mm:ss GMT"
,monthDay:
"MMMM dd"
,yearMonth:
"MMMM, yyyy"
},regexPatterns:{jan:
/^jan(uary)?/i,feb:
/^feb(ruary)?/i,mar:
/^mar(ch)?/i,apr:
/^apr(il)?/i,may:
/^may/i,jun:
/^jun(e)?/i,jul:
/^jul(y)?/i,aug:
/^aug(ust)?/i,sep:
/^sep(t(ember)?)?/i,oct:
/^oct(ober)?/i,nov:
/^nov(ember)?/i,dec:
/^dec(ember)?/i,sun:
/^su(n(day)?)?/i,mon:
/^mo(n(day)?)?/i,tue:
/^tu(e(s(day)?)?)?/i,wed:
/^we(d(nesday)?)?/i,thu:
/^th(u(r(s(day)?)?)?)?/i,fri:
/^fr(i(day)?)?/i,sat:
/^sa(t(urday)?)?/i,future:
/^next/i,past:
/^last|past|prev(ious)?/i,add:
/^(\+|aft(er)?|from|hence)/i,subtract:
/^(\-|bef(ore)?|ago)/i,yesterday:
/^yes(terday)?/i,today:
/^t(od(ay)?)?/i,tomorrow:
/^tom(orrow)?/i,now:
/^n(ow)?/i,millisecond:
/^ms|milli(second)?s?/i,second:
/^sec(ond)?s?/i,minute:
/^mn|min(ute)?s?/i,hour:
/^h(our)?s?/i,week:
/^w(eek)?s?/i,month:
/^m(onth)?s?/i,day:
/^d(ay)?s?/i,year:
/^y(ear)?s?/i,shortMeridian:
/^(a|p)/i,longMeridian:
/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:
/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,ordinalSuffix:
/^\s*(st|nd|rd|th)/i,timeContext:
/^\s*(\:|a(?!u|p)|p)/i},timezones:[{name:
"UTC"
,offset:
"-000"
},{name:
"GMT"
,offset:
"-000"
},{name:
"EST"
,offset:
"-0500"
},{name:
"EDT"
,offset:
"-0400"
},{name:
"CST"
,offset:
"-0600"
},{name:
"CDT"
,offset:
"-0500"
},{name:
"MST"
,offset:
"-0700"
},{name:
"MDT"
,offset:
"-0600"
},{name:
"PST"
,offset:
"-0800"
},{name:
"PDT"
,offset:
"-0700"
}]};(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,p=function(s,l){if(!l){l=2;}
return(
"000"
+s).slice(l*-1);};$P.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};$P.setTimeToNow=function(){var n=new Date();this.setHours(n.getHours());this.setMinutes(n.getMinutes());this.setSeconds(n.getSeconds());this.setMilliseconds(n.getMilliseconds());return this;};$D.today=function(){return new Date().clearTime();};$D.compare=function(date1,date2){if(isNaN(date1)||isNaN(date2)){throw new Error(date1+
" - "
+date2);}else if(date1 instanceof Date&&date2 instanceof Date){return(date1<date2)?-1:(date1>date2)?1:0;}else{throw new TypeError(date1+
" - "
+date2);}};$D.equals=function(date1,date2){return(date1.compareTo(date2)===0);};$D.getDayNumberFromName=function(name){var n=$C.dayNames,m=$C.abbreviatedDayNames,o=$C.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s||o[i].toLowerCase()==s){return i;}}
return-1;};$D.getMonthNumberFromName=function(name){var n=$C.monthNames,m=$C.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};$D.isLeapYear=function(year){return((year%4===0&&year%100!==0)||year%400===0);};$D.getDaysInMonth=function(year,month){return[31,($D.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};$D.getTimezoneAbbreviation=function(offset){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].offset===offset){return z[i].name;}}
return null;};$D.getTimezoneOffset=function(name){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].name===name.toUpperCase()){return z[i].offset;}}
return null;};$P.clone=function(){return new Date(this.getTime());};$P.compareTo=function(date){return Date.compare(this,date);};$P.equals=function(date){return Date.equals(this,date||new Date());};$P.between=function(start,end){return this.getTime()>=start.getTime()&&this.getTime()<=end.getTime();};$P.isAfter=function(date){return this.compareTo(date||new Date())===1;};$P.isBefore=function(date){return(this.compareTo(date||new Date())===-1);};$P.isToday=function(){return this.isSameDay(new Date());};$P.isSameDay=function(date){return this.clone().clearTime().equals(date.clone().clearTime());};$P.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};$P.addSeconds=function(value){return this.addMilliseconds(value*1000);};$P.addMinutes=function(value){return this.addMilliseconds(value*60000);};$P.addHours=function(value){return this.addMilliseconds(value*3600000);};$P.addDays=function(value){this.setDate(this.getDate()+value);return this;};$P.addWeeks=function(value){return this.addDays(value*7);};$P.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,$D.getDaysInMonth(this.getFullYear(),this.getMonth())));return this;};$P.addYears=function(value){return this.addMonths(value*12);};$P.add=function(config){if(typeof config==
"number"
){this._orient=config;return this;}
var x=config;if(x.milliseconds){this.addMilliseconds(x.milliseconds);}
if(x.seconds){this.addSeconds(x.seconds);}
if(x.minutes){this.addMinutes(x.minutes);}
if(x.hours){this.addHours(x.hours);}
if(x.weeks){this.addWeeks(x.weeks);}
if(x.months){this.addMonths(x.months);}
if(x.years){this.addYears(x.years);}
if(x.days){this.addDays(x.days);}
return this;};var $y,$m,$d;$P.getWeek=function(){var a,b,c,d,e,f,g,n,s,w;$y=(!$y)?this.getFullYear():$y;$m=(!$m)?this.getMonth()+1:$m;$d=(!$d)?this.getDate():$d;if($m<=2){a=$y-1;b=(a
/4|0)-(a/100|0)+(a
/400|0);c=((a-1)/4|0)-((a-1)
/100|0)+((a-1)/400|0);s=b-c;e=0;f=$d-1+(31*($m-1));}else{a=$y;b=(a
/4|0)-(a/100|0)+(a
/400|0);c=((a-1)/4|0)-((a-1)
/100|0)+((a-1)/400|0);s=b-c;e=s+1;f=$d+((153*($m-3)+2)/5)+58+s;}
g=(a+b)%7;d=(f+g-e)%7;n=(f+3-d)|0;if(n<0){w=53-((g-s)
/5|0);}else if(n>364+s){w=1;}else{w=(n/7|0)+1;}
$y=$m=$d=null;return w;};$P.getISOWeek=function(){$y=this.getUTCFullYear();$m=this.getUTCMonth()+1;$d=this.getUTCDate();return p(this.getWeek());};$P.setWeek=function(n){return this.moveToDayOfWeek(1).addWeeks(n-this.getWeek());};$D._validate=function(n,min,max,name){if(typeof n==
"undefined"
){return false;}else if(typeof n!=
"number"
){throw new TypeError(n+
" is not a Number."
);}else if(n<min||n>max){throw new RangeError(n+
" is not a valid value for "
+name+
"."
);}
return true;};$D.validateMillisecond=function(value){return $D._validate(value,0,999,
"millisecond"
);};$D.validateSecond=function(value){return $D._validate(value,0,59,
"second"
);};$D.validateMinute=function(value){return $D._validate(value,0,59,
"minute"
);};$D.validateHour=function(value){return $D._validate(value,0,23,
"hour"
);};$D.validateDay=function(value,year,month){return $D._validate(value,1,$D.getDaysInMonth(year,month),
"day"
);};$D.validateMonth=function(value){return $D._validate(value,0,11,
"month"
);};$D.validateYear=function(value){return $D._validate(value,0,9999,
"year"
);};$P.set=function(config){if($D.validateMillisecond(config.millisecond)){this.addMilliseconds(config.millisecond-this.getMilliseconds());}
if($D.validateSecond(config.second)){this.addSeconds(config.second-this.getSeconds());}
if($D.validateMinute(config.minute)){this.addMinutes(config.minute-this.getMinutes());}
if($D.validateHour(config.hour)){this.addHours(config.hour-this.getHours());}
if($D.validateMonth(config.month)){this.addMonths(config.month-this.getMonth());}
if($D.validateYear(config.year)){this.addYears(config.year-this.getFullYear());}
if($D.validateDay(config.day,this.getFullYear(),this.getMonth())){this.addDays(config.day-this.getDate());}
if(config.timezone){this.setTimezone(config.timezone);}
if(config.timezoneOffset){this.setTimezoneOffset(config.timezoneOffset);}
if(config.week&&$D._validate(config.week,0,53,
"week"
)){this.setWeek(config.week);}
return this;};$P.moveToFirstDayOfMonth=function(){return this.set({day:1});};$P.moveToLastDayOfMonth=function(){return this.set({day:$D.getDaysInMonth(this.getFullYear(),this.getMonth())});};$P.moveToNthOccurrence=function(dayOfWeek,occurrence){var shift=0;if(occurrence>0){shift=occurrence-1;}
else if(occurrence===-1){this.moveToLastDayOfMonth();if(this.getDay()!==dayOfWeek){this.moveToDayOfWeek(dayOfWeek,-1);}
return this;}
return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek,+1).addWeeks(shift);};$P.moveToDayOfWeek=function(dayOfWeek,orient){var diff=(dayOfWeek-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};$P.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};$P.getOrdinalNumber=function(){return Math.ceil((this.clone().clearTime()-new Date(this.getFullYear(),0,1))
/86400000)+1;};$P.getTimezone=function(){return $D.getTimezoneAbbreviation(this.getUTCOffset());};$P.setTimezoneOffset=function(offset){var here=this.getTimezoneOffset(),there=Number(offset)*-6/10;return this.addMinutes(there-here);};$P.setTimezone=function(offset){return this.setTimezoneOffset($D.getTimezoneOffset(offset));};$P.hasDaylightSavingTime=function(){return(Date.today().set({month:0,day:1}).getTimezoneOffset()!==Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.isDaylightSavingTime=function(){return(this.hasDaylightSavingTime()&&new Date().getTimezoneOffset()===Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r.charAt(0)+r.substr(2);}else{r=(n+10000).toString();return
"+"
+r.substr(1);}};$P.getElapsed=function(date){return(date||new Date())-this;};if(!$P.toISOString){$P.toISOString=function(){function f(n){return n<10?
'0'
+n:n;}
return
'"'
+this.getUTCFullYear()+
'-'
+f(this.getUTCMonth()+1)+
'-'
+f(this.getUTCDate())+
'T'
+f(this.getUTCHours())+
':'
+f(this.getUTCMinutes())+
':'
+f(this.getUTCSeconds())+
'Z"'
;};}
$P._toString=$P.toString;$P.toString=function(format){var x=this;if(format&&format.length==1){var c=$C.formatPatterns;x.t=x.toString;switch(format){case
"d"
:return x.t(c.shortDate);case
"D"
:return x.t(c.longDate);case
"F"
:return x.t(c.fullDateTime);case
"m"
:return x.t(c.monthDay);case
"r"
:return x.t(c.rfc1123);case
"s"
:return x.t(c.sortableDateTime);case
"t"
:return x.t(c.shortTime);case
"T"
:return x.t(c.longTime);case
"u"
:return x.t(c.universalSortableDateTime);case
"y"
:return x.t(c.yearMonth);}}
var ord=function(n){switch(n*1){case 1:case 21:case 31:return
"st"
;case 2:case 22:return
"nd"
;case 3:case 23:return
"rd"
;default:return
"th"
;}};return format?format.replace(
/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g,function(m){if(m.charAt(0)===
"\\"
){return m.replace(
"\\"
,
""
);}
x.h=x.getHours;switch(m){case
"hh"
:return p(x.h()<13?(x.h()===0?12:x.h()):(x.h()-12));case
"h"
:return x.h()<13?(x.h()===0?12:x.h()):(x.h()-12);case
"HH"
:return p(x.h());case
"H"
:return x.h();case
"mm"
:return p(x.getMinutes());case
"m"
:return x.getMinutes();case
"ss"
:return p(x.getSeconds());case
"s"
:return x.getSeconds();case
"yyyy"
:return p(x.getFullYear(),4);case
"yy"
:return p(x.getFullYear());case
"dddd"
:return $C.dayNames[x.getDay()];case
"ddd"
:return $C.abbreviatedDayNames[x.getDay()];case
"dd"
:return p(x.getDate());case
"d"
:return x.getDate();case
"MMMM"
:return $C.monthNames[x.getMonth()];case
"MMM"
:return $C.abbreviatedMonthNames[x.getMonth()];case
"MM"
:return p((x.getMonth()+1));case
"M"
:return x.getMonth()+1;case
"t"
:return x.h()<12?$C.amDesignator.substring(0,1):$C.pmDesignator.substring(0,1);case
"tt"
:return x.h()<12?$C.amDesignator:$C.pmDesignator;case
"S"
:return ord(x.getDate());default:return m;}}):this._toString();};}());(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,$N=Number.prototype;$P._orient=+1;$P._nth=null;$P._is=false;$P._same=false;$P._isSecond=false;$N._dateElement=
"day"
;$P.next=function(){this._orient=+1;return this;};$D.next=function(){return $D.today().next();};$P.last=$P.prev=$P.previous=function(){this._orient=-1;return this;};$D.last=$D.prev=$D.previous=function(){return $D.today().last();};$P.is=function(){this._is=true;return this;};$P.same=function(){this._same=true;this._isSecond=false;return this;};$P.today=function(){return this.same().day();};$P.weekday=function(){if(this._is){this._is=false;return(!this.is().sat()&&!this.is().sun());}
return false;};$P.at=function(time){return(typeof time===
"string"
)?$D.parse(this.toString(
"d"
)+
" "
+time):this.set(time);};$N.fromNow=$N.after=function(date){var c={};c[this._dateElement]=this;return((!date)?new Date():date.clone()).add(c);};$N.ago=$N.before=function(date){var c={};c[this._dateElement]=this*-1;return((!date)?new Date():date.clone()).add(c);};var dx=(
"sunday monday tuesday wednesday thursday friday saturday"
).split(
/\s/),mx=(
"january february march april may june july august september october november december"
).split(
/\s/),px=(
"Millisecond Second Minute Hour Day Week Month Year"
).split(
/\s/),pxf=(
"Milliseconds Seconds Minutes Hours Date Week Month FullYear"
).split(
/\s/),nth=(
"final first second third fourth fifth"
).split(
/\s/),de;$P.toObject=function(){var o={};for(var i=0;i<px.length;i++){o[px[i].toLowerCase()]=this[
"get"
+pxf[i]]();}
return o;};$D.fromObject=function(config){config.week=null;return Date.today().set(config);};var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
if(this._nth!==null){if(this._isSecond){this.addSeconds(this._orient*-1);}
this._isSecond=false;var ntemp=this._nth;this._nth=null;var temp=this.clone().moveToLastDayOfMonth();this.moveToNthOccurrence(n,ntemp);if(this>temp){throw new RangeError($D.getDayName(n)+
" does not occur "
+ntemp+
" times in the month of "
+$D.getMonthName(temp.getMonth())+
" "
+temp.getFullYear()+
"."
);}
return this;}
return this.moveToDayOfWeek(n,this._orient);};};var sdf=function(n){return function(){var t=$D.today(),shift=n-t.getDay();if(n===0&&$C.firstDayOfWeek===1&&t.getDay()!==0){shift=shift+7;}
return t.addDays(shift);};};for(var i=0;i<dx.length;i++){$D[dx[i].toUpperCase()]=$D[dx[i].toUpperCase().substring(0,3)]=i;$D[dx[i]]=$D[dx[i].substring(0,3)]=sdf(i);$P[dx[i]]=$P[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};var smf=function(n){return function(){return $D.today().set({month:n,day:1});};};for(var j=0;j<mx.length;j++){$D[mx[j].toUpperCase()]=$D[mx[j].toUpperCase().substring(0,3)]=j;$D[mx[j]]=$D[mx[j].substring(0,3)]=smf(j);$P[mx[j]]=$P[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(this._isSecond){this._isSecond=false;return this;}
if(this._same){this._same=this._is=false;var o1=this.toObject(),o2=(arguments[0]||new Date()).toObject(),v=
""
,k=j.toLowerCase();for(var m=(px.length-1);m>-1;m--){v=px[m].toLowerCase();if(o1[v]!=o2[v]){return false;}
if(k==v){break;}}
return true;}
if(j.substring(j.length-1)!=
"s"
){j+=
"s"
;}
return this[
"add"
+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$P[de]=$P[de+
"s"
]=ef(px[k]);$N[de]=$N[de+
"s"
]=nf(de);}
$P._ss=ef(
"Second"
);var nthfn=function(n){return function(dayOfWeek){if(this._same){return this._ss(arguments[0]);}
if(dayOfWeek||dayOfWeek===0){return this.moveToNthOccurrence(dayOfWeek,n);}
this._nth=n;if(n===2&&(dayOfWeek===undefined||dayOfWeek===null)){this._isSecond=true;return this.addSeconds(this._orient);}
return this;};};for(var l=0;l<nth.length;l++){$P[nth[l]]=(l===0)?nthfn(-1):nthfn(l);}}());(function(){Date.Parsing={Exception:function(s){this.message=
"Parse error at '"
+s.substring(0,10)+
" ...'"
;}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp(
"^\s*"
+s+
"\s*"
))(s);};},stoken:function(s){return _.rtoken(new RegExp(
"^"
+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(
/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(
/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(
/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx=
"optional not ignore cache"
.split(
/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx=
"each any all"
.split(
/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo;var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};$D.Grammar={};$D.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(
/[^\d\+\-]/g,
""
);if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(
/\d+/)[0]);};},month:function(s){return function(){this.month=(s.length==3)?
"jan feb mar apr may jun jul aug sep oct nov dec"
.indexOf(s)/4:Number(s)-1;};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<$C.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case
"yesterday"
:this.days=-1;break;case
"tomorrow"
:this.days=1;break;case
"today"
:this.days=0;break;case
"now"
:this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
var now=new Date();if((this.hour||this.minute)&&(!this.month&&!this.year&&!this.day)){this.day=now.getDate();}
if(!this.year){this.year=now.getFullYear();}
if(!this.month&&this.month!==0){this.month=now.getMonth();}
if(!this.day){this.day=1;}
if(!this.hour){this.hour=0;}
if(!this.minute){this.minute=0;}
if(!this.second){this.second=0;}
if(this.meridian&&this.hour){if(this.meridian==
"p"
&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian==
"a"
&&this.hour==12){this.hour=0;}}
if(this.day>$D.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+
" is not a valid value for days."
);}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]==
"function"
){x[i].call(this);}}
var today=$D.today();if(this.now&&!this.unit&&!this.operator){return new Date();}else if(this.now){today=new Date();}
var expression=!!(this.days&&this.days!==null||this.orient||this.operator);var gap,mod,orient;orient=((this.orient==
"past"
||this.operator==
"subtract"
)?-1:1);if(!this.now&&
"hour minute second"
.indexOf(this.unit)!=-1){today.setTimeToNow();}
if(this.month||this.month===0){if(
"year day hour minute second"
.indexOf(this.unit)!=-1){this.value=this.month+1;this.month=null;expression=true;}}
if(!expression&&this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(!this.month){this.month=temp.getMonth();}
this.year=temp.getFullYear();}
if(expression&&this.weekday&&this.unit!=
"month"
){this.unit=
"day"
;gap=($D.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month&&this.unit==
"day"
&&this.operator){this.value=(this.month+1);this.month=null;}
if(this.value!=null&&this.month!=null&&this.year!=null){this.day=this.value*1;}
if(this.month&&!this.day&&this.value){today.set({day:this.value*1});if(!expression){this.day=this.value*1;}}
if(!this.month&&this.value&&this.unit==
"month"
&&!this.now){this.month=this.value;expression=true;}
if(expression&&(this.month||this.month===0)&&this.unit!=
"year"
){this.unit=
"month"
;gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit=
"day"
;}
if(!this.value&&this.operator&&this.operator!==null&&this[this.unit+
"s"
]&&this[this.unit+
"s"
]!==null){this[this.unit+
"s"
]=this[this.unit+
"s"
]+((this.operator==
"add"
)?1:-1)+(this.value||0)*orient;}else if(this[this.unit+
"s"
]==null||this.operator!=null){if(!this.value){this.value=1;}
this[this.unit+
"s"
]=this.value*orient;}
if(this.meridian&&this.hour){if(this.meridian==
"p"
&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian==
"a"
&&this.hour==12){this.hour=0;}}
if(this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(temp.getMonth()!==today.getMonth()){this.month=temp.getMonth();}}
if((this.month||this.month===0)&&!this.day){this.day=1;}
if(!this.orient&&!this.operator&&this.unit==
"week"
&&this.value&&!this.day&&!this.month){return Date.today().setWeek(this.value);}
if(expression&&this.timezone&&this.day&&this.days){this.day=this.days;}
return(expression)?today.add(this):today.set(this);}};var _=$D.Parsing.Operators,g=$D.Grammar,t=$D.Translator,_fn;g.datePartDelimiter=_.rtoken(
/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(
":"
);g.whiteSpace=_.rtoken(
/^\s*/);g.generalDelimiter=_.rtoken(
/^(([\s\,]|at|@|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=$C.regexPatterns;var kx=keys.split(
/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken($C.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(
/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(
/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(
/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(
/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(
/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(
/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(
/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(
/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.m,g.s],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2(
"shortMeridian"
),t.meridian));g.tt=_.cache(_.process(g.ctoken2(
"longMeridian"
),t.meridian));g.z=_.cache(_.process(_.rtoken(
/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zz=_.cache(_.process(_.rtoken(
/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2(
"timezone"
),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken(
"T"
))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(
/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2(
"ordinalSuffix"
))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(
/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2(
"ordinalSuffix"
))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken(
"sun mon tue wed thu fri sat"
),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(
/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(
/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken(
"jan feb mar apr may jun jul aug sep oct nov dec"
),t.month));g.y=_.cache(_.process(_.rtoken(
/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(
/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(
/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(
/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2(
"timeContext"
)));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken(
"past future"
),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken(
"add subtract"
),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken(
"yesterday tomorrow today now"
),t.rday);g.unit=_.process(g.ctoken(
"second minute hour day week month year"
),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(
/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(
/\D/g,
""
);};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[$C.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(
/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw $D.Parsing.Exception(fmt);}}),_.process(_.rtoken(
/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats([
"\"yyyy-MM-ddTHH:mm:ssZ\""
,
"yyyy-MM-ddTHH:mm:ssZ"
,
"yyyy-MM-ddTHH:mm:ssz"
,
"yyyy-MM-ddTHH:mm:ss"
,
"yyyy-MM-ddTHH:mmZ"
,
"yyyy-MM-ddTHH:mmz"
,
"yyyy-MM-ddTHH:mm"
,
"ddd, MMM dd, yyyy H:mm:ss tt"
,
"ddd MMM d yyyy HH:mm:ss zzz"
,
"MMddyyyy"
,
"ddMMyyyy"
,
"Mddyyyy"
,
"ddMyyyy"
,
"Mdyyyy"
,
"dMyyyy"
,
"yyyy"
,
"Mdyy"
,
"dMyy"
,
"d"
]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};$D._parse=$D.parse;$D.parse=function(s){var r=null;if(!s){return null;}
if(s instanceof Date){return s;}
try{r=$D.Grammar.start.call({},s.replace(
/^\s*(\S*(\s+\S+)*)\s*$/,
"$1"
));}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};$D.getParseFunction=function(fx){var fn=$D.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};$D.parseExact=function(s,fx){return $D.getParseFunction(fx)(s);};}());----------
(function($){
$.fn.lightBox=function(settings){
settings=jQuery.extend({
overlayBgColor:
'#000'
,
overlayOpacity:0.8,
fixedNavigation:false,
imageLoading:
'/images/lightbox-ico-loading.gif'
,
imageBtnPrev:
'/images/lightbox-btn-prev.gif'
,
imageBtnNext:
'/images/lightbox-btn-next.gif'
,
imageBtnClose:
'/images/lightbox-btn-close.gif'
,
imageBlank:
'/images/lightbox-blank.gif'
,
containerBorderSize:10,
containerResizeSpeed:400,
txtImage:
'Image'
,
txtOf:
'of'
,
keyToClose:
'c'
,
keyToPrev:
'p'
,
keyToNext:
'n'
,
imageArray:[],activeImage:0},settings);
var jQueryMatchedObj=this;
function _initialize(){_start(this,jQueryMatchedObj);
return false;
}
function _start(objClicked,jQueryMatchedObj){
$(
'embed, object, select'
).css({
'visibility'
:
'hidden'
});
_set_interface();
settings.imageArray.length=0;
settings.activeImage=0;
if (jQueryMatchedObj.length==1){settings.imageArray.push(new Array(objClicked.getAttribute(
'href'
),objClicked.getAttribute(
'title'
)));} else {
for (var i=0;i<jQueryMatchedObj.length;i++){settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute(
'href'
),jQueryMatchedObj[i].getAttribute(
'title'
)));}}
while (settings.imageArray[settings.activeImage][0] !=objClicked.getAttribute(
'href'
)){settings.activeImage++;}
_set_image_to_view();}
function _set_interface(){
$(
'body'
).append(
'<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="'
+settings.imageLoading+
'"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="'
+settings.imageBtnClose+
'"></a></div></div></div></div>'
);
var arrPageSizes=___getPageSize();
$(
'#jquery-overlay'
).css({backgroundColor:settings.overlayBgColor,opacity:settings.overlayOpacity,width:arrPageSizes[0],height:arrPageSizes[1]}).fadeIn();
var arrPageScroll=___getPageScroll();
$(
'#jquery-lightbox'
).css({top:arrPageScroll[1]+(arrPageSizes[3] / 10),left:arrPageScroll[0]}).show();
$(
'#jquery-overlay,#jquery-lightbox'
).click(function(){_finish();});
$(
'#lightbox-loading-link,#lightbox-secNav-btnClose'
).click(function(){_finish();return false;});
$(window).resize(function(){
var arrPageSizes=___getPageSize();
$(
'#jquery-overlay'
).css({width:arrPageSizes[0],height:arrPageSizes[1]});
var arrPageScroll=___getPageScroll();
$(
'#jquery-lightbox'
).css({top:arrPageScroll[1]+(arrPageSizes[3] / 10),left:arrPageScroll[0]});});}
function _set_image_to_view(){
$(
'#lightbox-loading'
).show();if (settings.fixedNavigation){$(
'#lightbox-image,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber'
).hide();} else {
$(
'#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber'
).hide();}
var objImagePreloader=new Image();objImagePreloader.onload=function(){$(
'#lightbox-image'
).attr(
'src'
,settings.imageArray[settings.activeImage][0]);
_resize_container_image_box(objImagePreloader.width,objImagePreloader.height);
objImagePreloader.onload=function(){};};objImagePreloader.src=settings.imageArray[settings.activeImage][0];};
function _resize_container_image_box(intImageWidth,intImageHeight){
var intCurrentWidth=$(
'#lightbox-container-image-box'
).width();var intCurrentHeight=$(
'#lightbox-container-image-box'
).height();
var intWidth=(intImageWidth+(settings.containerBorderSize * 2));
var intHeight=(intImageHeight+(settings.containerBorderSize * 2));
var intDiffW=intCurrentWidth-intWidth;var intDiffH=intCurrentHeight-intHeight;
$(
'#lightbox-container-image-box'
).animate({width:intWidth,height:intHeight},settings.containerResizeSpeed,function(){_show_image();});if ((intDiffW==0)&&(intDiffH==0)){if ($.browser.msie){___pause(250);} else {___pause(100);}}
 $(
'#lightbox-container-image-data-box'
).css({width:intImageWidth});$(
'#lightbox-nav-btnPrev,#lightbox-nav-btnNext'
).css({height:intImageHeight+(settings.containerBorderSize * 2)});};
function _show_image(){$(
'#lightbox-loading'
).hide();$(
'#lightbox-image'
).fadeIn(function(){_show_image_data();_set_navigation();});_preload_neighbor_images();};
function _show_image_data(){$(
'#lightbox-container-image-data-box'
).slideDown(
'fast'
);$(
'#lightbox-image-details-caption'
).hide();if (settings.imageArray[settings.activeImage][1]){$(
'#lightbox-image-details-caption'
).html(settings.imageArray[settings.activeImage][1]).show();}
if (settings.imageArray.length>1){$(
'#lightbox-image-details-currentNumber'
).html(settings.txtImage+
' '
+(settings.activeImage+1)+
' '
+settings.txtOf+
' '
+settings.imageArray.length).show();}}
function _set_navigation(){$(
'#lightbox-nav'
).show();
$(
'#lightbox-nav-btnPrev,#lightbox-nav-btnNext'
).css({
'background'
:
'transparent url('
+settings.imageBlank+
') no-repeat'
});
if (settings.activeImage !=0){if (settings.fixedNavigation){$(
'#lightbox-nav-btnPrev'
).css({
'background'
:
'url('
+settings.imageBtnPrev+
') left 15% no-repeat'
})
.unbind()
.bind(
'click'
,function(){settings.activeImage=settings.activeImage-1;_set_image_to_view();return false;});} else {
$(
'#lightbox-nav-btnPrev'
).unbind().hover(function(){$(this).css({
'background'
:
'url('
+settings.imageBtnPrev+
') left 15% no-repeat'
});},function(){$(this).css({
'background'
:
'transparent url('
+settings.imageBlank+
') no-repeat'
});}).show().bind(
'click'
,function(){settings.activeImage=settings.activeImage-1;_set_image_to_view();return false;});}}
if (settings.activeImage !=(settings.imageArray.length-1)){if (settings.fixedNavigation){$(
'#lightbox-nav-btnNext'
).css({
'background'
:
'url('
+settings.imageBtnNext+
') right 15% no-repeat'
})
.unbind()
.bind(
'click'
,function(){settings.activeImage=settings.activeImage+1;_set_image_to_view();return false;});} else {
$(
'#lightbox-nav-btnNext'
).unbind().hover(function(){$(this).css({
'background'
:
'url('
+settings.imageBtnNext+
') right 15% no-repeat'
});},function(){$(this).css({
'background'
:
'transparent url('
+settings.imageBlank+
') no-repeat'
});}).show().bind(
'click'
,function(){settings.activeImage=settings.activeImage+1;_set_image_to_view();return false;});}}
_enable_keyboard_navigation();}
function _enable_keyboard_navigation(){$(document).keydown(function(objEvent){_keyboard_action(objEvent);});}
function _disable_keyboard_navigation(){$(document).unbind();}
function _keyboard_action(objEvent){
if (objEvent==null){keycode=event.keyCode;escapeKey=27;
} else {keycode=objEvent.keyCode;escapeKey=objEvent.DOM_VK_ESCAPE;}
key=String.fromCharCode(keycode).toLowerCase();
if ((key==settings.keyToClose)||(key==
'x'
)||(keycode==escapeKey)){_finish();}
if ((key==settings.keyToPrev)||(keycode==37)){
if (settings.activeImage !=0){settings.activeImage=settings.activeImage-1;_set_image_to_view();_disable_keyboard_navigation();}}
if ((key==settings.keyToNext)||(keycode==39)){
if (settings.activeImage !=(settings.imageArray.length-1)){settings.activeImage=settings.activeImage+1;_set_image_to_view();_disable_keyboard_navigation();}}}
function _preload_neighbor_images(){if ((settings.imageArray.length-1)>settings.activeImage){objNext=new Image();objNext.src=settings.imageArray[settings.activeImage+1][0];}
if (settings.activeImage>0){objPrev=new Image();objPrev.src=settings.imageArray[settings.activeImage-1][0];}}
function _finish(){$(
'#jquery-lightbox'
).remove();$(
'#jquery-overlay'
).fadeOut(function(){$(
'#jquery-overlay'
).remove();});
$(
'embed, object, select'
).css({
'visibility'
:
'visible'
});}
function ___getPageSize(){var xScroll,yScroll;if (window.innerHeight&&window.scrollMaxY){xScroll=window.innerWidth+window.scrollMaxX;yScroll=window.innerHeight+window.scrollMaxY;} else if (document.body.scrollHeight>document.body.offsetHeight){
xScroll=document.body.scrollWidth;yScroll=document.body.scrollHeight;} else {
xScroll=document.body.offsetWidth;yScroll=document.body.offsetHeight;}
var windowWidth,windowHeight;if (self.innerHeight){
if(document.documentElement.clientWidth){windowWidth=document.documentElement.clientWidth;} else {windowWidth=self.innerWidth;}
windowHeight=self.innerHeight;} else if (document.documentElement&&document.documentElement.clientHeight){
windowWidth=document.documentElement.clientWidth;windowHeight=document.documentElement.clientHeight;} else if (document.body){
windowWidth=document.body.clientWidth;windowHeight=document.body.clientHeight;}
if(yScroll<windowHeight){pageHeight=windowHeight;} else {pageHeight=yScroll;}
if(xScroll<windowWidth){pageWidth=xScroll;} else {pageWidth=windowWidth;}
arrayPageSize=new Array(pageWidth,pageHeight,windowWidth,windowHeight);return arrayPageSize;};
function ___getPageScroll(){var xScroll,yScroll;if (self.pageYOffset){yScroll=self.pageYOffset;xScroll=self.pageXOffset;} else if (document.documentElement&&document.documentElement.scrollTop){
yScroll=document.documentElement.scrollTop;xScroll=document.documentElement.scrollLeft;} else if (document.body){
yScroll=document.body.scrollTop;xScroll=document.body.scrollLeft;}
arrayPageScroll=new Array(xScroll,yScroll);return arrayPageScroll;};
function ___pause(ms){var date=new Date();curDate=null;do {var curDate=new Date();}
while (curDate-date<ms);};
return this.unbind(
'click'
).click(_initialize);};})(jQuery);
----------
(function(){var
window=this,
undefined,
_jQuery=window.jQuery,
_$=window.$,jQuery=window.jQuery=window.$=function(selector,context){
return new jQuery.fn.init(selector,context);},
quickExpr=
/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
isSimple=
/^.[^:#\[\.,]*$/;jQuery.fn=jQuery.prototype={init:function(selector,context){
selector=selector||document;
if (selector.nodeType){this[0]=selector;this.length=1;this.context=selector;return this;}
if (typeof selector===
"string"
){
var match=quickExpr.exec(selector);
if (match&&(match[1]||!context)){
if (match[1])
selector=jQuery.clean([ match[1] ],context);
else {var elem=document.getElementById(match[3]);
if (elem&&elem.id !=match[3])
return jQuery().find(selector);
var ret=jQuery(elem||[]);ret.context=document;ret.selector=selector;return ret;}
} else
return jQuery(context).find(selector);
} else if (jQuery.isFunction(selector))
return jQuery(document).ready(selector);
if (selector.selector&&selector.context){this.selector=selector.selector;this.context=selector.context;}
return this.setArray(jQuery.isArray(selector)?selector:jQuery.makeArray(selector));},
selector:
""
,
jquery:
"1.3.2"
,
size:function(){return this.length;},
get:function(num){return num===undefined?
Array.prototype.slice.call(this):
this[ num ];},
pushStack:function(elems,name,selector){
var ret=jQuery(elems);
ret.prevObject=this;ret.context=this.context;if (name===
"find"
)
ret.selector=this.selector+(this.selector?
" "
:
""
)+selector;else if (name)
ret.selector=this.selector+
"."
+name+
"("
+selector+
")"
;
return ret;},
setArray:function(elems){
this.length=0;Array.prototype.push.apply(this,elems);return this;},
each:function(callback,args){return jQuery.each(this,callback,args);},
index:function(elem){
return jQuery.inArray(
elem&&elem.jquery?elem[0]:elem,this);},attr:function(name,value,type){var options=name;
if (typeof name===
"string"
)
if (value===undefined)
return this[0]&&jQuery[ type||
"attr"
](this[0],name);else {options={};options[ name ]=value;}
return this.each(function(i){
for (name in options)
jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[ name ],type,i,name));});},css:function(key,value){
if ((key==
'width'
||key==
'height'
)&&parseFloat(value)<0)
value=undefined;return this.attr(key,value,
"curCSS"
);},text:function(text){if (typeof text !==
"object"
&&text !=null)
return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));var ret=
""
;jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if (this.nodeType !=8)
ret+=this.nodeType !=1?this.nodeValue:jQuery.fn.text([ this ]);});});return ret;},wrapAll:function(html){if (this[0]){
var wrap=jQuery(html,this[0].ownerDocument).clone();if (this[0].parentNode)
wrap.insertBefore(this[0]);wrap.map(function(){var elem=this;while (elem.firstChild)
elem=elem.firstChild;return elem;}).append(this);}
return this;},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html);});},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html);});},append:function(){return this.domManip(arguments,true,function(elem){if (this.nodeType==1)
this.appendChild(elem);});},prepend:function(){return this.domManip(arguments,true,function(elem){if (this.nodeType==1)
this.insertBefore(elem,this.firstChild);});},before:function(){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this);});},after:function(){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});},end:function(){return this.prevObject||jQuery([]);},
push:[].push,sort:[].sort,splice:[].splice,find:function(selector){if (this.length===1){var ret=this.pushStack([],
"find"
,selector);ret.length=0;jQuery.find(selector,this[0],ret);return ret;} else {return this.pushStack(jQuery.unique(jQuery.map(this,function(elem){return jQuery.find(selector,elem);})),
"find"
,selector);}},clone:function(events){
var ret=this.map(function(){if (!jQuery.support.noCloneEvent&&!jQuery.isXMLDoc(this)){
var html=this.outerHTML;if (!html){var div=this.ownerDocument.createElement(
"div"
);div.appendChild(this.cloneNode(true));html=div.innerHTML;}
return jQuery.clean([html.replace(
/ jQuery\d+="(?:\d+|null)"/g,
""
).replace(
/^\s*/,
""
)])[0];} else
return this.cloneNode(true);});
if (events===true){var orig=this.find(
"*"
).andSelf(),i=0;ret.find(
"*"
).andSelf().each(function(){if (this.nodeName !==orig[i].nodeName)
return;var events=jQuery.data(orig[i],
"events"
);for (var type in events){for (var handler in events[ type ]){jQuery.event.add(this,type,events[ type ][ handler ],events[ type ][ handler ].data);}}
i++;});}
return ret;},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i);})||jQuery.multiFilter(selector,jQuery.grep(this,function(elem){return elem.nodeType===1;})),
"filter"
,selector);},closest:function(selector){var pos=jQuery.expr.match.POS.test(selector)?jQuery(selector):null,closer=0;return this.map(function(){var cur=this;while (cur&&cur.ownerDocument){if (pos?pos.index(cur)>-1:jQuery(cur).is(selector)){jQuery.data(cur,
"closest"
,closer);return cur;}
cur=cur.parentNode;closer++;}});},not:function(selector){if (typeof selector===
"string"
)
if (isSimple.test(selector))
return this.pushStack(jQuery.multiFilter(selector,this,true),
"not"
,selector);else
selector=jQuery.multiFilter(selector,this);var isArrayLike=selector.length&&selector[selector.length-1] !==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this !=selector;});},add:function(selector){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),typeof selector===
"string"
?jQuery(selector):jQuery.makeArray(selector))));},is:function(selector){return !!selector&&jQuery.multiFilter(selector,this).length>0;},hasClass:function(selector){return !!selector&&this.is(
"."
+selector);},val:function(value){if (value===undefined){var elem=this[0];if (elem){if(jQuery.nodeName(elem,
'option'
))
return (elem.attributes.value||{}).specified?elem.value:elem.text;
if (jQuery.nodeName(elem,
"select"
)){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type==
"select-one"
;
if (index<0)
return null;
for (var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[ i ];if (option.selected){
value=jQuery(option).val();
if (one)
return value;
values.push(value);}}
return values;}
return (elem.value||
""
).replace(
/\r/g,
""
);}
return undefined;}
if (typeof value===
"number"
)
value+=
''
;return this.each(function(){if (this.nodeType !=1)
return;if (jQuery.isArray(value)&&
/radio|checkbox/.test(this.type))
this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0);else if (jQuery.nodeName(this,
"select"
)){var values=jQuery.makeArray(value);jQuery(
"option"
,this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0);});if (!values.length)
this.selectedIndex=-1;} else
this.value=value;});},html:function(value){return value===undefined?(this[0]?this[0].innerHTML.replace(
/ jQuery\d+="(?:\d+|null)"/g,
""
):null):this.empty().append(value);},replaceWith:function(value){return this.after(value).remove();},eq:function(i){return this.slice(i,+i+1);},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),
"slice"
,Array.prototype.slice.call(arguments).join(
","
));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},andSelf:function(){return this.add(this.prevObject);},domManip:function(args,table,callback){if (this[0]){var fragment=(this[0].ownerDocument||this[0]).createDocumentFragment(),scripts=jQuery.clean(args,(this[0].ownerDocument||this[0]),fragment),first=fragment.firstChild;if (first)
for (var i=0,l=this.length;i<l;i++)
callback.call(root(this[i],first),this.length>1||i>0?fragment.cloneNode(true):fragment);if (scripts)
jQuery.each(scripts,evalScript);}
return this;function root(elem,cur){return table&&jQuery.nodeName(elem,
"table"
)&&jQuery.nodeName(cur,
"tr"
)?(elem.getElementsByTagName(
"tbody"
)[0]||elem.appendChild(elem.ownerDocument.createElement(
"tbody"
))):elem;}}};
jQuery.fn.init.prototype=jQuery.fn;function evalScript(i,elem){if (elem.src)
jQuery.ajax({url:elem.src,async:false,dataType:
"script"
});else
jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||
""
);if (elem.parentNode)
elem.parentNode.removeChild(elem);}
function now(){return+new Date;}
jQuery.extend=jQuery.fn.extend=function(){
var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;
if (typeof target===
"boolean"
){deep=target;target=arguments[1]||{};
i=2;}
if (typeof target !==
"object"
&&!jQuery.isFunction(target))
target={};
if (length==i){target=this;--i;}
for (;i<length;i++)
if ((options=arguments[ i ]) !=null)
for (var name in options){var src=target[ name ],copy=options[ name ];
if (target===copy)
continue;
if (deep&&copy&&typeof copy===
"object"
&&!copy.nodeType)
target[ name ]=jQuery.extend(deep,
src||(copy.length !=null?[ ]:{}),copy);
else if (copy !==undefined)
target[ name ]=copy;}
return target;};
var exclude=
/z-?index|font-?weight|opacity|zoom|line-?height/i,
defaultView=document.defaultView||{},toString=Object.prototype.toString;jQuery.extend({noConflict:function(deep){window.$=_$;if (deep)
window.jQuery=_jQuery;return jQuery;},
isFunction:function(obj){return toString.call(obj)===
"[object Function]"
;},isArray:function(obj){return toString.call(obj)===
"[object Array]"
;},
isXMLDoc:function(elem){return elem.nodeType===9&&elem.documentElement.nodeName !==
"HTML"
||!!elem.ownerDocument&&jQuery.isXMLDoc(elem.ownerDocument);},
globalEval:function(data){if (data&&
/\S/.test(data)){
var head=document.getElementsByTagName(
"head"
)[0]||document.documentElement,script=document.createElement(
"script"
);script.type=
"text/javascript"
;if (jQuery.support.scriptEval)
script.appendChild(document.createTextNode(data));else
script.text=data;
head.insertBefore(script,head.firstChild);head.removeChild(script);}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase();},
each:function(object,callback,args){var name,i=0,length=object.length;if (args){if (length===undefined){for (name in object)
if (callback.apply(object[ name ],args)===false)
break;} else
for (;i<length;)
if (callback.apply(object[ i++],args)===false)
break;
} else {if (length===undefined){for (name in object)
if (callback.call(object[ name ],name,object[ name ])===false)
break;} else
for (var value=object[0];i<length&&callback.call(value,i,value) !==false;value=object[++i]){}}
return object;},prop:function(elem,value,type,i,name){
if (jQuery.isFunction(value))
value=value.call(elem,i);
return typeof value===
"number"
&&type==
"curCSS"
&&!exclude.test(name)?value+
"px"
:value;},className:{
add:function(elem,classNames){jQuery.each((classNames||
""
).split(
/\s+/),function(i,className){if (elem.nodeType==1&&!jQuery.className.has(elem.className,className))
elem.className+=(elem.className?
" "
:
""
)+className;});},
remove:function(elem,classNames){if (elem.nodeType==1)
elem.className=classNames !==undefined?jQuery.grep(elem.className.split(
/\s+/),function(className){return !jQuery.className.has(classNames,className);}).join(
" "
):
""
;},
has:function(elem,className){return elem&&jQuery.inArray(className,(elem.className||elem).toString().split(
/\s+/))>-1;}},
swap:function(elem,options,callback){var old={};
for (var name in options){old[ name ]=elem.style[ name ];elem.style[ name ]=options[ name ];}
callback.call(elem);
for (var name in options)
elem.style[ name ]=old[ name ];},css:function(elem,name,force,extra){if (name==
"width"
||name==
"height"
){var val,props={position:
"absolute"
,visibility:
"hidden"
,display:
"block"
},which=name==
"width"
?[
"Left"
,
"Right"
]:[
"Top"
,
"Bottom"
];function getWH(){val=name==
"width"
?elem.offsetWidth:elem.offsetHeight;if (extra===
"border"
)
return;jQuery.each(which,function(){if (!extra)
val-=parseFloat(jQuery.curCSS(elem,
"padding"
+this,true))||0;if (extra===
"margin"
)
val+=parseFloat(jQuery.curCSS(elem,
"margin"
+this,true))||0;else
val-=parseFloat(jQuery.curCSS(elem,
"border"
+this+
"Width"
,true))||0;});}
if (elem.offsetWidth !==0)
getWH();else
jQuery.swap(elem,props,getWH);return Math.max(0,Math.round(val));}
return jQuery.curCSS(elem,name,force);},curCSS:function(elem,name,force){var ret,style=elem.style;
if (name==
"opacity"
&&!jQuery.support.opacity){ret=jQuery.attr(style,
"opacity"
);return ret==
""
?
"1"
:ret;}
if (name.match(
/float/i))
name=styleFloat;if (!force&&style&&style[ name ])
ret=style[ name ];else if (defaultView.getComputedStyle){
if (name.match(
/float/i))
name=
"float"
;name=name.replace(
/([A-Z])/g,
"-$1"
).toLowerCase();var computedStyle=defaultView.getComputedStyle(elem,null);if (computedStyle)
ret=computedStyle.getPropertyValue(name);
if (name==
"opacity"
&&ret==
""
)
ret=
"1"
;} else if (elem.currentStyle){var camelCase=name.replace(
/\-(\w)/g,function(all,letter){return letter.toUpperCase();});ret=elem.currentStyle[ name ]||elem.currentStyle[ camelCase ];
if (!
/^\d+(px)?$/i.test(ret)&&
/^\d/.test(ret)){
var left=style.left,rsLeft=elem.runtimeStyle.left;
elem.runtimeStyle.left=elem.currentStyle.left;style.left=ret||0;ret=style.pixelLeft+
"px"
;
style.left=left;elem.runtimeStyle.left=rsLeft;}}
return ret;},clean:function(elems,context,fragment){context=context||document;
if (typeof context.createElement===
"undefined"
)
context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;
if (!fragment&&elems.length===1&&typeof elems[0]===
"string"
){var match=
/^<(\w+)\s*\/?>$/.exec(elems[0]);if (match)
return [ context.createElement(match[1]) ];}
var ret=[],scripts=[],div=context.createElement(
"div"
);jQuery.each(elems,function(i,elem){if (typeof elem===
"number"
)
elem+=
''
;if (!elem)
return;
if (typeof elem===
"string"
){
elem=elem.replace(
/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(
/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+
"></"
+tag+
">"
;});
var tags=elem.replace(
/^\s+/,
""
).substring(0,10).toLowerCase();var wrap=
!tags.indexOf(
"<opt"
)&&[ 1,
"<select multiple='multiple'>"
,
"</select>"
]||!tags.indexOf(
"<leg"
)&&[ 1,
"<fieldset>"
,
"</fieldset>"
]||tags.match(
/^<(thead|tbody|tfoot|colg|cap)/)&&[ 1,
"<table>"
,
"</table>"
]||!tags.indexOf(
"<tr"
)&&[ 2,
"<table><tbody>"
,
"</tbody></table>"
]||
(!tags.indexOf(
"<td"
)||!tags.indexOf(
"<th"
))&&[ 3,
"<table><tbody><tr>"
,
"</tr></tbody></table>"
]||!tags.indexOf(
"<col"
)&&[ 2,
"<table><tbody></tbody><colgroup>"
,
"</colgroup></table>"
]||
!jQuery.support.htmlSerialize&&[ 1,
"div<div>"
,
"</div>"
]||[ 0,
""
,
""
];
div.innerHTML=wrap[1]+elem+wrap[2];
while (wrap[0]--)
div=div.lastChild;
if (!jQuery.support.tbody){
var hasBody=
/<tbody/i.test(elem),tbody=!tags.indexOf(
"<table"
)&&!hasBody?div.firstChild&&div.firstChild.childNodes:
wrap[1]==
"<table>"
&&!hasBody?div.childNodes:[];for (var j=tbody.length-1;j>=0;--j)
if (jQuery.nodeName(tbody[ j ],
"tbody"
)&&!tbody[ j ].childNodes.length)
tbody[ j ].parentNode.removeChild(tbody[ j ]);}
if (!jQuery.support.leadingWhitespace&&
/^\s/.test(elem))
div.insertBefore(context.createTextNode(elem.match(
/^\s*/)[0]),div.firstChild);elem=jQuery.makeArray(div.childNodes);}
if (elem.nodeType)
ret.push(elem);else
ret=jQuery.merge(ret,elem);});if (fragment){for (var i=0;ret[i];i++){if (jQuery.nodeName(ret[i],
"script"
)&&(!ret[i].type||ret[i].type.toLowerCase()===
"text/javascript"
)){scripts.push(ret[i].parentNode?ret[i].parentNode.removeChild(ret[i]):ret[i]);} else {if (ret[i].nodeType===1)
ret.splice.apply(ret,[i+1,0].concat(jQuery.makeArray(ret[i].getElementsByTagName(
"script"
))));fragment.appendChild(ret[i]);}}
return scripts;}
return ret;},attr:function(elem,name,value){
if (!elem||elem.nodeType==3||elem.nodeType==8)
return undefined;var notxml=!jQuery.isXMLDoc(elem),
set=value !==undefined;
name=notxml&&jQuery.props[ name ]||name;
if (elem.tagName){
var special=
/href|src|style/.test(name);
if (name==
"selected"
&&elem.parentNode)
elem.parentNode.selectedIndex;
if (name in elem&&notxml&&!special){if (set){
if (name==
"type"
&&jQuery.nodeName(elem,
"input"
)&&elem.parentNode)
throw
"type property can't be changed"
;elem[ name ]=value;}
if(jQuery.nodeName(elem,
"form"
)&&elem.getAttributeNode(name))
return elem.getAttributeNode(name).nodeValue;
if (name==
"tabIndex"
){var attributeNode=elem.getAttributeNode(
"tabIndex"
);return attributeNode&&attributeNode.specified?attributeNode.value:elem.nodeName.match(
/(button|input|object|select|textarea)/i)?0:elem.nodeName.match(
/^(a|area)$/i)&&elem.href?0:undefined;}
return elem[ name ];}
if (!jQuery.support.style&&notxml&&name==
"style"
)
return jQuery.attr(elem.style,
"cssText"
,value);if (set)
elem.setAttribute(name,
""
+value);var attr=!jQuery.support.hrefNormalized&&notxml&&special
?elem.getAttribute(name,2):elem.getAttribute(name);
return attr===null?undefined:attr;}
if (!jQuery.support.opacity&&name==
"opacity"
){if (set){
elem.zoom=1;
elem.filter=(elem.filter||
""
).replace(
/alpha\([^)]*\)/,
""
)+(parseInt(value)+
''
==
"NaN"
?
""
:
"alpha(opacity="
+value * 100+
")"
);}
return elem.filter&&elem.filter.indexOf(
"opacity="
)>=0?(parseFloat(elem.filter.match(
/opacity=([^)]*)/)[1]) / 100)+
''
:
""
;}
name=name.replace(
/-([a-z])/ig,function(all,letter){return letter.toUpperCase();});if (set)
elem[ name ]=value;return elem[ name ];},trim:function(text){return (text||
""
).replace(
/^\s+|\s+$/g,
""
);},makeArray:function(array){var ret=[];if(array !=null){var i=array.length;
if(i==null||typeof array===
"string"
||jQuery.isFunction(array)||array.setInterval)
ret[0]=array;else
while(i)
ret[--i]=array[i];}
return ret;},inArray:function(elem,array){for (var i=0,length=array.length;i<length;i++)
if (array[ i ]===elem)
return i;return-1;},merge:function(first,second){
var i=0,elem,pos=first.length;
if (!jQuery.support.getAll){while ((elem=second[ i++]) !=null)
if (elem.nodeType !=8)
first[ pos++]=elem;} else
while ((elem=second[ i++]) !=null)
first[ pos++]=elem;return first;},unique:function(array){var ret=[],done={};try {for (var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[ i ]);if (!done[ id ]){done[ id ]=true;ret.push(array[ i ]);}}} catch(e){ret=array;}
return ret;},grep:function(elems,callback,inv){var ret=[];
for (var i=0,length=elems.length;i<length;i++)
if (!inv !=!callback(elems[ i ],i))
ret.push(elems[ i ]);return ret;},map:function(elems,callback){var ret=[];
for (var i=0,length=elems.length;i<length;i++){var value=callback(elems[ i ],i);if (value !=null)
ret[ ret.length ]=value;}
return ret.concat.apply([],ret);}});
var userAgent=navigator.userAgent.toLowerCase();
jQuery.browser={version:(userAgent.match(
/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,
'0'
])[1],safari:
/webkit/.test(userAgent),opera:
/opera/.test(userAgent),msie:
/msie/.test(userAgent)&&!
/opera/.test(userAgent),mozilla:
/mozilla/.test(userAgent)&&!
/(compatible|webkit)/.test(userAgent)};jQuery.each({parent:function(elem){return elem.parentNode;},parents:function(elem){return jQuery.dir(elem,
"parentNode"
);},next:function(elem){return jQuery.nth(elem,2,
"nextSibling"
);},prev:function(elem){return jQuery.nth(elem,2,
"previousSibling"
);},nextAll:function(elem){return jQuery.dir(elem,
"nextSibling"
);},prevAll:function(elem){return jQuery.dir(elem,
"previousSibling"
);},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,
"iframe"
)?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[ name ]=function(selector){var ret=jQuery.map(this,fn);if (selector&&typeof selector==
"string"
)
ret=jQuery.multiFilter(selector,ret);return this.pushStack(jQuery.unique(ret),name,selector);};});jQuery.each({appendTo:
"append"
,prependTo:
"prepend"
,insertBefore:
"before"
,insertAfter:
"after"
,replaceAll:
"replaceWith"
},function(name,original){jQuery.fn[ name ]=function(selector){var ret=[],insert=jQuery(selector);for (var i=0,l=insert.length;i<l;i++){var elems=(i>0?this.clone(true):this).get();jQuery.fn[ original ].apply(jQuery(insert[i]),elems);ret=ret.concat(elems);}
return this.pushStack(ret,name,selector);};});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,
""
);if (this.nodeType==1)
this.removeAttribute(name);},addClass:function(classNames){jQuery.className.add(this,classNames);},removeClass:function(classNames){jQuery.className.remove(this,classNames);},toggleClass:function(classNames,state){if(typeof state !==
"boolean"
)
state=!jQuery.className.has(this,classNames);jQuery.className[ state?
"add"
:
"remove"
](this,classNames);},remove:function(selector){if (!selector||jQuery.filter(selector,[ this ]).length){
jQuery(
"*"
,this).add([this]).each(function(){jQuery.event.remove(this);jQuery.removeData(this);});if (this.parentNode)
this.parentNode.removeChild(this);}},empty:function(){
jQuery(this).children().remove();
while (this.firstChild)
this.removeChild(this.firstChild);}},function(name,fn){jQuery.fn[ name ]=function(){return this.each(fn,arguments);};});
function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0;}
var expando=
"jQuery"
+now(),uuid=0,windowData={};jQuery.extend({cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[ expando ];
if (!id)
id=elem[ expando ]=++uuid;
if (name&&!jQuery.cache[ id ])
jQuery.cache[ id ]={};
if (data !==undefined)
jQuery.cache[ id ][ name ]=data;
return name?jQuery.cache[ id ][ name ]:id;},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[ expando ];
if (name){if (jQuery.cache[ id ]){
delete jQuery.cache[ id ][ name ];
name=
""
;for (name in jQuery.cache[ id ])
break;if (!name)
jQuery.removeData(elem);}
} else {
try {delete elem[ expando ];} catch(e){
if (elem.removeAttribute)
elem.removeAttribute(expando);}
delete jQuery.cache[ id ];}},queue:function(elem,type,data){if (elem){type=(type||
"fx"
)+
"queue"
;var q=jQuery.data(elem,type);if (!q||jQuery.isArray(data))
q=jQuery.data(elem,type,jQuery.makeArray(data));else if(data)
q.push(data);}
return q;},dequeue:function(elem,type){var queue=jQuery.queue(elem,type),fn=queue.shift();if(!type||type===
"fx"
)
fn=queue[0];if(fn !==undefined)
fn.call(elem);}});jQuery.fn.extend({data:function(key,value){var parts=key.split(
"."
);parts[1]=parts[1]?
"."
+parts[1]:
""
;if (value===undefined){var data=this.triggerHandler(
"getData"
+parts[1]+
"!"
,[parts[0]]);if (data===undefined&&this.length)
data=jQuery.data(this[0],key);return data===undefined&&parts[1]?this.data(parts[0]):data;} else
return this.trigger(
"setData"
+parts[1]+
"!"
,[parts[0],value]).each(function(){jQuery.data(this,key,value);});},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});},queue:function(type,data){if (typeof type !==
"string"
){data=type;type=
"fx"
;}
if (data===undefined)
return jQuery.queue(this[0],type);return this.each(function(){var queue=jQuery.queue(this,type,data);if(type==
"fx"
&&queue.length==1)
queue[0].call(this);});},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type);});}});
(function(){var chunker=
/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,done=0,toString=Object.prototype.toString;var Sizzle=function(selector,context,results,seed){results=results||[];context=context||document;if (context.nodeType !==1&&context.nodeType !==9)
return [];if (!selector||typeof selector !==
"string"
){return results;}
var parts=[],m,set,checkSet,check,mode,extra,prune=true;
chunker.lastIndex=0;while ((m=chunker.exec(selector)) !==null){parts.push(m[1]);if (m[2]){extra=RegExp.rightContext;break;}}
if (parts.length>1&&origPOS.exec(selector)){if (parts.length===2&&Expr.relative[ parts[0] ]){set=posProcess(parts[0]+parts[1],context);} else {set=Expr.relative[ parts[0] ]?[ context ]:Sizzle(parts.shift(),context);while (parts.length){selector=parts.shift();if (Expr.relative[ selector ])
selector+=parts.shift();set=posProcess(selector,set);}}} else {var ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&context.parentNode?context.parentNode:context,isXML(context));set=Sizzle.filter(ret.expr,ret.set);if (parts.length>0){checkSet=makeArray(set);} else {prune=false;}
while (parts.length){var cur=parts.pop(),pop=cur;if (!Expr.relative[ cur ]){cur=
""
;} else {pop=parts.pop();}
if (pop==null){pop=context;}
Expr.relative[ cur ](checkSet,pop,isXML(context));}}
if (!checkSet){checkSet=set;}
if (!checkSet){throw
"Syntax error, unrecognized expression: "
+(cur||selector);}
if (toString.call(checkSet)===
"[object Array]"
){if (!prune){results.push.apply(results,checkSet);} else if (context.nodeType===1){for (var i=0;checkSet[i] !=null;i++){if (checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&contains(context,checkSet[i]))){results.push(set[i]);}}} else {for (var i=0;checkSet[i] !=null;i++){if (checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i]);}}}} else {makeArray(checkSet,results);}
if (extra){Sizzle(extra,context,results,seed);if (sortOrder){hasDuplicate=false;results.sort(sortOrder);if (hasDuplicate){for (var i=1;i<results.length;i++){if (results[i]===results[i-1]){results.splice(i--,1);}}}}}
return results;};Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set);};Sizzle.find=function(expr,context,isXML){var set,match;if (!expr){return [];}
for (var i=0,l=Expr.order.length;i<l;i++){var type=Expr.order[i],match;if ((match=Expr.match[ type ].exec(expr))){var left=RegExp.leftContext;if (left.substr(left.length-1) !==
"\\"
){match[1]=(match[1]||
""
).replace(
/\\/g,
""
);set=Expr.find[ type ](match,context,isXML);if (set !=null){expr=expr.replace(Expr.match[ type ],
""
);break;}}}}
if (!set){set=context.getElementsByTagName(
"*"
);}
return {set:set,expr:expr};};Sizzle.filter=function(expr,set,inplace,not){var old=expr,result=[],curLoop=set,match,anyFound,isXMLFilter=set&&set[0]&&isXML(set[0]);while (expr&&set.length){for (var type in Expr.filter){if ((match=Expr.match[ type ].exec(expr)) !=null){var filter=Expr.filter[ type ],found,item;anyFound=false;if (curLoop==result){result=[];}
if (Expr.preFilter[ type ]){match=Expr.preFilter[ type ](match,curLoop,inplace,result,not,isXMLFilter);if (!match){anyFound=found=true;} else if (match===true){continue;}}
if (match){for (var i=0;(item=curLoop[i]) !=null;i++){if (item){found=filter(item,match,i,curLoop);var pass=not ^ !!found;if (inplace&&found !=null){if (pass){anyFound=true;} else {curLoop[i]=false;}} else if (pass){result.push(item);anyFound=true;}}}}
if (found !==undefined){if (!inplace){curLoop=result;}
expr=expr.replace(Expr.match[ type ],
""
);if (!anyFound){return [];}
break;}}}
if (expr==old){if (anyFound==null){throw
"Syntax error, unrecognized expression: "
+expr;} else {break;}}
old=expr;}
return curLoop;};var Expr=Sizzle.selectors={order:[
"ID"
,
"NAME"
,
"TAG"
],match:{ID:
/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:
/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:
/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:
/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:
/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:
/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:
/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:
/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{
"class"
:
"className"
,
"for"
:
"htmlFor"
},attrHandle:{href:function(elem){return elem.getAttribute(
"href"
);}},relative:{
"+"
:function(checkSet,part,isXML){var isPartStr=typeof part===
"string"
,isTag=isPartStr&&!
/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;if (isTag&&!isXML){part=part.toUpperCase();}
for (var i=0,l=checkSet.length,elem;i<l;i++){if ((elem=checkSet[i])){while ((elem=elem.previousSibling)&&elem.nodeType !==1){}
checkSet[i]=isPartStrNotTag||elem&&elem.nodeName===part?elem||false:elem===part;}}
if (isPartStrNotTag){Sizzle.filter(part,checkSet,true);}},
">"
:function(checkSet,part,isXML){var isPartStr=typeof part===
"string"
;if (isPartStr&&!
/\W/.test(part)){part=isXML?part:part.toUpperCase();for (var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if (elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName===part?parent:false;}}} else {for (var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if (elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part;}}
if (isPartStr){Sizzle.filter(part,checkSet,true);}}},
""
:function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if (!part.match(
/\W/)){var nodeCheck=part=isXML?part:part.toUpperCase();checkFn=dirNodeCheck;}
checkFn(
"parentNode"
,part,doneName,checkSet,nodeCheck,isXML);},
"~"
:function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;if (typeof part===
"string"
&&!part.match(
/\W/)){var nodeCheck=part=isXML?part:part.toUpperCase();checkFn=dirNodeCheck;}
checkFn(
"previousSibling"
,part,doneName,checkSet,nodeCheck,isXML);}},find:{ID:function(match,context,isXML){if (typeof context.getElementById !==
"undefined"
&&!isXML){var m=context.getElementById(match[1]);return m?[m]:[];}},NAME:function(match,context,isXML){if (typeof context.getElementsByName !==
"undefined"
){var ret=[],results=context.getElementsByName(match[1]);for (var i=0,l=results.length;i<l;i++){if (results[i].getAttribute(
"name"
)===match[1]){ret.push(results[i]);}}
return ret.length===0?null:ret;}},TAG:function(match,context){return context.getElementsByTagName(match[1]);}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=
" "
+match[1].replace(
/\\/g,
""
)+
" "
;if (isXML){return match;}
for (var i=0,elem;(elem=curLoop[i]) !=null;i++){if (elem){if (not ^ (elem.className&&(
" "
+elem.className+
" "
).indexOf(match)>=0)){if (!inplace)
result.push(elem);} else if (inplace){curLoop[i]=false;}}}
return false;},ID:function(match){return match[1].replace(
/\\/g,
""
);},TAG:function(match,curLoop){for (var i=0;curLoop[i]===false;i++){}
return curLoop[i]&&isXML(curLoop[i])?match[1]:match[1].toUpperCase();},CHILD:function(match){if (match[1]==
"nth"
){
var test=
/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]==
"even"
&&
"2n"
||match[2]==
"odd"
&&
"2n+1"
||!
/\D/.test(match[2])&&
"0n+"
+match[2]||match[2]);
match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0;}
match[0]=done++;return match;},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(
/\\/g,
""
);if (!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name];}
if (match[2]===
"~="
){match[4]=
" "
+match[4]+
" "
;}
return match;},PSEUDO:function(match,curLoop,inplace,result,not){if (match[1]===
"not"
){
if (match[3].match(chunker).length>1||
/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop);} else {var ret=Sizzle.filter(match[3],curLoop,inplace,true ^ not);if (!inplace){result.push.apply(result,ret);}
return false;}} else if (Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true;}
return match;},POS:function(match){match.unshift(true);return match;}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type !==
"hidden"
;},disabled:function(elem){return elem.disabled===true;},checked:function(elem){return elem.checked===true;},selected:function(elem){
elem.parentNode.selectedIndex;return elem.selected===true;},parent:function(elem){return !!elem.firstChild;},empty:function(elem){return !elem.firstChild;},has:function(elem,i,match){return !!Sizzle(match[3],elem).length;},header:function(elem){return
/h\d/i.test(elem.nodeName);},text:function(elem){return
"text"
===elem.type;},radio:function(elem){return
"radio"
===elem.type;},checkbox:function(elem){return
"checkbox"
===elem.type;},file:function(elem){return
"file"
===elem.type;},password:function(elem){return
"password"
===elem.type;},submit:function(elem){return
"submit"
===elem.type;},image:function(elem){return
"image"
===elem.type;},reset:function(elem){return
"reset"
===elem.type;},button:function(elem){return
"button"
===elem.type||elem.nodeName.toUpperCase()===
"BUTTON"
;},input:function(elem){return
/input|select|textarea|button/i.test(elem.nodeName);}},setFilters:{first:function(elem,i){return i===0;},last:function(elem,i,match,array){return i===array.length-1;},even:function(elem,i){return i%2===0;},odd:function(elem,i){return i%2===1;},lt:function(elem,i,match){return i<match[3]-0;},gt:function(elem,i,match){return i>match[3]-0;},nth:function(elem,i,match){return match[3]-0==i;},eq:function(elem,i,match){return match[3]-0==i;}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[ name ];if (filter){return filter(elem,i,match,array);} else if (name===
"contains"
){return (elem.textContent||elem.innerText||
""
).indexOf(match[3])>=0;} else if (name===
"not"
){var not=match[3];for (var i=0,l=not.length;i<l;i++){if (not[i]===elem){return false;}}
return true;}},CHILD:function(elem,match){var type=match[1],node=elem;switch (type){case
'only'
:case
'first'
:while (node=node.previousSibling){if (node.nodeType===1) return false;}
if (type==
'first'
) return true;node=elem;case
'last'
:while (node=node.nextSibling){if (node.nodeType===1) return false;}
return true;case
'nth'
:var first=match[2],last=match[3];if (first==1&&last==0){return true;}
var doneName=match[0],parent=elem.parentNode;if (parent&&(parent.sizcache !==doneName||!elem.nodeIndex)){var count=0;for (node=parent.firstChild;node;node=node.nextSibling){if (node.nodeType===1){node.nodeIndex=++count;}}
 parent.sizcache=doneName;}
var diff=elem.nodeIndex-last;if (first==0){return diff==0;} else {return (diff%first==0&&diff / first>=0);}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute(
"id"
)===match;},TAG:function(elem,match){return (match===
"*"
&&elem.nodeType===1)||elem.nodeName===match;},CLASS:function(elem,match){return (
" "
+(elem.className||elem.getAttribute(
"class"
))+
" "
)
.indexOf(match)>-1;},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[ name ]?Expr.attrHandle[ name ](elem):elem[ name ] !=null?elem[ name ]:elem.getAttribute(name),value=result+
""
,type=match[2],check=match[4];return result==null?type===
"!="
:type===
"="
?value===check:type===
"*="
?value.indexOf(check)>=0:type===
"~="
?(
" "
+value+
" "
).indexOf(check)>=0:!check?value&&result !==false:type===
"!="
?value !=check:type===
"^="
?value.indexOf(check)===0:type===
"$="
?value.substr(value.length-check.length)===check:type===
"|="
?value===check||value.substr(0,check.length+1)===check+
"-"
:false;},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[ name ];if (filter){return filter(elem,i,match,array);}}}};var origPOS=Expr.match.POS;for (var type in Expr.match){Expr.match[ type ]=RegExp(Expr.match[ type ].source+
/(?![^\[]*\])(?![^\(]*\))/.source);}
var makeArray=function(array,results){array=Array.prototype.slice.call(array);if (results){results.push.apply(results,array);return results;}
return array;};
try {Array.prototype.slice.call(document.documentElement.childNodes);
} catch(e){makeArray=function(array,results){var ret=results||[];if (toString.call(array)===
"[object Array]"
){Array.prototype.push.apply(ret,array);} else {if (typeof array.length===
"number"
){for (var i=0,l=array.length;i<l;i++){ret.push(array[i]);}} else {for (var i=0;array[i];i++){ret.push(array[i]);}}}
return ret;};}
var sortOrder;if (document.documentElement.compareDocumentPosition){sortOrder=function(a,b){var ret=a.compareDocumentPosition(b)&4?-1:a===b?0:1;if (ret===0){hasDuplicate=true;}
return ret;};} else if (
"sourceIndex"
in document.documentElement){sortOrder=function(a,b){var ret=a.sourceIndex-b.sourceIndex;if (ret===0){hasDuplicate=true;}
return ret;};} else if (document.createRange){sortOrder=function(a,b){var aRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();aRange.selectNode(a);aRange.collapse(true);bRange.selectNode(b);bRange.collapse(true);var ret=aRange.compareBoundaryPoints(Range.START_TO_END,bRange);if (ret===0){hasDuplicate=true;}
return ret;};}
(function(){
var form=document.createElement(
"form"
),id=
"script"
+(new Date).getTime();form.innerHTML=
"<input name='"
+id+
"'/>"
;
var root=document.documentElement;root.insertBefore(form,root.firstChild);
if (!!document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if (typeof context.getElementById !==
"undefined"
&&!isXML){var m=context.getElementById(match[1]);return m?m.id===match[1]||typeof m.getAttributeNode !==
"undefined"
&&m.getAttributeNode(
"id"
).nodeValue===match[1]?[m]:undefined:[];}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode !==
"undefined"
&&elem.getAttributeNode(
"id"
);return elem.nodeType===1&&node&&node.nodeValue===match;};}
root.removeChild(form);})();(function(){
var div=document.createElement(
"div"
);div.appendChild(document.createComment(
""
));
if (div.getElementsByTagName(
"*"
).length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);
if (match[1]===
"*"
){var tmp=[];for (var i=0;results[i];i++){if (results[i].nodeType===1){tmp.push(results[i]);}}
results=tmp;}
return results;};}
div.innerHTML=
"<a href='#'></a>"
;if (div.firstChild&&typeof div.firstChild.getAttribute !==
"undefined"
&&div.firstChild.getAttribute(
"href"
) !==
"#"
){Expr.attrHandle.href=function(elem){return elem.getAttribute(
"href"
,2);};}})();if (document.querySelectorAll) (function(){var oldSizzle=Sizzle,div=document.createElement(
"div"
);div.innerHTML=
"<p class='TEST'></p>"
;
if (div.querySelectorAll&&div.querySelectorAll(
".TEST"
).length===0){return;}
Sizzle=function(query,context,extra,seed){context=context||document;
if (!seed&&context.nodeType===9&&!isXML(context)){try {return makeArray(context.querySelectorAll(query),extra);} catch(e){}}
return oldSizzle(query,context,extra,seed);};Sizzle.find=oldSizzle.find;Sizzle.filter=oldSizzle.filter;Sizzle.selectors=oldSizzle.selectors;Sizzle.matches=oldSizzle.matches;})();if (document.getElementsByClassName&&document.documentElement.getElementsByClassName) (function(){var div=document.createElement(
"div"
);div.innerHTML=
"<div class='test e'></div><div class='test'></div>"
;
if (div.getElementsByClassName(
"e"
).length===0)
return;
div.lastChild.className=
"e"
;if (div.getElementsByClassName(
"e"
).length===1)
return;Expr.order.splice(1,0,
"CLASS"
);Expr.find.CLASS=function(match,context,isXML){if (typeof context.getElementsByClassName !==
"undefined"
&&!isXML){return context.getElementsByClassName(match[1]);}};})();function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir==
"previousSibling"
&&!isXML;for (var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if (elem){if (sibDir&&elem.nodeType===1){elem.sizcache=doneName;elem.sizset=i;}
elem=elem[dir];var match=false;while (elem){if (elem.sizcache===doneName){match=checkSet[elem.sizset];break;}
if (elem.nodeType===1&&!isXML){elem.sizcache=doneName;elem.sizset=i;}
if (elem.nodeName===cur){match=elem;break;}
elem=elem[dir];}
checkSet[i]=match;}}}
function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){var sibDir=dir==
"previousSibling"
&&!isXML;for (var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if (elem){if (sibDir&&elem.nodeType===1){elem.sizcache=doneName;elem.sizset=i;}
elem=elem[dir];var match=false;while (elem){if (elem.sizcache===doneName){match=checkSet[elem.sizset];break;}
if (elem.nodeType===1){if (!isXML){elem.sizcache=doneName;elem.sizset=i;}
if (typeof cur !==
"string"
){if (elem===cur){match=true;break;}} else if (Sizzle.filter(cur,[elem]).length>0){match=elem;break;}}
elem=elem[dir];}
checkSet[i]=match;}}}
var contains=document.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)&16;}:function(a,b){return a !==b&&(a.contains?a.contains(b):true);};var isXML=function(elem){return elem.nodeType===9&&elem.documentElement.nodeName !==
"HTML"
||!!elem.ownerDocument&&isXML(elem.ownerDocument);};var posProcess=function(selector,context){var tmpSet=[],later=
""
,match,root=context.nodeType?[context]:context;
while ((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,
""
);}
selector=Expr.relative[selector]?selector+
"*"
:selector;for (var i=0,l=root.length;i<l;i++){Sizzle(selector,root[i],tmpSet);}
return Sizzle.filter(later,tmpSet);};
jQuery.find=Sizzle;jQuery.filter=Sizzle.filter;jQuery.expr=Sizzle.selectors;jQuery.expr[
":"
]=jQuery.expr.filters;Sizzle.selectors.filters.hidden=function(elem){return elem.offsetWidth===0||elem.offsetHeight===0;};Sizzle.selectors.filters.visible=function(elem){return elem.offsetWidth>0||elem.offsetHeight>0;};Sizzle.selectors.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;};jQuery.multiFilter=function(expr,elems,not){if (not){expr=
":not("
+expr+
")"
;}
return Sizzle.matches(expr,elems);};jQuery.dir=function(elem,dir){var matched=[],cur=elem[dir];while (cur&&cur !=document){if (cur.nodeType==1)
matched.push(cur);cur=cur[dir];}
return matched;};jQuery.nth=function(cur,result,dir,elem){result=result||1;var num=0;for (;cur;cur=cur[dir])
if (cur.nodeType==1&&++num==result)
break;return cur;};jQuery.sibling=function(n,elem){var r=[];for (;n;n=n.nextSibling){if (n.nodeType==1&&n !=elem)
r.push(n);}
return r;};return;window.Sizzle=Sizzle;})();
jQuery.event={
add:function(elem,types,handler,data){if (elem.nodeType==3||elem.nodeType==8)
return;
if (elem.setInterval&&elem !=window)
elem=window;
if (!handler.guid)
handler.guid=this.guid++;
if (data !==undefined){
var fn=handler;
handler=this.proxy(fn);
handler.data=data;}
var events=jQuery.data(elem,
"events"
)||jQuery.data(elem,
"events"
,{}),handle=jQuery.data(elem,
"handle"
)||jQuery.data(elem,
"handle"
,function(){
return typeof jQuery !==
"undefined"
&&!jQuery.event.triggered?jQuery.event.handle.apply(arguments.callee.elem,arguments):undefined;});
handle.elem=elem;
jQuery.each(types.split(
/\s+/),function(index,type){
var namespaces=type.split(
"."
);type=namespaces.shift();handler.type=namespaces.slice().sort().join(
"."
);
var handlers=events[type];if (jQuery.event.specialAll[type])
jQuery.event.specialAll[type].setup.call(elem,data,namespaces);
if (!handlers){handlers=events[type]={};
if (!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem,data,namespaces)===false){
if (elem.addEventListener)
elem.addEventListener(type,handle,false);else if (elem.attachEvent)
elem.attachEvent(
"on"
+type,handle);}}
handlers[handler.guid]=handler;
jQuery.event.global[type]=true;});
elem=null;},guid:1,global:{},
remove:function(elem,types,handler){
if (elem.nodeType==3||elem.nodeType==8)
return;var events=jQuery.data(elem,
"events"
),ret,index;if (events){
if (types===undefined||(typeof types===
"string"
&&types.charAt(0)==
"."
))
for (var type in events)
this.remove(elem,type+(types||
""
));else {
if (types.type){handler=types.handler;types=types.type;}
jQuery.each(types.split(
/\s+/),function(index,type){
var namespaces=type.split(
"."
);type=namespaces.shift();var namespace=RegExp(
"(^|\\.)"
+namespaces.slice().sort().join(
".*\\."
)+
"(\\.|$)"
);if (events[type]){
if (handler)
delete events[type][handler.guid];
else
for (var handle in events[type])
if (namespace.test(events[type][handle].type))
delete events[type][handle];if (jQuery.event.specialAll[type])
jQuery.event.specialAll[type].teardown.call(elem,namespaces);
for (ret in events[type]) break;if (!ret){if (!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem,namespaces)===false){if (elem.removeEventListener)
elem.removeEventListener(type,jQuery.data(elem,
"handle"
),false);else if (elem.detachEvent)
elem.detachEvent(
"on"
+type,jQuery.data(elem,
"handle"
));}
ret=null;delete events[type];}}});}
for (ret in events) break;if (!ret){var handle=jQuery.data(elem,
"handle"
);if (handle) handle.elem=null;jQuery.removeData(elem,
"events"
);jQuery.removeData(elem,
"handle"
);}}},
trigger:function(event,data,elem,bubbling){
var type=event.type||event;if(!bubbling){event=typeof event===
"object"
?
event[expando]?event:
jQuery.extend(jQuery.Event(type),event):
jQuery.Event(type);if (type.indexOf(
"!"
)>=0){event.type=type=type.slice(0,-1);event.exclusive=true;}
if (!elem){
event.stopPropagation();
if (this.global[type])
jQuery.each(jQuery.cache,function(){if (this.events&&this.events[type])
jQuery.event.trigger(event,data,this.handle.elem);});}
if (!elem||elem.nodeType==3||elem.nodeType==8)
return undefined;
event.result=undefined;event.target=elem;
data=jQuery.makeArray(data);data.unshift(event);}
event.currentTarget=elem;
var handle=jQuery.data(elem,
"handle"
);if (handle)
handle.apply(elem,data);
if ((!elem[type]||(jQuery.nodeName(elem,
'a'
)&&type==
"click"
))&&elem[
"on"
+type]&&elem[
"on"
+type].apply(elem,data)===false)
event.result=false;
if (!bubbling&&elem[type]&&!event.isDefaultPrevented()&&!(jQuery.nodeName(elem,
'a'
)&&type==
"click"
)){this.triggered=true;try {elem[ type ]();
} catch (e){}}
this.triggered=false;if (!event.isPropagationStopped()){var parent=elem.parentNode||elem.ownerDocument;if (parent)
jQuery.event.trigger(event,data,parent,true);}},handle:function(event){
var all,handlers;event=arguments[0]=jQuery.event.fix(event||window.event);event.currentTarget=this;
var namespaces=event.type.split(
"."
);event.type=namespaces.shift();
all=!namespaces.length&&!event.exclusive;var namespace=RegExp(
"(^|\\.)"
+namespaces.slice().sort().join(
".*\\."
)+
"(\\.|$)"
);handlers=(jQuery.data(this,
"events"
)||{})[event.type];for (var j in handlers){var handler=handlers[j];
if (all||namespace.test(handler.type)){
event.handler=handler;event.data=handler.data;var ret=handler.apply(this,arguments);if(ret !==undefined){event.result=ret;if (ret===false){event.preventDefault();event.stopPropagation();}}
if(event.isImmediatePropagationStopped())
break;}}},props:
"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which"
.split(
" "
),fix:function(event){if (event[expando])
return event;
var originalEvent=event;event=jQuery.Event(originalEvent);for (var i=this.props.length,prop;i;){prop=this.props[--i ];event[ prop ]=originalEvent[ prop ];}
if (!event.target)
event.target=event.srcElement||document;
if (event.target.nodeType==3)
event.target=event.target.parentNode;
if (!event.relatedTarget&&event.fromElement)
event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement;
if (event.pageX==null&&event.clientX !=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0);}
if (!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode))
event.which=event.charCode||event.keyCode;
if (!event.metaKey&&event.ctrlKey)
event.metaKey=event.ctrlKey;
if (!event.which&&event.button)
event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));return event;},proxy:function(fn,proxy){proxy=proxy||function(){return fn.apply(this,arguments);};
proxy.guid=fn.guid=fn.guid||proxy.guid||this.guid++;
return proxy;},special:{ready:{
setup:bindReady,teardown:function(){}}},specialAll:{live:{setup:function(selector,namespaces){jQuery.event.add(this,namespaces[0],liveHandler);},teardown:function(namespaces){if (namespaces.length){var remove=0,name=RegExp(
"(^|\\.)"
+namespaces[0]+
"(\\.|$)"
);jQuery.each((jQuery.data(this,
"events"
).live||{}),function(){if (name.test(this.type))
remove++;});if (remove<1)
jQuery.event.remove(this,namespaces[0],liveHandler);}}}}};jQuery.Event=function(src){
if(!this.preventDefault)
return new jQuery.Event(src);
if(src&&src.type){this.originalEvent=src;this.type=src.type;
}else
this.type=src;
this.timeStamp=now();
this[expando]=true;};function returnFalse(){return false;}
function returnTrue(){return true;}
jQuery.Event.prototype={preventDefault:function(){this.isDefaultPrevented=returnTrue;var e=this.originalEvent;if(!e)
return;
if (e.preventDefault)
e.preventDefault();
e.returnValue=false;},stopPropagation:function(){this.isPropagationStopped=returnTrue;var e=this.originalEvent;if(!e)
return;
if (e.stopPropagation)
e.stopPropagation();
e.cancelBubble=true;},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;this.stopPropagation();},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};
var withinElement=function(event){
var parent=event.relatedTarget;
while (parent&&parent !=this)
try {parent=parent.parentNode;}
catch(e){parent=this;}
if(parent !=this){
event.type=event.data;
jQuery.event.handle.apply(this,arguments);}};jQuery.each({mouseover:
'mouseenter'
,mouseout:
'mouseleave'
},function(orig,fix){jQuery.event.special[ fix ]={setup:function(){jQuery.event.add(this,orig,withinElement,fix);},teardown:function(){jQuery.event.remove(this,orig,withinElement);}};});jQuery.fn.extend({bind:function(type,data,fn){return type==
"unload"
?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data);});},one:function(type,data,fn){var one=jQuery.event.proxy(fn||data,function(event){jQuery(this).unbind(event,one);return (fn||data).apply(this,arguments);});return this.each(function(){jQuery.event.add(this,type,one,fn&&data);});},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn);});},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function(type,data){if(this[0]){var event=jQuery.Event(type);event.preventDefault();event.stopPropagation();jQuery.event.trigger(event,data,this[0]);return event.result;}},toggle:function(fn){
var args=arguments,i=1;
while(i<args.length)
jQuery.event.proxy(fn,args[i++]);return this.click(jQuery.event.proxy(fn,function(event){
this.lastToggle=(this.lastToggle||0)%i;
event.preventDefault();
return args[ this.lastToggle++].apply(this,arguments)||false;}));},hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut);},ready:function(fn){
bindReady();
if (jQuery.isReady)
fn.call(document,jQuery);
else
jQuery.readyList.push(fn);return this;},live:function(type,fn){var proxy=jQuery.event.proxy(fn);proxy.guid+=this.selector+type;jQuery(document).bind(liveConvert(type,this.selector),this.selector,proxy);return this;},die:function(type,fn){jQuery(document).unbind(liveConvert(type,this.selector),fn?{guid:fn.guid+this.selector+type}:null);return this;}});function liveHandler(event){var check=RegExp(
"(^|\\.)"
+event.type+
"(\\.|$)"
),stop=true,elems=[];jQuery.each(jQuery.data(this,
"events"
).live||[],function(i,fn){if (check.test(fn.type)){var elem=jQuery(event.target).closest(fn.data)[0];if (elem)
elems.push({elem:elem,fn:fn});}});elems.sort(function(a,b){return jQuery.data(a.elem,
"closest"
)-jQuery.data(b.elem,
"closest"
);});jQuery.each(elems,function(){if (this.fn.call(this.elem,event,this.fn.data)===false)
return (stop=false);});return stop;}
function liveConvert(type,selector){return [
"live"
,type,selector.replace(
/\./g,
"`"
).replace(
/ /g,
"|"
)].join(
"."
);}
jQuery.extend({isReady:false,readyList:[],
ready:function(){
if (!jQuery.isReady){
jQuery.isReady=true;
if (jQuery.readyList){
jQuery.each(jQuery.readyList,function(){this.call(document,jQuery);});
jQuery.readyList=null;}
jQuery(document).triggerHandler(
"ready"
);}}});var readyBound=false;function bindReady(){if (readyBound) return;readyBound=true;
if (document.addEventListener){
document.addEventListener(
"DOMContentLoaded"
,function(){document.removeEventListener(
"DOMContentLoaded"
,arguments.callee,false);jQuery.ready();},false);
} else if (document.attachEvent){
document.attachEvent(
"onreadystatechange"
,function(){if (document.readyState===
"complete"
){document.detachEvent(
"onreadystatechange"
,arguments.callee);jQuery.ready();}});
if (document.documentElement.doScroll&&window==window.top) (function(){if (jQuery.isReady) return;try {
document.documentElement.doScroll(
"left"
);} catch(error){setTimeout(arguments.callee,0);return;}
jQuery.ready();})();}
jQuery.event.add(window,
"load"
,jQuery.ready);}
jQuery.each((
"blur,focus,load,resize,scroll,unload,click,dblclick,"
+
"mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,"
+
"change,select,submit,keydown,keypress,keyup,error"
).split(
","
),function(i,name){
jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name);};});
jQuery(window).bind(
'unload'
,function(){for (var id in jQuery.cache)
if (id !=1&&jQuery.cache[ id ].handle)
jQuery.event.remove(jQuery.cache[ id ].handle.elem);});(function(){jQuery.support={};var root=document.documentElement,script=document.createElement(
"script"
),div=document.createElement(
"div"
),id=
"script"
+(new Date).getTime();div.style.display=
"none"
;div.innerHTML=
'   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>'
;var all=div.getElementsByTagName(
"*"
),a=div.getElementsByTagName(
"a"
)[0];
if (!all||!all.length||!a){return;}
jQuery.support={
leadingWhitespace:div.firstChild.nodeType==3,
tbody:!div.getElementsByTagName(
"tbody"
).length,
objectAll:!!div.getElementsByTagName(
"object"
)[0]
.getElementsByTagName(
"*"
).length,
htmlSerialize:!!div.getElementsByTagName(
"link"
).length,
style:
/red/.test(a.getAttribute(
"style"
)),
hrefNormalized:a.getAttribute(
"href"
)===
"/a"
,
opacity:a.style.opacity===
"0.5"
,
cssFloat:!!a.style.cssFloat,
scriptEval:false,noCloneEvent:true,boxModel:null};script.type=
"text/javascript"
;try {script.appendChild(document.createTextNode(
"window."
+id+
"=1;"
));} catch(e){}
root.insertBefore(script,root.firstChild);
if (window[ id ]){jQuery.support.scriptEval=true;delete window[ id ];}
root.removeChild(script);if (div.attachEvent&&div.fireEvent){div.attachEvent(
"onclick"
,function(){
jQuery.support.noCloneEvent=false;div.detachEvent(
"onclick"
,arguments.callee);});div.cloneNode(true).fireEvent(
"onclick"
);}
jQuery(function(){var div=document.createElement(
"div"
);div.style.width=div.style.paddingLeft=
"1px"
;document.body.appendChild(div);jQuery.boxModel=jQuery.support.boxModel=div.offsetWidth===2;document.body.removeChild(div).style.display=
'none'
;});})();var styleFloat=jQuery.support.cssFloat?
"cssFloat"
:
"styleFloat"
;jQuery.props={
"for"
:
"htmlFor"
,
"class"
:
"className"
,
"float"
:styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,readonly:
"readOnly"
,maxlength:
"maxLength"
,cellspacing:
"cellSpacing"
,rowspan:
"rowSpan"
,tabindex:
"tabIndex"
};jQuery.fn.extend({
_load:jQuery.fn.load,load:function(url,params,callback){if (typeof url !==
"string"
)
return this._load(url);var off=url.indexOf(
" "
);if (off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}
var type=
"GET"
;
if (params)
if (jQuery.isFunction(params)){
callback=params;params=null;
} else if(typeof params===
"object"
){params=jQuery.param(params);type=
"POST"
;}
var self=this;
jQuery.ajax({url:url,type:type,dataType:
"html"
,data:params,complete:function(res,status){
if (status==
"success"
||status==
"notmodified"
)
self.html(selector?
jQuery(
"<div/>"
)
.append(res.responseText.replace(
/<script(.|\s)*?\/script>/g,
""
))
.find(selector):
res.responseText);if(callback)
self.each(callback,[res.responseText,status,res]);}});return this;},serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return this.elements?jQuery.makeArray(this.elements):this;})
.filter(function(){return this.name&&!this.disabled&&(this.checked||
/select|textarea/i.test(this.nodeName)||
/text|hidden|password|search/i.test(this.type));})
.map(function(i,elem){var val=jQuery(this).val();return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val,i){return {name:elem.name,value:val};}):{name:elem.name,value:val};}).get();}});
jQuery.each(
"ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend"
.split(
","
),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});var jsc=now();jQuery.extend({get:function(url,data,callback,type){
if (jQuery.isFunction(data)){callback=data;data=null;}
return jQuery.ajax({type:
"GET"
,url:url,data:data,success:callback,dataType:type});},getScript:function(url,callback){return jQuery.get(url,null,callback,
"script"
);},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,
"json"
);},post:function(url,data,callback,type){if (jQuery.isFunction(data)){callback=data;data={};}
return jQuery.ajax({type:
"POST"
,url:url,data:data,success:callback,dataType:type});},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings);},ajaxSettings:{url:location.href,global:true,type:
"GET"
,contentType:
"application/x-www-form-urlencoded"
,processData:true,async:true,
xhr:function(){return window.ActiveXObject?new ActiveXObject(
"Microsoft.XMLHTTP"
):new XMLHttpRequest();},accepts:{xml:
"application/xml, text/xml"
,html:
"text/html"
,script:
"text/javascript, application/javascript"
,json:
"application/json, text/javascript"
,text:
"text/plain"
,_default:
"*/*"
}},
lastModified:{},ajax:function(s){
s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));var jsonp,jsre=
/=\?(&|$)/g,status,data,type=s.type.toUpperCase();
if (s.data&&s.processData&&typeof s.data !==
"string"
)
s.data=jQuery.param(s.data);
if (s.dataType==
"jsonp"
){if (type==
"GET"
){if (!s.url.match(jsre))
s.url+=(s.url.match(
/\?/)?
"&"
:
"?"
)+(s.jsonp||
"callback"
)+
"=?"
;} else if (!s.data||!s.data.match(jsre))
s.data=(s.data?s.data+
"&"
:
""
)+(s.jsonp||
"callback"
)+
"=?"
;s.dataType=
"json"
;}
if (s.dataType==
"json"
&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp=
"jsonp"
+jsc++;
if (s.data)
s.data=(s.data+
""
).replace(jsre,
"="
+jsonp+
"$1"
);s.url=s.url.replace(jsre,
"="
+jsonp+
"$1"
);
s.dataType=
"script"
;
window[ jsonp ]=function(tmp){data=tmp;success();complete();
window[ jsonp ]=undefined;try{delete window[ jsonp ];} catch(e){}
if (head)
head.removeChild(script);};}
if (s.dataType==
"script"
&&s.cache==null)
s.cache=false;if (s.cache===false&&type==
"GET"
){var ts=now();
var ret=s.url.replace(
/(\?|&)_=.*?(&|$)/,
"$1_="
+ts+
"$2"
);
s.url=ret+((ret==s.url)?(s.url.match(
/\?/)?
"&"
:
"?"
)+
"_="
+ts:
""
);}
if (s.data&&type==
"GET"
){s.url+=(s.url.match(
/\?/)?
"&"
:
"?"
)+s.data;
s.data=null;}
if (s.global&&! jQuery.active++)
jQuery.event.trigger(
"ajaxStart"
);
var parts=
/^(\w+:)?\/\/([^\/?#]+)/.exec(s.url);
if (s.dataType==
"script"
&&type==
"GET"
&&parts&&(parts[1]&&parts[1] !=location.protocol||parts[2] !=location.host)){var head=document.getElementsByTagName(
"head"
)[0];var script=document.createElement(
"script"
);script.src=s.url;if (s.scriptCharset)
script.charset=s.scriptCharset;
if (!jsonp){var done=false;
script.onload=script.onreadystatechange=function(){if (!done&&(!this.readyState||this.readyState==
"loaded"
||this.readyState==
"complete"
)){done=true;success();complete();
script.onload=script.onreadystatechange=null;head.removeChild(script);}};}
head.appendChild(script);
return undefined;}
var requestDone=false;
var xhr=s.xhr();
if(s.username)
xhr.open(type,s.url,s.async,s.username,s.password);else
xhr.open(type,s.url,s.async);
try {
if (s.data)
xhr.setRequestHeader(
"Content-Type"
,s.contentType);
if (s.ifModified)
xhr.setRequestHeader(
"If-Modified-Since"
,jQuery.lastModified[s.url]||
"Thu, 01 Jan 1970 00:00:00 GMT"
);
xhr.setRequestHeader(
"X-Requested-With"
,
"XMLHttpRequest"
);
xhr.setRequestHeader(
"Accept"
,s.dataType&&s.accepts[ s.dataType ]?s.accepts[ s.dataType ]+
", */*"
:s.accepts._default);} catch(e){}
if (s.beforeSend&&s.beforeSend(xhr,s)===false){
if (s.global&&!--jQuery.active)
jQuery.event.trigger(
"ajaxStop"
);
xhr.abort();return false;}
if (s.global)
jQuery.event.trigger(
"ajaxSend"
,[xhr,s]);
var onreadystatechange=function(isTimeout){
if (xhr.readyState==0){if (ival){
clearInterval(ival);ival=null;
if (s.global&&!--jQuery.active)
jQuery.event.trigger(
"ajaxStop"
);}
} else if (!requestDone&&xhr&&(xhr.readyState==4||isTimeout==
"timeout"
)){requestDone=true;
if (ival){clearInterval(ival);ival=null;}
status=isTimeout==
"timeout"
?
"timeout"
:!jQuery.httpSuccess(xhr)?
"error"
:s.ifModified&&jQuery.httpNotModified(xhr,s.url)?
"notmodified"
:
"success"
;if (status==
"success"
){
try {
data=jQuery.httpData(xhr,s.dataType,s);} catch(e){status=
"parsererror"
;}}
if (status==
"success"
){
var modRes;try {modRes=xhr.getResponseHeader(
"Last-Modified"
);} catch(e){}
if (s.ifModified&&modRes)
jQuery.lastModified[s.url]=modRes;
if (!jsonp)
success();} else
jQuery.handleError(s,xhr,status);
complete();if (isTimeout)
xhr.abort();
if (s.async)
xhr=null;}};if (s.async){
var ival=setInterval(onreadystatechange,13);
if (s.timeout>0)
setTimeout(function(){
if (xhr&&!requestDone)
onreadystatechange(
"timeout"
);},s.timeout);}
try {xhr.send(s.data);} catch(e){jQuery.handleError(s,xhr,null,e);}
if (!s.async)
onreadystatechange();function success(){
if (s.success)
s.success(data,status);
if (s.global)
jQuery.event.trigger(
"ajaxSuccess"
,[xhr,s]);}
function complete(){
if (s.complete)
s.complete(xhr,status);
if (s.global)
jQuery.event.trigger(
"ajaxComplete"
,[xhr,s]);
if (s.global&&!--jQuery.active)
jQuery.event.trigger(
"ajaxStop"
);}
return xhr;},handleError:function(s,xhr,status,e){
if (s.error) s.error(xhr,status,e);
if (s.global)
jQuery.event.trigger(
"ajaxError"
,[xhr,s,e]);},
active:0,
httpSuccess:function(xhr){try {
return !xhr.status&&location.protocol==
"file:"
||(xhr.status>=200&&xhr.status<300)||xhr.status==304||xhr.status==1223;} catch(e){}
return false;},
httpNotModified:function(xhr,url){try {var xhrRes=xhr.getResponseHeader(
"Last-Modified"
);
return xhr.status==304||xhrRes==jQuery.lastModified[url];} catch(e){}
return false;},httpData:function(xhr,type,s){var ct=xhr.getResponseHeader(
"content-type"
),xml=type==
"xml"
||!type&&ct&&ct.indexOf(
"xml"
)>=0,data=xml?xhr.responseXML:xhr.responseText;if (xml&&data.documentElement.tagName==
"parsererror"
)
throw
"parsererror"
;
if(s&&s.dataFilter)
data=s.dataFilter(data,type);
if(typeof data===
"string"
){
if (type==
"script"
)
jQuery.globalEval(data);
if (type==
"json"
)
data=window[
"eval"
](
"("
+data+
")"
);}
return data;},
param:function(a){var s=[ ];function add(key,value){s[ s.length ]=encodeURIComponent(key)+
'='
+encodeURIComponent(value);};
if (jQuery.isArray(a)||a.jquery)
jQuery.each(a,function(){add(this.name,this.value);});
else
for (var j in a)
if (jQuery.isArray(a[j]))
jQuery.each(a[j],function(){add(j,this);});else
add(j,jQuery.isFunction(a[j])?a[j]():a[j]);
return s.join(
"&"
).replace(
/%20/g,
"+"
);}});var elemdisplay={},timerId,fxAttrs=[
[
"height"
,
"marginTop"
,
"marginBottom"
,
"paddingTop"
,
"paddingBottom"
],
[
"width"
,
"marginLeft"
,
"marginRight"
,
"paddingLeft"
,
"paddingRight"
],
[
"opacity"
]
];function genFx(type,num){var obj={};jQuery.each(fxAttrs.concat.apply([],fxAttrs.slice(0,num)),function(){obj[ this ]=type;});return obj;}
jQuery.fn.extend({show:function(speed,callback){if (speed){return this.animate(genFx(
"show"
,3),speed,callback);} else {for (var i=0,l=this.length;i<l;i++){var old=jQuery.data(this[i],
"olddisplay"
);this[i].style.display=old||
""
;if (jQuery.css(this[i],
"display"
)===
"none"
){var tagName=this[i].tagName,display;if (elemdisplay[ tagName ]){display=elemdisplay[ tagName ];} else {var elem=jQuery(
"<"
+tagName+
" />"
).appendTo(
"body"
);display=elem.css(
"display"
);if (display===
"none"
)
display=
"block"
;elem.remove();elemdisplay[ tagName ]=display;}
jQuery.data(this[i],
"olddisplay"
,display);}}
for (var i=0,l=this.length;i<l;i++){this[i].style.display=jQuery.data(this[i],
"olddisplay"
)||
""
;}
return this;}},hide:function(speed,callback){if (speed){return this.animate(genFx(
"hide"
,3),speed,callback);} else {for (var i=0,l=this.length;i<l;i++){var old=jQuery.data(this[i],
"olddisplay"
);if (!old&&old !==
"none"
)
jQuery.data(this[i],
"olddisplay"
,jQuery.css(this[i],
"display"
));}
for (var i=0,l=this.length;i<l;i++){this[i].style.display=
"none"
;}
return this;}},
_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){var bool=typeof fn===
"boolean"
;return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn==null||bool?this.each(function(){var state=bool?fn:jQuery(this).is(
":hidden"
);jQuery(this)[ state?
"show"
:
"hide"
]();}):this.animate(genFx(
"toggle"
,3),fn,fn2);},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[ optall.queue===false?
"each"
:
"queue"
](function(){var opt=jQuery.extend({},optall),p,hidden=this.nodeType==1&&jQuery(this).is(
":hidden"
),self=this;for (p in prop){if (prop[p]==
"hide"
&&hidden||prop[p]==
"show"
&&!hidden)
return opt.complete.call(this);if ((p==
"height"
||p==
"width"
)&&this.style){
opt.display=jQuery.css(this,
"display"
);
opt.overflow=this.style.overflow;}}
if (opt.overflow !=null)
this.style.overflow=
"hidden"
;opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if (
/toggle|show|hide/.test(val))
e[ val==
"toggle"
?hidden?
"show"
:
"hide"
:val ](prop);else {var parts=val.toString().match(
/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if (parts){var end=parseFloat(parts[2]),unit=parts[3]||
"px"
;
if (unit !=
"px"
){self.style[ name ]=(end||1)+unit;start=((end||1) / e.cur(true)) * start;self.style[ name ]=start+unit;}
if (parts[1])
end=((parts[1]==
"-="
?-1:1) * end)+start;e.custom(start,end,unit);} else
e.custom(start,val,
""
);}});
return true;});},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if (clearQueue)
this.queue([]);this.each(function(){
for (var i=timers.length-1;i>=0;i--)
if (timers[i].elem==this){if (gotoEnd)
timers[i](true);timers.splice(i,1);}});
if (!gotoEnd)
this.dequeue();return this;}});
jQuery.each({slideDown:genFx(
"show"
,1),slideUp:genFx(
"hide"
,1),slideToggle:genFx(
"toggle"
,1),fadeIn:{opacity:
"show"
},fadeOut:{opacity:
"hide"
}},function(name,props){jQuery.fn[ name ]=function(speed,callback){return this.animate(props,speed,callback);};});jQuery.extend({speed:function(speed,easing,fn){var opt=typeof speed===
"object"
?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};opt.duration=jQuery.fx.off?0:typeof opt.duration===
"number"
?opt.duration:jQuery.fx.speeds[opt.duration]||jQuery.fx.speeds._default;
opt.old=opt.complete;opt.complete=function(){if (opt.queue !==false)
jQuery(this).dequeue();if (jQuery.isFunction(opt.old))
opt.old.call(this);};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff * p;},swing:function(p,n,firstNum,diff){return ((-Math.cos(p*Math.PI)/2)+0.5) * diff+firstNum;}},timers:[],fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if (!options.orig)
options.orig={};}});jQuery.fx.prototype={
update:function(){if (this.options.step)
this.options.step.call(this.elem,this.now,this);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);
if ((this.prop==
"height"
||this.prop==
"width"
)&&this.elem.style)
this.elem.style.display=
"block"
;},
cur:function(force){if (this.elem[this.prop] !=null&&(!this.elem.style||this.elem.style[this.prop]==null))
return this.elem[ this.prop ];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0;},
custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||
"px"
;this.now=this.start;this.pos=this.state=0;var self=this;function t(gotoEnd){return self.step(gotoEnd);}
t.elem=this.elem;if (t()&&jQuery.timers.push(t)&&!timerId){timerId=setInterval(function(){var timers=jQuery.timers;for (var i=0;i<timers.length;i++)
if (!timers[i]())
timers.splice(i--,1);if (!timers.length){clearInterval(timerId);timerId=undefined;}},13);}},
show:function(){
this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;
this.custom(this.prop==
"width"
||this.prop==
"height"
?1:0,this.cur());
jQuery(this.elem).show();},
hide:function(){
this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;
this.custom(this.cur(),0);},
step:function(gotoEnd){var t=now();if (gotoEnd||t>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[ this.prop ]=true;var done=true;for (var i in this.options.curAnim)
if (this.options.curAnim[i] !==true)
done=false;if (done){if (this.options.display !=null){
this.elem.style.overflow=this.options.overflow;
this.elem.style.display=this.options.display;if (jQuery.css(this.elem,
"display"
)==
"none"
)
this.elem.style.display=
"block"
;}
if (this.options.hide)
jQuery(this.elem).hide();
if (this.options.hide||this.options.show)
for (var p in this.options.curAnim)
jQuery.attr(this.elem.style,p,this.options.orig[p]);
this.options.complete.call(this.elem);}
return false;} else {var n=t-this.startTime;this.state=n / this.options.duration;
this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?
"swing"
:
"linear"
)](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start) * this.pos);
this.update();}
return true;}};jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,
_default:400},step:{opacity:function(fx){jQuery.attr(fx.elem.style,
"opacity"
,fx.now);},_default:function(fx){if (fx.elem.style&&fx.elem.style[ fx.prop ] !=null)
fx.elem.style[ fx.prop ]=fx.now+fx.unit;else
fx.elem[ fx.prop ]=fx.now;}}});if (document.documentElement[
"getBoundingClientRect"
])
jQuery.fn.offset=function(){if (!this[0]) return {top:0,left:0};if (this[0]===this[0].ownerDocument.body) return jQuery.offset.bodyOffset(this[0]);var box=this[0].getBoundingClientRect(),doc=this[0].ownerDocument,body=doc.body,docElem=doc.documentElement,clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,top=box.top+(self.pageYOffset||jQuery.boxModel&&docElem.scrollTop||body.scrollTop)-clientTop,left=box.left+(self.pageXOffset||jQuery.boxModel&&docElem.scrollLeft||body.scrollLeft)-clientLeft;return {top:top,left:left};};else
 jQuery.fn.offset=function(){if (!this[0]) return {top:0,left:0};if (this[0]===this[0].ownerDocument.body) return jQuery.offset.bodyOffset(this[0]);jQuery.offset.initialized||jQuery.offset.initialize();var elem=this[0],offsetParent=elem.offsetParent,prevOffsetParent=elem,doc=elem.ownerDocument,computedStyle,docElem=doc.documentElement,body=doc.body,defaultView=doc.defaultView,prevComputedStyle=defaultView.getComputedStyle(elem,null),top=elem.offsetTop,left=elem.offsetLeft;while ((elem=elem.parentNode)&&elem !==body&&elem !==docElem){computedStyle=defaultView.getComputedStyle(elem,null);top-=elem.scrollTop,left-=elem.scrollLeft;if (elem===offsetParent){top+=elem.offsetTop,left+=elem.offsetLeft;if (jQuery.offset.doesNotAddBorder&&!(jQuery.offset.doesAddBorderForTableAndCells&&
/^t(able|d|h)$/i.test(elem.tagName)))
top+=parseInt(computedStyle.borderTopWidth,10)||0,left+=parseInt(computedStyle.borderLeftWidth,10)||0;prevOffsetParent=offsetParent,offsetParent=elem.offsetParent;}
if (jQuery.offset.subtractsBorderForOverflowNotVisible&&computedStyle.overflow !==
"visible"
)
top+=parseInt(computedStyle.borderTopWidth,10)||0,left+=parseInt(computedStyle.borderLeftWidth,10)||0;prevComputedStyle=computedStyle;}
if (prevComputedStyle.position===
"relative"
||prevComputedStyle.position===
"static"
)
top+=body.offsetTop,left+=body.offsetLeft;if (prevComputedStyle.position===
"fixed"
)
top+=Math.max(docElem.scrollTop,body.scrollTop),left+=Math.max(docElem.scrollLeft,body.scrollLeft);return {top:top,left:left};};jQuery.offset={initialize:function(){if (this.initialized) return;var body=document.body,container=document.createElement(
'div'
),innerDiv,checkDiv,table,td,rules,prop,bodyMarginTop=body.style.marginTop,html=
'<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>'
;rules={position:
'absolute'
,top:0,left:0,margin:0,border:0,width:
'1px'
,height:
'1px'
,visibility:
'hidden'
};for (prop in rules) container.style[prop]=rules[prop];container.innerHTML=html;body.insertBefore(container,body.firstChild);innerDiv=container.firstChild,checkDiv=innerDiv.firstChild,td=innerDiv.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(checkDiv.offsetTop !==5);this.doesAddBorderForTableAndCells=(td.offsetTop===5);innerDiv.style.overflow=
'hidden'
,innerDiv.style.position=
'relative'
;this.subtractsBorderForOverflowNotVisible=(checkDiv.offsetTop===-5);body.style.marginTop=
'1px'
;this.doesNotIncludeMarginInBodyOffset=(body.offsetTop===0);body.style.marginTop=bodyMarginTop;body.removeChild(container);this.initialized=true;},bodyOffset:function(body){jQuery.offset.initialized||jQuery.offset.initialize();var top=body.offsetTop,left=body.offsetLeft;if (jQuery.offset.doesNotIncludeMarginInBodyOffset)
top+=parseInt(jQuery.curCSS(body,
'marginTop'
,true),10)||0,left+=parseInt(jQuery.curCSS(body,
'marginLeft'
,true),10)||0;return {top:top,left:left};}};jQuery.fn.extend({position:function(){var left=0,top=0,results;if (this[0]){
var offsetParent=this.offsetParent(),
offset=this.offset(),parentOffset=
/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();
offset.top-=num(this,
'marginTop'
);offset.left-=num(this,
'marginLeft'
);
parentOffset.top+=num(offsetParent,
'borderTopWidth'
);parentOffset.left+=num(offsetParent,
'borderLeftWidth'
);
results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}
return results;},offsetParent:function(){var offsetParent=this[0].offsetParent||document.body;while (offsetParent&&(!
/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,
'position'
)==
'static'
))
offsetParent=offsetParent.offsetParent;return jQuery(offsetParent);}});
jQuery.each([
'Left'
,
'Top'
],function(i,name){var method=
'scroll'
+name;jQuery.fn[ method ]=function(val){if (!this[0]) return null;return val !==undefined?
this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[ method ]=val;}):
this[0]==window||this[0]==document?self[ i?
'pageYOffset'
:
'pageXOffset'
]||jQuery.boxModel&&document.documentElement[ method ]||document.body[ method ]:this[0][ method ];};});
jQuery.each([
"Height"
,
"Width"
],function(i,name){var tl=i?
"Left"
:
"Top"
,
br=i?
"Right"
:
"Bottom"
,
lower=name.toLowerCase();
jQuery.fn[
"inner"
+name]=function(){return this[0]?jQuery.css(this[0],lower,false,
"padding"
):null;};
jQuery.fn[
"outer"
+name]=function(margin){return this[0]?jQuery.css(this[0],lower,false,margin?
"margin"
:
"border"
):null;};var type=name.toLowerCase();jQuery.fn[ type ]=function(size){
return this[0]==window?
document.compatMode==
"CSS1Compat"
&&document.documentElement[
"client"
+name ]||document.body[
"client"
+name ]:
this[0]==document?
Math.max(document.documentElement[
"client"
+name],document.body[
"scroll"
+name],document.documentElement[
"scroll"
+name],document.body[
"offset"
+name],document.documentElement[
"offset"
+name]):
size===undefined?
(this.length?jQuery.css(this[0],type):null):
this.css(type,typeof size===
"string"
?size:size+
"px"
);};});})();----------google.load(
'search'
,
'1'
,{nocss:1});function OnLoad(){
var searchControl=new google.search.SearchControl();
var draw_options=new google.search.DrawOptions();draw_options.setSearchFormRoot(document.getElementById(
"search_form"
));
var webSearch=new google.search.WebSearch();webSearch.setSiteRestriction(
'h3rald.com'
);var search_options=new google.search.SearcherOptions();search_options.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);searchControl.addSearcher(webSearch,search_options);searchControl.setResultSetSize(google.search.Search.LARGE_RESULTSET);searchControl.draw(document.getElementById(
"search_results"
),draw_options);}
google.setOnLoadCallback(OnLoad);----------$(function(){$(
'#gallery a'
).lightBox();});function delicious_counter(data){var posts=data[0].total_posts;if (!posts) return;var text=posts+
" bookmarks"
;if (posts==1){text=posts+
" bookmark"
};$(
'#delcounter'
).text(text);}
$(document).ready(function(){$(
'.timeago'
).timeago();
$(
'.content-body p'
).each(function(){var first_paragraph=$(
'.content-body p:first'
);first_paragraph.addClass(
'first-p'
);if (!first_paragraph) return false;var t=first_paragraph.html();var first_letter=t.substr(0,1);if (first_letter.match(
/[a-z]/i)){first_paragraph.html(t.slice(1,t.length));$(
'<span></span>'
).addClass(
'dropcap'
).html(first_letter).prependTo(first_paragraph);}});});
