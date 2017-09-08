function loaddata() {
	var util = new Util();
	var pkid = util.getParam("orderid");
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/findcheduiorderdetail/pkid/'+pkid, {
		type: 'post',
		success: function(data) {
			document.getElementById("username").innerHTML = data.username; 
			var typestr;
			if(data.type==1){
				typestr =  "大工商订气";	 
			}else if(data.type==2){
				typestr = "大工商回收空瓶"; 
			} 
			document.getElementById("type").innerHTML = typestr;
			document.getElementById("buyername").innerHTML = "客户名称:  "+data.buyername;
			document.getElementById("buyeraddress").innerHTML = "客户地址:  "+data.buyeraddress;
			document.getElementById("buyermobile").innerHTML = "联系电话:  "+data.buyermobile;
			document.getElementById("remark").innerHTML = "备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:  "+data.remark;
			document.getElementById("buytime").innerHTML = new Date(data.buytime*1000).Format("yyyy-MM-dd hh:mm:ss");
			if(data.startpoint==1){
				document.getElementById("startpoint").innerHTML = "充气地点:  百岛";
			}else{
				document.getElementById("startpoint").innerHTML = "充气地点:  高栏码头";
			}
		}
	});
}
function loaddetail() {
	var util = new Util();
	var result = "";
	var pkid = util.getParam("orderid");
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/findcheduiorderdetailitem/pkid/'+pkid, {
		type: 'post',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var item = data[i];
				var pname = (util.isNullStr(item.pname)?"":item.pname)+(util.isNullStr(item.fname)?"":item.fname);
				var template = document.getElementById("detail_template").innerHTML;
				template = template.replace("\$\{pname\}", pname);
				template = template.replace("\$\{productname\}", item.productname);
				result += template;
			}
			document.getElementById("orderdetails").innerHTML = result;			
		}
	});
}
document.getElementById("btnStartDate").addEventListener("tap",function(){
	var optionsJson = this.getAttribute('data-options') || '{}';
	var options = JSON.parse(optionsJson);
	var id = this.getAttribute('id');
	/*
	 * 首次显示时实例化组件
	 * 示例为了简洁，将 options 放在了按钮的 dom 上
	 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
	 */
	var picker = new mui.DtPicker(options);
	var birthday = document.getElementById("recardate");
	picker.show(function(rs) {
		/*
		 * rs.value 拼合后的 value
		 * rs.text 拼合后的 text
		 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
		 * rs.m 月，用法同年
		 * rs.d 日，用法同年
		 * rs.h 时，用法同年
		 * rs.i 分（minutes 的第二个字母），用法同年
		 */
		birthday.value = rs.text;
		/* 
		 * 返回 false 可以阻止选择框的关闭
		 * return false;
		 */
		/*
		 * 释放组件资源，释放后将将不能再操作组件
		 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
		 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
		 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
		 */
		picker.dispose();
	});
})
document.getElementById("btnSave").addEventListener("tap",function(){
	var util = new Util();
	var pkid = util.getParam("orderid");
	var recarnumber = document.getElementById("recarnumber").value;
	var recardate = document.getElementById("recardate").value;
	if(util.isNullStr(recardate) || util.isNullStr(recarnumber)){
		mui.toast("请填写完整信息");
		return;
	}
	var param = {}; 
	param.recarnumber = base64_encode(recarnumber);
	param.recardate = base64_encode(recardate);
	param.recaroptid = util.getvalueincache("USERID"); 
	param.recaroptname = base64_encode(util.getvalueincache("USERNAME"));
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/sendcar/pkid/'+pkid, {
		type: 'post',
		data:param,
		success: function(data) {
			if(data=="yes"){
				mui.toast("接单成功");
				setTimeout(function(){
					document.location.href = "indexchedui.html";
				},1500);
			}else{
				mui.toast("接单失败,请联系系统管理员")
			}
		}
	});
});
mui.plusReady(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
	loaddata();
	loaddetail();
});
document.getElementById("aOrders").addEventListener("tap",function(){
	document.location.href = "indexchedui.html";
});
