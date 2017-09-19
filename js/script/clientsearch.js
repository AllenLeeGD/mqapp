function loaddata(returnurl) {
	var util = new Util();
	var keyword = document.getElementById("txtKeyword").value;
	if(util.isNullStr(keyword)) {
		keyword = "emptynull";
	}
	var result = "";
	mui.ajax(edu_host + '/index.php/Member/Member/findDGSMembers/keyword/' + keyword, {
		type: 'post',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var item = data[i];
				var template = document.getElementById("selected_template").innerHTML;
				template = template.replace("\$\{pkid\}", item.pkid); 
				template = template.replace("\$\{realname\}", item.realname);
				template = template.replace("\$\{realname\}", item.realname);
				template = template.replace("\$\{mobile\}", (util.isNullStr(item.mobile)?"":item.mobile));
				template = template.replace("\$\{mobile\}", (util.isNullStr(item.mobile)?"":item.mobile));
				template = template.replace("\$\{address\}", (util.isNullStr(item.address)?"":item.address));
				template = template.replace("\$\{address\}", (util.isNullStr(item.address)?"":item.address));
				var membertypestr="";
				if(item.membertype==1){
					membertypestr = "居民用户";
				}else if(item.membertype==2){
					membertypestr = "小工商";
				}else if(item.membertype==3){
					membertypestr = "大工商";
				} 
				template = template.replace("\$\{type\}", membertypestr);
				result += template;
			}
			document.getElementById("clients").innerHTML = result;
			var imgitems = document.getElementsByName("clientitem");
			if(imgitems) {
				for(var i = 0; i < imgitems.length; i++) {
					var item = imgitems[i]; 
					item.addEventListener("tap", function() {
						var clientid = this.getAttribute('pkid');
						var clientname = this.getAttribute('realname');
						var address = this.getAttribute('address');
						var mobile = this.getAttribute('mobile');
						if(util.isNullStr(returnurl)){
							document.location.href = "dgsAdd.html?type=client&clientid="+clientid+"&clientname="+base64_encode(clientname)+"&mobile="+base64_encode(mobile)+"&address="+base64_encode(address);	
						}else if(returnurl=="kongping"){
							document.location.href = "hspAdd.html?type=client&clientid="+clientid+"&clientname="+base64_encode(clientname)+"&mobile="+base64_encode(mobile)+"&address="+base64_encode(address);
						}else if(returnurl=="jm"){
							document.location.href = "jmAdd.html?type=client&clientid="+clientid+"&clientname="+base64_encode(clientname)+"&mobile="+base64_encode(mobile)+"&address="+base64_encode(address);
						}
						
					});
				} 
			}
		}
	});
}
document.getElementById("btnSearch").addEventListener("tap",function(){
	loaddata();
})
mui.plusReady(function() { 
	mui.init();
	mui(".mui-scroll-wrapper").scroll();
	var util = new Util();
	var type = util.getParam("type");
	loaddata(type);
});