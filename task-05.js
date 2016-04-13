
   /* 数据格式演示
     var aqiSourceData = {
     "北京": {
     "2016-01-01": 10,
     "2016-01-02": 10,
     "2016-01-03": 10,
     "2016-01-04": 10
     }
     };
     */
	
    
	// 以下两个函数用于随机模拟生成测试数据
    function getDateStr(dat) {
        var y = dat.getFullYear();
        var m = dat.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = dat.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }
    function randomBuildData(seed) {
        var returnData = {};
        var dat = new Date("2016-01-01");
        var datStr = '';
        for (var i = 1; i < 92; i++) {
            datStr = getDateStr(dat);
            returnData[datStr] = Math.ceil(Math.random() * seed);
            dat.setDate(dat.getDate() + 1);//将时间设置成下一天
        }
        return returnData;
    }
    var aqiSourceData = {
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "厦门": randomBuildData(100),
        "沈阳": randomBuildData(500)
    };
	
	function addEventHandler(target,type,func){ 
        if(target.addEventListener){ 
          //监听IE9，谷歌和火狐 
          target.addEventListener(type, func, false); 
        }else if(target.attachEvent){ 
          target.attachEvent("on" + type, func); 
        }else{ 
          target["on" + type] = func; 
        }  
      } 

	
    // 用于渲染图表的数据
    var chartData = {};
    // 记录当前页面的表单选项
    var pageState = {
        nowSelectCity:"-1",
        nowGraTime: "day"
    }
    /**
     * 渲染图表
     */
    function renderChart() {
       var str="";
       for(var v in chartData){
            str+="<div class='box "+pageState['nowGraTime']+"'>";
            str+="<div class='data-info' style='height:"+chartData[v]+"px;background-color:"+getRandomColor()+"' title='"+v+":"+chartData[v]+"'></div>";
            str+="</div>";
        };
        document.getElementsByClassName("aqi-chart-wrap")[0].innerHTML=str;
    }
    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange(radio) {
        // 确定是否选项发生了变化
        var nowType = getTimeNow();
        if(nowType == pageState["nowGraTime"]){
            return 0;
        }else{
        // 设置对应数据
            initAqiChartData();
        // 调用图表渲染函数
            renderChart();
        }

    }
    /**
     * 获取当前时间类型
     */
    function getTimeNow(){
		var type=document.getElementsByName("gra-time");
        var nowType="";
        Array.prototype.forEach.call(type,function(t){
            if(t.checked)
                nowType=t.value;//能保留并且更改nowType的值
        });
        return nowType;
    }

	
    /**
     * select发生变化时的处理函数
     */
    function citySelectChange() {
        // 确定是否选项发生了变化
        var nowCity=document.getElementById("city-select").value;
        if(nowCity == pageState["nowSelectCity"]){
            return 0;
        }else {
            // 设置对应数据
            initAqiChartData();
            // 调用图表渲染函数
            renderChart();
        } 
    }
    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {
       /*  var types=document.getElementsByName("gra-time");
        [].forEach.call(types,function(value){
            value.addEventListener("click",graTimeChange);
        }); */
		var radio = document.getElementsByName("gra-time");
		for(var i=0;i<radio.length;i++){
			!function(n){
				addEventHandler(radio[n],'click',function(){
					graTimeChange(radio[n]);
				});
			}(i);
		}
    }
    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        var select=document.getElementById("city-select");
        var list="";
        for(var sCity in aqiSourceData){
            list += "<option value='"+sCity+"'>" + sCity + "</option>";
        }
       select.innerHTML = list;
        // 给select设置事件，当选项发生变化时调用函数citySelectChange
		addEventHandler(select,'change',function(){
			citySelectChange();
		})
        /* select.addEventListener("change",citySelectChange); */
    }
    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        // 将原始的源数据处理成图表需要的数据格式
        // 处理好的数据存到 chartData 中
        var nowType=getTimeNow();
        var sCity=document.getElementById("city-select").value;
        pageState["nowGraTime"]=nowType;
        pageState["nowSelectCity"]=sCity;
        switch (nowType){
            case "day":
                chartData=aqiSourceData[sCity];
                break;
            case "week":
                chartData={};
                var count= 0,total= 0,week= 1,date,weekDay;
                for(var d in aqiSourceData[sCity]){
                    date=new Date(d);
                    weekDay=date.getDay();
                    if(weekDay==6){
                        count++;//记录天数
                        total+=aqiSourceData[sCity][d];//n天总的aqi
                        chartData["week"+week]=Math.round(total/count);
                        count=0;
                        total=0;
                        week++;
                    }else{
                        count++;
                        total+=aqiSourceData[sCity][d];
                    }
                }
                chartData["week"+week]=Math.round(total/count);
                break;
			case "month":
				chartData={};
				var count = 0 ,total = 0 ,month = -1, date;
				for(var d in aqiSourceData[sCity]){
					date = new Date(d);
					if(month == -1){
						month = date.getMonth() + 1;
					}else if(month != date.getMonth()+1){
						chartData["month"+month]=Math.round(total/count);
						month = date.getMonth() + 1;
						count = 0;
						total = 0;
					}
					count++;
					total+=aqiSourceData[sCity][d];
				}
				chartData["month"+month]=Math.round(total/count);
				break;	
        }
        console.log(JSON.stringify(chartData));
        renderChart(); 
    }
    /**
     * 获取随机颜色
     */
	 
	
	
    function getRandomColor(){
		var colorGroup = ["#aaa","#bbb","#ccc","#ddd","#eee","#abc","#abe","#abb","#bab","#cbc","#bcb","#C0C0C0"]; 
		var random = Math.round(Math.random() * 11);
		return colorGroup[random];
    }
    /**
     * 初始化函数
     */
    function init() {
		
        initGraTimeForm();
        initCitySelector();
        initAqiChartData();
    }
    init();