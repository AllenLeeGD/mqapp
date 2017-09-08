document.getElementById("submit_info").addEventListener("tap",function(){
	var util = new Util();
	var code = document.getElementById("code").value;
	var password = document.getElementById("password").value;
	if(util.isNullStr(code) || util.isNullStr(password)){
		mui.toast("请填写完整信息");
		return;
	}
	var param = {}; 
	param.code = base64_encode(code);
	param.password = base64_encode(password);
	mui.ajax(edu_host + '/index.php/Mq/Mobilemember/login', {
		type: 'post',
		data:param,
		success: function(data) {
			if(!util.isNullStr(data) && data.indexOf("yes") != -1){
				mui.toast("登录成功");
				var role = data.substr(4,1);
				returns = data.split("-");
				util.putvalueincache("USERID",returns[3]);
				util.putvalueincache("USERNAME",returns[2]);
				setTimeout(function(){
					if(role==2){
						document.location.href = "ordersyewu.html";	
					}else if(role==9){
						document.location.href = "indexchedui.html";	
					}else if(role==5 || role==6 || role==7){
						document.location.href = "indexpeisong.html";	
					}else{
						mui.toast("没有开放此功能");
					}
					
				},1000);
			}else{
				mui.toast("用户名或密码不正确");
			}
		}
	});
});
mui.ready(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
});