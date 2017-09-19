var nowStatus = "my";
document.getElementById("txtKeyword").addEventListener("tap", function() {
	var options = {};
	options.type = "date";
	/*
	 * 首次显示时实例化组件
	 * 示例为了简洁，将 options 放在了按钮的 dom 上
	 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
	 */
	var picker = new mui.DtPicker(options);
	picker.show(function(rs) {
		var birthday = document.getElementById("txtKeyword");
		birthday.value = rs.text;
		picker.dispose();
		loaddata(nowStatus); 
	});
})
function loaddata(status) {
	var util = new Util();
	var userid = util.getvalueincache("USERID");
	var result = "";
	var searchdate = document.getElementById("txtKeyword").value;
	if(util.isNullStr(searchdate)){
		searchdate = "empty";
	}
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/findyewuorder/userid/'+userid+"/status/"+status+"/searchdate/"+searchdate, {
		type: 'post',
		success: function(data) {  
			for(var i = 0; i < data.length; i++) {
				var item = data[i];
				var template = document.getElementById("order_template").innerHTML;
				template = template.replace("\$\{pkid\}", item.pkid);
				template = template.replace("\$\{username\}", item.username);
				template = template.replace("\$\{typeval\}", item.type); 
				if(item.type==1){
					template = template.replace("\$\{type\}", "大工商订气");	
					if(item.dgsstatus==0){ 
						template = template.replace("\$\{dgsstatus\}", "已下单");	
					}else if(item.dgsstatus==1){
						template = template.replace("\$\{dgsstatus\}", "已派车"); 
					}else if(item.dgsstatus==2){
						template = template.replace("\$\{dgsstatus\}", "已出库"); 
					}else if(item.dgsstatus==3){
						template = template.replace("\$\{dgsstatus\}", "已入库"); 
					}else if(item.dgsstatus==4){
						template = template.replace("\$\{dgsstatus\}", "已完成"); 
					}
				}else if(item.type==2){ 
					template = template.replace("\$\{type\}", "大工商回收空瓶"); 
					if(item.hspstatus==0){
						template = template.replace("\$\{dgsstatus\}", "已下单");	
					}else if(item.hspstatus==1){
						template = template.replace("\$\{dgsstatus\}", "已派车"); 
					}else if(item.hspstatus==2){
						template = template.replace("\$\{dgsstatus\}", "已入库"); 
					}else if(item.hspstatus==3){
						template = template.replace("\$\{dgsstatus\}", "已核价"); 
					} 
				}
				
				template = template.replace("\$\{buytime\}", new Date(item.buytime*1000).Format("yyyy-MM-dd hh:mm:ss"));
				template = template.replace("\$\{buyername\}", item.buyername);
				template = template.replace("\$\{buyeraddress\}", item.buyeraddress);
				template = template.replace("\$\{buyermobile\}", item.buyermobile);
				result += template;
			}
			if(result==""){
				result = "<ul class=\"mui-table-view mt-10\" style=\"text-align:center;\"><li style=\"text-align:center;padding-top:20px;padding-bottom:20px;\"><span class=\"font-size-14 ft-grey\">没有订单</span></li></ul>";
			}
			document.getElementById("orders").innerHTML = result;
			var imgitems = document.getElementsByName("order_item");
			if(imgitems) {
				for(var i = 0; i < imgitems.length; i++) { 
					var item = imgitems[i]; 
					item.addEventListener("tap", function() { 
						var orderid = this.getAttribute('pkid');
						var type = this.getAttribute('typeval');
						document.location.href = "yewudetail.html?orderid="+orderid+"&type="+type; 	
					});
				} 
			}
		}
	});
}
document.getElementById("aHome").addEventListener("tap",function(){
	document.location.href="indexyewu.html";
});
document.getElementById("aOrders").addEventListener("tap",function(){
	document.location.href="ordersyewu.html";
});
document.getElementById("myorder").addEventListener("tap",function(){
	nowStatus = "my";
	loaddata("my");
});
document.getElementById("otherorder").addEventListener("tap",function(){
	nowStatus = "others";
	loaddata("other");
});
document.getElementById("logout").addEventListener("tap", function() {
	localStorage.removeItem("USERID");
	localStorage.removeItem("USERNAME");
	document.location.href = "login.html";
});
mui.plusReady(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
	loaddata("my");
});