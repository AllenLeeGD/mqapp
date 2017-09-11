function checkOrder(){
	var util = new Util();
	var orderid = util.getParam("orderid");
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/checkwxorder/orderid/'+orderid, {
		type: 'post',
		success: function(data) {
			if(data=="yes"){
				$("#qrcode").html("");
				$("#title").html("支付成功");
				$("#btnPrintDiv").show();
			}else{
				setTimeout(function(){
					checkOrder();
				},1500);
			}
		}
	});
}
document.getElementById("btnPrint").addEventListener("tap",function(){
	var util = new Util();
	var orderid = util.getParam("orderid");
	document.location.href = "print.html?orderid="+orderid;
});
mui.plusReady(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
	var util = new Util();
	var qrcode = util.getParam("qrcode"); 
	var r_qrcode = base64_decode(qrcode);
	$("#qrcode").qrcode(r_qrcode);
	checkOrder();
}); 