function loadClient(){
	var util = new Util();	
	var old = JSON.parse(util.getvalueincache("client"));
	var clientid = util.getParam("clientid");
	var clientname = util.getParam("clientname");
	var mobile = util.getParam("mobile");  
	var address = util.getParam("address");
	if((util.isNullStr(old) && !util.isNullStr(clientname)) || (!util.isNullStr(old) && (old.clientname!=clientname) && !util.isNullStr(clientname)) ){//第一次选客户或第N次选客户
		document.getElementById("clientid").value = clientid;
		document.getElementById("clientname").value = base64_decode(clientname);
		document.getElementById("mobile").value = base64_decode(mobile);
		document.getElementById("address").value = base64_decode(address);
		var newv = {};
		newv.clientid =clientid;
		newv.clientname =clientname;
		newv.mobile =mobile;
		newv.address =address;
		util.putvalueincache("client",JSON.stringify(newv));
	}else if(!util.isNullStr(old)){//选择订单内容回来
		document.getElementById("clientid").value = old.clientid;
		document.getElementById("clientname").value = base64_decode(old.clientname);
		document.getElementById("mobile").value =  base64_decode(old.mobile);
		document.getElementById("address").value =  base64_decode(old.address);
	}
}  
function loadbottle(refresh){
	var util = new Util();
	var pid = util.getParam("pid");
	var pname = util.getParam("pname");
	var rid = util.getParam("rid");
	var rname = util.getParam("rname");
	var jid = util.getParam("jid");
	var jname = util.getParam("jname");
	var qid = util.getParam("qid");
	var qname = util.getParam("qname");
	var numbers = util.getParam("numbers");
	
	var item; 
	if(!util.isNullStr(pname)){
		item = base64_decode(pname)+base64_decode(rname)+base64_decode(qname)+base64_decode(jname)
		+" "+(util.isNullStr(numbers)?"":(numbers+"瓶")); 
	}
	
	var old = JSON.parse(util.getvalueincache("bottle")); 
	//第一次选订单内容
	if((old==null || old.length==0) && !util.isNullStr(pname) && !refresh){
		var template = document.getElementById("selected_template").innerHTML;
		var pkid = util.uuid();
		template = template.replace("\$\{pkid\}", pkid);
		template = template.replace("\$\{bottle\}", item);
		document.getElementById("alreadySelected").innerHTML = template;
		var bottleAry = new Array();
		bottleAry.push({"pkid":pkid,"bottle":item,"pid":pid,"pname":base64_decode(pname),"jid":jid,"jname":base64_decode(jname),"rid":rid,"rname":base64_decode(rname),"qid":qid,"qname":base64_decode(qname),"numbers":numbers});
		util.putvalueincache("bottle",JSON.stringify(bottleAry));
	}else if((old != null && old.length>0) || refresh){//第N次选订单内容，或者选客户后回到页面
		var result = "";
		if(!refresh){
			if(!util.isNullStr(pname)){//第N次选订单 
				var pkid = util.uuid();
				old.push({"pkid":pkid,"bottle":item,"pid":pid,"pname":base64_decode(pname),"jid":jid,"jname":base64_decode(jname),"rid":rid,"rname":base64_decode(rname),"qid":qid,"qname":base64_decode(qname),"numbers":numbers});
			} 
			util.putvalueincache("bottle",JSON.stringify(old));
		}
		for(var i = 0;i<old.length;i++){
			var _item = old[i];
			var template = document.getElementById("selected_template").innerHTML;
			template = template.replace("\$\{pkid\}", _item.pkid);
			template = template.replace("\$\{bottle\}", _item.bottle);
			result += template;
		}
		document.getElementById("alreadySelected").innerHTML = result;
	}
	
	var equipmentitems = document.getElementsByName("del_model");
	for(var i = 0; i < equipmentitems.length; i++) {
		var equipmentitem = equipmentitems[i];
		equipmentitem.addEventListener("tap", function() {
			delete_item = this.getAttribute("pkid");
			document.getElementById("deleteid").value = delete_item;
			mui("#deleteModelConfirm").popover("show");
		});
	}
} 
function loaddata(){
	var util = new Util();
	var type = util.getParam("type");
	if(type!="bottle" && type!="client"){//第一次进来，清空缓存
		plus.storage.removeItem("client");
		plus.storage.removeItem("bottle");
	}
	var userid = util.getvalueincache("USERID");
	var username = util.getvalueincache("USERNAME");
	document.getElementById("username").value = username;
	loadClient();	
	loadbottle();
	
} 
mui.plusReady(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
	//测试模拟
	var util = new Util();     
	loaddata();
}); 
document.getElementById("showClient").addEventListener("tap",function(){
	document.location.href="clientsearch.html?type=kongping";
});
document.getElementById("showPing").addEventListener("tap",function(){
	var clientid = document.getElementById("clientid").value;
	var util = new Util();
	if(util.isNullStr(clientid)){
		mui.toast("请先选择客户");
		return;
	}else{
		document.location.href="kongpingAdd.html?memberid="+clientid;	
	}	
}); 
document.getElementById("doback").addEventListener("tap",function(){
	document.location.href = "indexyewu.html";	
});
document.getElementById("btnSave").addEventListener("tap",function(){
	document.getElementById("btnSave").disabled = true;
	var util = new Util(); 
	//客户和订单不能为空
	var clientid = document.getElementById("clientid").value;
	var ordercontent = util.getvalueincache("bottle");
	if(util.isNullStr(clientid) || ordercontent==null || JSON.parse(ordercontent).length==0){
		mui.toast("请选择客户并添加订单内容");
		return;
	}
	var param = {};
	param.clientid = clientid;
	param.clientname = document.getElementById("clientname").value;
	param.userid = util.getvalueincache("USERID");
	param.username = util.getvalueincache("USERNAME");
	param.address = document.getElementById("address").value;
	param.mobile = document.getElementById("mobile").value;
	param.remark = document.getElementById("remark").value;
	param.ordercontent = base64_encode(ordercontent);
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/sendhsp', {
		type: 'post',
		data:param,
		success: function(data) { 
			if(data=="yes"){ 
				mui.toast("发送成功");
				setTimeout(function(){
					document.location.href = "indexyewu.html";
				},1000);
			}else{
				document.getElementById("btnSave").disabled = false;
				mui.toast("发送失败,请联系管理员");
			}
		}
	});
});
document.getElementById("doDeleteModel").addEventListener("tap",function(){
	var util = new Util();
	var old = JSON.parse(util.getvalueincache("bottle"));
	var newv = new Array();
	var deleteid = document.getElementById("deleteid").value;
	for(var i = 0;i<old.length;i++){
		var _item = old[i];
		if(_item.pkid!=deleteid){
			newv.push(_item);
		}
	}
	util.putvalueincache("bottle",JSON.stringify(newv));
	loadbottle(true);
	mui("#deleteModelConfirm").popover("hide");
})