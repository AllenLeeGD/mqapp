
mui.plusReady(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
	var util = new Util();
	var qrcode = util.getParam("qrcode"); 
	var r_qrcode = base64_decode(qrcode);
	$("#qrcode").qrcode(r_qrcode);
}); 