document.getElementById("btnPrint").addEventListener("tap",function(){
	document.location.href = "indexpeisong.html";
});
function loadjm() {
	var util = new Util();
	var pkid = util.getParam("orderid");
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/findjmorderdetail/pkid/'+pkid, {
		type: 'post',
		success: function(data) {
			if(data.jmstatus==3){
				dgsstatusstr =  "待配送";	
			}else if(data.jmstatus==4){
				dgsstatusstr = "已收款"; 
			}else if(data.jmstatus==5){
				dgsstatusstr = "已存款"; 
			}else if(data.jmstatus==6){
				dgsstatusstr = "已核款"; 
			}
			document.getElementById("price").innerHTML = " ￥"+data.price;
			document.getElementById("buyername").innerHTML = "客户名称:  "+data.buyername;
			document.getElementById("buyeraddress").innerHTML = "客户地址:  "+data.buyeraddress;
			document.getElementById("buyermobile").innerHTML = "联系电话:  "+data.buyermobile;
			document.getElementById("remark").innerHTML = "备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:  "+data.remark;
			document.getElementById("buytime").innerHTML = "订购时间:  "+new Date(data.buytime*1000).Format("yyyy-MM-dd hh:mm:ss");
			
			document.getElementById("mname").innerHTML = "门店:  "+(util.isNullStr(data.mname)?"":data.mname);
			document.getElementById("pname").innerHTML = "片区:  "+(util.isNullStr(data.pname)?"":data.pname);
			document.getElementById("fenpaitime").innerHTML = "分派时间:  "+(util.isNullStr(data.fenpaitime)?"":(new Date(data.fenpaitime*1000).Format("yyyy-MM-dd hh:mm:ss")));
			
			document.getElementById("songqiname").innerHTML = "送气工:  "+(util.isNullStr(data.songqiname)?"":data.songqiname);
			document.getElementById("carnumber").innerHTML = "配送车辆:  "+(util.isNullStr(data.carnumber)?"":data.carnumber);
			document.getElementById("setpeopleopttime").innerHTML = "设置配送时间:  "+(util.isNullStr(data.setpeopleopttime)?"":(new Date(data.setpeopleopttime*1000).Format("yyyy-MM-dd hh:mm:ss")));

		}
	});
} 
function loaddetail() {
	var util = new Util();
	var result = "";
	var priceresult = "";
	var pkid = util.getParam("orderid");
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/findcheduiorderdetailitem/pkid/'+pkid, {
		type: 'post',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var item = data[i];
				var template = document.getElementById("detail_template").innerHTML;
				template = template.replace("\$\{productcount\}", item.productcount);
				template = template.replace("\$\{productname\}", item.productname);
				template = template.replace("\$\{bottleprice\}", "￥"+item.bottleprice);
				result += template;
			}	
			document.getElementById("orderdetails").innerHTML = result;
		}
	});
}

document.getElementById("btnWeixin").addEventListener("tap",function(){
	var util = new Util();
	var pkid = util.getParam("orderid");
	var param = [];
	var items = document.getElementsByName("priceitem");
	for(var i = 0;i<items.length;i++){
		var needset = items[i].getAttribute("needset");
		if(needset=="yes"){
			var itemid = items[i].getAttribute("id");
			var itemvalue = items[i].value;
			var itemtype = items[i].getAttribute("pricetype");
			if(util.isNullStr(itemvalue)){
				mui.toast("请设置价格");
				return;
			}
			param.push({"pkid":itemid,"value":itemvalue,"type":itemtype});
		}
	}
	var transform = {};
	transform.contents = base64_encode(JSON.stringify(param));
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/setFinalPrice/orderid/'+pkid, {
		type: 'post',
		data:transform,
		success: function(data) {
			if(data=="yes"){
				mui.toast("核价成功");
				setTimeout(function(){
					document.location.href = "ordersyewu.html";
				},1500);
			}else{
				mui.toast("核价失败,请联系系统管理员")
			}
		}
	});
});
mui.ready(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
	var util = new Util();
	var status = util.getParam("status");
	if(status=="my"){
		document.getElementById("btnPrintDiv").style.display="";
		document.getElementById("btnWxDiv").style.display="";
	}
	loadjm();
	loaddetail();
});