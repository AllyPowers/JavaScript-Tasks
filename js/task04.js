/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = new Object();
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityName = document.getElementById("aqi-city-input").value;
	var aqiValue = document.getElementById("aqi-value-input").value;
	//城市名不包含
	if (!cityName.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
		alert("城市名必须为中英文字符");
		return;
	}
	//整数判断：
	if (!(aqiValue == Math.round(aqiValue))) {
		alert("aqi数据必须为整数");
		return;
	}
	aqiData[cityName] = aqiValue;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var viewTable = document.getElementById("aqi-table");
	var localAqiData = aqiData;
	viewTable.innerHTML = "";
	var eleFragment = document.createDocumentFragment();
	var tr = document.createElement("tr");
	tr.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	eleFragment.appendChild(tr);
	for(key in localAqiData){
		tr = document.createElement("tr");
		//删除按钮设置自定义属性，从而在执行事件响应的时候可以获取相应的删除目标
		tr.innerHTML = "<tr><td>"+key+"</td><td>"+localAqiData[key]+"</td><td><button onclick='delBtnHandle(this)' data-key='"+key+"'>删除</button></td></tr>";
		eleFragment.appendChild(tr);	
	}
	viewTable.appendChild(eleFragment);
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
function delBtnHandle(self) {
  // do sth.
  console.log(self);
  var key = self.getAttribute("data-key");
  delete aqiData[key];
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById("add-btn");
  EventUtil.addHandler(addBtn,"click",addBtnHandle);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}
var EventUtil = {
	addHandler: function (element, type, handler) {
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type, handler);
		}else{
			element["on"+type] = handler;
		}
	},
	removeHandler: function (element,type,handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type,handler,false);
		}else if (element.detachEvent) {
			element.detachEvent("on"+type,handler);
		} else {
			element["on"+type] = null;
		}
	}
}
init();