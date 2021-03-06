var nowStatus = "my";
function loaddata(status) {
	var util = new Util();
	var userid = util.getvalueincache("USERID");
	var result = "";
	var searchdate = document.getElementById("txtKeyword").value;
	if(util.isNullStr(searchdate)){
		searchdate = "empty";
	}
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/findpeisong/userid/' + userid + "/status/" + status+"/searchdate/"+searchdate, {
		type: 'post',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var item = data[i];
				var template = document.getElementById("order_template").innerHTML;
				template = template.replace("\$\{pkid\}", item.pkid);
				template = template.replace("\$\{username\}", "订单号:" + item.pkid);
				if(item.jmstatus == 3) {
					template = template.replace("\$\{dgsstatus\}", "待配送");
				} else if(item.jmstatus == 4) {
					template = template.replace("\$\{dgsstatus\}", "已收款");
				} else if(item.jmstatus == 5) {
					template = template.replace("\$\{dgsstatus\}", "已存款");
				} else if(item.jmstatus == 6) {
					template = template.replace("\$\{dgsstatus\}", "已核款");
				} else if(item.jmstatus == 8) {
					template = template.replace("\$\{dgsstatus\}", "已送达");
				}

				template = template.replace("\$\{buytime\}", new Date(item.setpeopleopttime * 1000).Format("yyyy-MM-dd hh:mm:ss"));
				template = template.replace("\$\{buyername\}", item.buyername);
				template = template.replace("\$\{buyeraddress\}", item.buyeraddress);
				template = template.replace("\$\{buyermobile\}", item.buyermobile);
				result += template;
			}
			if(result == "") {  
				result = "<ul class=\"mui-table-view mt-10\" style=\"text-align:center;\"><li style=\"text-align:center;padding-top:20px;padding-bottom:20px;\"><span class=\"font-size-14 ft-grey\">没有订单</span></li></ul>";
			}
			document.getElementById("orders").innerHTML = result;
			var imgitems = document.getElementsByName("order_item");
			if(imgitems) {
				for(var i = 0; i < imgitems.length; i++) {
					var item = imgitems[i];
					item.addEventListener("tap", function() {
						var orderid = this.getAttribute('pkid');
						document.location.href = "peisongdetail.html?orderid=" + orderid + "&status=" + status;
					});
				}
			}
		}
	});
}
document.getElementById("logout").addEventListener("tap", function() {
	localStorage.removeItem("USERID");
	localStorage.removeItem("USERNAME");
	document.location.href = "login.html";
});

document.getElementById("aHome").addEventListener("tap", function() {
	document.getElementById("aHome").classList.add("mui-active");
	document.getElementById("aOrders").classList.remove("mui-active");
	nowStatus = "my";
	loaddata("my");	
});
document.getElementById("aOrders").addEventListener("tap", function() {
	document.getElementById("aOrders").classList.add("mui-active");
	document.getElementById("aHome").classList.remove("mui-active");
	nowStatus = "others";
	loaddata("others");
});
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
mui.plusReady(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();
	loaddata("my");
});