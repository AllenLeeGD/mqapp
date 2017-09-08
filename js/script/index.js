
mui.plusReady(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
	var param = {};
	var util = new Util();
	param.code = util.getvalueincache("LOGIN_CODE");
	param.password = util.getvalueincache("LOGIN_PASSWORD");
	if(util.isNullStr(param.code) || util.isNullStr(param.password)){
		document.location.href="login.html";
	}else{
		mui.ajax(edu_host + '/index.php/Mq/Mobilemember/login', {
			type: 'post',
			data:param,
			success: function(data) {
				if(!util.isNullStr(data) && data.indexOf("yes") != -1){
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
							document.location.href = "login.html";
						}
						
					},1000);
				}else{
					document.location.href = "login.html";
				}
			}
		});
	}
	
});