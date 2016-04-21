 function $(element) {
     return document.querySelector(element);
 }
 
 function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

 
 var tagList = [];//存tag数组
 var oldTag = [];
 var textList = [];//存hobby数组
 
 function getValue(){
	 var value = $("#tag").value;//返回input
	 return value;	
 }
 function splitText(){
	 var textArray = $("#text").value.trim().split(/[,，;；、。.\s\n]+/); //分割字符串
	 return textArray;	
 }

$("#tag").onkeydown = function(e){
	var keynum;
	var keychar;
	if(window.event){
		keynum = e.keyCode;
	}
	else if(e.which){
		keynum = e.which;
	}
	//keychar = String.fromCharCode(keynum);
	//numcheck = /[0-9]/;
	//numcheck = /188/gmi;
	//alert(keynum);
	//alert(numcheck.source);
	if(getValue().length  < 1)return;
	if(tagList.length  >= 10){
		tagList.shift();
	}
	if(/188$/g.test(keynum) || /32$/g.test(keynum) || /13$/g.test(keynum) || /190$/g.test(keynum) || /186$/g.test(keynum)){
		for(var list in tagList){
			 if(getValue().replace(/[,.，。、\s\n]+$/,"") == tagList[list]){
				$("#tag").value = "" ;
				return;
			 }
		}
		
		tagList.push(getValue().replace(/[,.，。、\s\n]+$/,""));

		render("tag");
		$("#tag").value = "" ;
	}
	
}


addEventHandler($("#check"),'click',function(e){
	textList = splitText();
	render("text");
	$("#text").value = "";
});


function render(s){
	
	if(s == "tag"){
		var queue = tagList.map(function(n){
			if(n != "" &&n != null)
				return "<div class='tag'>" + n + "</div>" //注意单双引号的引用
		}).join("");
		$("#queue1").innerHTML = queue;
	}
	else if(s == "text"){
		var queue = textList.map(function(n){
			if(n != "" &&n != null)
				return "<div class='hobby'>" + n + "</div>" //注意单双引号的引用
		}).join("");
		$("#queue2").innerHTML = queue;

		}
}


 addEventHandler($("#queue1"),'mouseover',function(e){
     var node = e.target;
     if (node && node.className.toLowerCase() === "tag") {
         var index = [].indexOf.call(node.parentNode.childNodes, node);//返回鼠标覆盖的tag序号
		oldTag[index] = tagList[index];
		tagList[index] = tagList[index].replace(new RegExp(tagList[index],"g"),"<div class='del-tag'>点击删除" + tagList[index] + "</div>");
		 render("tag");
     }
 });
 
 

addEventHandler($("#queue1"),'mouseout',function(e){
	for(var list in tagList){
			 if(/del-tag/.test(tagList[list])){
				tagList[list] = oldTag[list];
			 }
	}
	 render("tag");
 });


 addEventHandler($("#queue1"),'click',function(e){
     var node = e.target;
     if (node && node.className.toLowerCase() === "del-tag") {
         var index = [].indexOf.call(node.parentNode.parentNode.childNodes, node.parentNode);//返回点中的tag序号
		 tagList.splice(index, 1);
         node.parentNode.parentNode.removeChild(node.parentNode);
     }
 });

 function init(){
	 
 }
 
 init();