// JavaScript Document
function removeTag(text) {
	text = text.replace(/\<b\>/ig," ");
	text = text.replace(/\<\/b\>/ig," ");	
	text = text.replace(/\<br\>/ig," ");
	text = text.replace(/\<br \/\>/ig," ");	
	text = text.replace(/\&\#\d{3,5}\;/ig," ");
	text = text.replace(/!/ig," ");
	text = text.replace(/\'/ig," ");	
	text = text.replace(/\"/ig," ");
	text = text.replace(/\\/ig," ");	
	text = text.toLowerCase();
	return text;
}

function linkCode(obj, customName) {
	var s=s_gi('sisprod');
	s.tl(obj,'o',customName);
	s_objectID=customName;
}

function linkNaming(obj) {
	s_objectID=obj;
}
