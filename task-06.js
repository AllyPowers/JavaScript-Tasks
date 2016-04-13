function start(){
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
		if(!input[0].value.match(/^\d+$/)){
			alert("请输入数字");
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