function loaddata() {
	var util = new Util();
	var result = "";
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/findcheduiorder', {
		type: 'post',
		success: function(data) {
			for(var i = 0; i < data.length; i++) { 
				var item = data[i];
				var template = document.getElementById("order_template").innerHTML;
				template = template.replace("\$\{pkid\}", item.pkid);
				template = template.replace("\$\{username\}", item.username);
				if(item.type==1){
					template = template.replace("\$\{type\}", "大工商订气");	
				}else if(item.type==2){
					template = template.replace("\$\{type\}", "大工商回收空瓶"); 
				}
				template = template.replace("\$\{buytime\}", new Date(item.buytime*1000).Format("yyyy-MM-dd hh:mm:ss"));
				template = template.replace("\$\{buyername\}", item.buyername);
				template = template.replace("\$\{buyeraddress\}", item.buyeraddress);
				template = template.replace("\$\{buyermobile\}", item.buyermobile);
				if(item.startpoint==1){
					template = template.replace("\$\{startpoint\}", "百岛");
				}else{
					template = template.replace("\$\{startpoint\}", "高栏码头");	
				}
				
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
						document.location.href = "cheduidetail.html?orderid="+orderid;
					});
				} 
			}
		}
	});
}
document.getElementById("aOrders").addEventListener("tap",function(){
	document.location.href = "indexchedui.html";
});
document.getElementById("logout").addEventListener("tap",function(){
	localStorage.removeItem("USERID");
	localStorage.removeItem("USERNAME");
	document.location.href="login.html";
});
 
mui.plusReady(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
	loaddata();
});