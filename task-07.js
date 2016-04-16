/*function start(){
	var input = document.getElementsByName("in");
	var leftIn = document.getElementById("left-in");
	var leftOut = document.getElementById("left-out");
	var rightIn = document.getElementById("right-in");
	var rightOut = document.getElementById("right-out");	
	var queue = document.getElementById("queue");
	var spans = document.getElementsByName("span");
	var queueList = "";
	queue.innerHTML = "";

	leftIn.onclick = function(){
		if(!input[0].value.match(/^\d+$/) || Number(input[0].value) < 10 || Number(input[0].value) > 100){
			alert("请输入10-100的数字");
			return;
		}	
			queueList = "<span name=span >" +  input[0].value + "</span>" + queueList;
			queue.innerHTML = queueList;
			for(var i=0;i<=queue.childNodes.length;i++){
				!function(n){
					queue.childNodes[n].addEventListener('click',function(){
						queue.removeChild(queue.childNodes[n]);
						queueList = queue.innerHTML;
					});
				}(i);
			}
			queue.innerHTML = queueList;
	}	
	leftOut.onclick = function(){

		queue.removeChild(queue.firstChild);
		queueList = queue.innerHTML;
	}	
	rightIn.onclick = function(){
		if(!input[0].value.match(/^\d+$/)){
			alert("请输入数字");
			return;
		}
		queueList = queueList + "<span name=span >" +  input[0].value + "</span>";
		queue.innerHTML = queueList;
		for(var i=0;i<=queue.childNodes.length;i++){
				!function(n){
					queue.childNodes[n].addEventListener('click',function(){
						queue.removeChild(queue.childNodes[n]);
						queueList = queue.innerHTML;
					});
				}(i);
			}
		queue.innerHTML = queueList;

	}	
	rightOut.onclick = function(){
		queue.removeChild(queue.lastChild);
		queueList = queue.innerHTML;

	}	
		leftIn.mouseover = function (){
			for(var i=0;i<=queue.childNodes.length;i++){
				!function(n){
					queue.childNodes[n].addEventListener('click',function(){
						queue.removeChild(queue.childNodes[n]);
						queueList = queue.innerHTML;
					});
				}(i);
			}
		}	
}

start();
*/
//简化选择器
 function $(element) {
     return document.querySelector(element);
 }
 
 var queueList = [];
 var newList = [];
 
  $("#queue").addEventListener("click", function(e) {
     var node = e.target;
     if (node && node.className.toLowerCase() === "bar") {
         var index = [].indexOf.call(node.parentNode.childNodes, node);//返回点中的bar序号
         queueList.splice(index, 1);
         node.parentNode.removeChild(node);
     }
 });
  
 function getValue(){
	 var value = $("#in").value.trim();
	 if (isNaN(parseFloat(value))){
		 alert("请输入一个数字");
		 return;
	 }
	 value = parseInt(value); 
	 if (value < 10 || value > 100){
		 alert("超出输入范围");
		 return;
	 }
	 return value;	
 }
//没有抛出异常，导致返回getValue返回了一个值
$("#left-in").onclick = function(){
		 if(queueList.length > 60){
			 alert("超过添加范围");
			 return;
		 }
		 queueList.unshift(getValue());
		 render();
}
$("#right-in").onclick = function(){
		if(queueList.length > 60){		
			alert("超过添加范围");
			return;
		}	
		 queueList.push(getValue());
		 render();
}
$("#left-out").onclick = function(){
		 queueList.shift();
		 render();
}
$("#right-out").onclick = function(){
		 queueList.pop();
		 render();
}
$("#sort").onclick = function(){
	if(queueList.length < 1)
		return;
	queueList.bubbleSort();
	time = setInterval(start,"100");
	function start(){
		var newarr = newList.shift() || [];
		if (newarr.length != 0)
		render(newarr);
		else{
			clearInterval(time);
			return;
		}
			
	}
}
 function bubbleSort(arr){
	if(arr.length < 1)return;
	var temp;
	for (var i = 0;i < arr.length;i++){
		for (var j = 0;j < arr.length - i - 1;j++){
			if(arr[j] > arr[j+1]){
				temp = arr[j+1];
				arr[j+1] = arr[j];
				arr[j] = temp;
				console.log(JSON.parse(JSON.stringify(arr)));
				newList.push(JSON.parse(JSON.stringify(arr)));
			}
		}
	}
	alert(arr);
	//newList = JSON.parse(JSON.stringify(arr));//将数组转换为没有[]的部分
	return arr;
 }
 
/* [].bubbleSort(){
	return bubbleSort(this);
} 错误写法*/

Array.prototype.bubbleSort = function(){
	return bubbleSort(this);
}

function render(arr){
	array = arr || queueList;
	var queue = array.map(function(n){
		return "<div class='bar' style='height:" + n*2 + "px;background-color:" + getBackColor(n) + "'></div>" //注意单双引号的引用
}).join("");
	$("#queue").innerHTML = queue;
	
}

function getBackColor(n){
		var colorGroup = ["#aaa","#bbb","#ccc","#ddd","#eee","#abc","#abe","#abb","#bab","#cbc","#bcb","#C0C0C0"]; 
		var random = Math.round(Math.random() * 11);
		if(n < 30)
			return colorGroup[0];	
		else if(n > 30 && n < 60)
			return colorGroup[4];	
		else if(n > 60 && n < 90)
			return colorGroup[7];	
		else if(n > 90)	
			return colorGroup[10];				
}

 function init(){
	
 }
 
 init();