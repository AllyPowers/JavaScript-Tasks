/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var sCity = document.getElementById("aqi-city-input").value.trim();
	var sAqi = document.getElementById("aqi-value-input").value.trim();
	if(!sCity.match(/^[a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D]+$/)){
		alert("请输入英文字母或者中文。");
		return 0;
	}
	else if(!sAqi.match(/^\d+$/)){
		alert("请输入整数。");
		return 0;
	}
/* 	aqiData.sCity;
	aqiData[0][1]=sAqi; */
	aqiData[sCity] = sAqi;

	/*if (!strCity.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
		alert("城市名必须为中英文字符！");
		return;
	}
	if (!strAqi.match(/^\d+$/)) {
		alert("空气质量指数必须为整数！");
		return;
	}*/

	/* aqiData[strCity] = strAqi; */
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	
	var table = document.getElementById("aqi-table");
    table.innerHTML = null;//初始化table以便刷新数据
	for(var sCity in aqiData){
		if (table.children.length == 0) {
			table.innerHTML = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
			alert (table.children);
		}
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		td1.innerHTML = sCity;
		tr.appendChild(td1);
		var td2 = document.createElement("td");
		td2.innerHTML = aqiData[sCity];
		tr.appendChild(td2);
		var td3 = document.createElement("td");
		td3.innerHTML = "<button class='del-btn'>删除</button>";
		tr.appendChild(td3);
		table.appendChild(tr);
		
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
	// do sth.
	var tr = target.parentElement.parentElement;
	delete aqiData[tr.children[0].innerHTML];
	renderAqiList();
}

function init() {

	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var btnAdd = document.getElementById("add-btn");
	btnAdd.onclick = addBtnHandle;

	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	
	var table = document.getElementById("aqi-table");
	//var arrBtnDel = table.getElementsByClassName("del-btn");

	table.addEventListener("click", function(e) {	
		if (e.target.nodeName === "BUTTON") {
			delBtnHandle(e.target);
		}
	});
}

init();