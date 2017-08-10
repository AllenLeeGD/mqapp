function getOuttype(outtype){
	if(outtype=="1"){
		return "代理商";
	}else if(outtype=="2"){
		return "门店";
	}else if(outtype=="3"){
		return "小工商";
	}
}
document.getElementById("btnBack").addEventListener("tap",function(){
	document.location.href = "ordersyewu.html";
});
function loaddata() {
	var util = new Util();
	var pkid = util.getParam("orderid");
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/findyewuorderdetail/pkid/'+pkid, {
		type: 'post',
		success: function(data) {
			document.getElementById("username").innerHTML = data.username; 
			var typestr;
			if(data.type==1){
				typestr =  "大工商订气";	
			}else if(data.type==2){
				typestr = "大工商回收空瓶"; 
			}
			if(data.dgsstatus==0){
				dgsstatusstr =  "已下单";	
				document.getElementById("btnBackDiv").style.display="";
			}else if(data.dgsstatus==1){
				dgsstatusstr = "已派车"; 
				document.getElementById("btnBackDiv").style.display="";
			}else if(data.dgsstatus==2){
				dgsstatusstr = "已出库"; 
				document.getElementById("btnBackDiv").style.display="";
			}else if(data.dgsstatus==3){
				dgsstatusstr = "已入库"; 
				document.getElementById("btnSaveDiv").style.display="";
			}else if(data.dgsstatus==4){
				dgsstatusstr = "已完成";
				document.getElementById("btnBackDiv").style.display="";
			}
			document.getElementById("dgsstatus").innerHTML = dgsstatusstr;
			document.getElementById("type").innerHTML = typestr;
			document.getElementById("buyername").innerHTML = "客户名称:  "+data.buyername;
			document.getElementById("buyeraddress").innerHTML = "客户地址:  "+data.buyeraddress;
			document.getElementById("buyermobile").innerHTML = "联系电话:  "+data.buyermobile;
			document.getElementById("remark").innerHTML = "备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:  "+data.remark;
			document.getElementById("buytime").innerHTML = new Date(data.buytime*1000).Format("yyyy-MM-dd hh:mm:ss");
			
			document.getElementById("recaroptname").innerHTML = "预派车操作人:  "+(util.isNullStr(data.recaroptname)?"":data.recaroptname);
			document.getElementById("recarnumber").innerHTML = "预派车牌号码:  "+(util.isNullStr(data.recarnumber)?"":data.recarnumber);
			document.getElementById("recardate").innerHTML = "预计到达时间:  "+(util.isNullStr(data.recardate)?"":(new Date(data.recardate*1000).Format("yyyy-MM-dd hh:mm:ss")));
			
			document.getElementById("outoptname").innerHTML = "出库操作人:  "+(util.isNullStr(data.outoptname)?"":data.outoptname);			
			document.getElementById("outoptdate").innerHTML = "出库时间:  "+(util.isNullStr(data.outoptdate)?"":(new Date(data.outoptdate*1000).Format("yyyy-MM-dd hh:mm:ss")));
			document.getElementById("carnumber").innerHTML = "出库车牌号码:  "+(util.isNullStr(data.carnumber)?"":data.carnumber);
			document.getElementById("outjing").innerHTML = "净重:  "+(util.isNullStr(data.outjing)?"":data.outjing);
			document.getElementById("outmao").innerHTML = "毛重:  "+(util.isNullStr(data.outmao)?"":data.outmao);
			document.getElementById("outpi").innerHTML = "皮重:  "+(util.isNullStr(data.outpi)?"":data.outpi);
			document.getElementById("outtype").innerHTML = "结算类型:  "+(util.isNullStr(data.outtype)?"":getOuttype(data.outtype));
			
			document.getElementById("inoptname").innerHTML = "入库操作人:  "+(util.isNullStr(data.inoptname)?"":data.inoptname);			
			document.getElementById("inoptdate").innerHTML = "入库时间:  "+(util.isNullStr(data.inoptdate)?"":(new Date(data.inoptdate*1000).Format("yyyy-MM-dd hh:mm:ss")));
			document.getElementById("incarnumber").innerHTML = "入库车牌号码:  "+(util.isNullStr(data.incarnumber)?"":data.incarnumber);
			document.getElementById("cun").innerHTML = "客户存瓶:  "+(util.isNullStr(data.cun)?"":data.cun);
			document.getElementById("huiempty").innerHTML = "回流空瓶:  "+(util.isNullStr(data.huiempty)?"":data.huiempty);
			document.getElementById("huifull").innerHTML = "回流重瓶:  "+(util.isNullStr(data.huifull)?"":data.huifull);
			document.getElementById("huishou").innerHTML = "回收瓶:  "+(util.isNullStr(data.huishou)?"":data.huishou);
			document.getElementById("weight").innerHTML = "客户称重:  "+(util.isNullStr(data.weight)?"":data.weight);
		}
	});
}
function loaddetail() {
	var util = new Util();
	var result = "";
	var priceresult = "";
	var pkid = util.getParam("orderid");
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/findcheduiorderdetailitem/pkid/'+pkid, {
		type: 'post',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				var item = data[i];
				var template = document.getElementById("detail_template").innerHTML;
				template = template.replace("\$\{pname\}", item.pname+item.fname);
				template = template.replace("\$\{productname\}", item.productname);
				result += template;
				
				var pricetemplate = document.getElementById("price_template").innerHTML;
				pricetemplate = pricetemplate.replace("\$\{inputid\}", item.pkid);
				if(item.bottleprice==0 && item.weightprice==0){
					pricetemplate = pricetemplate.replace("\$\{msg\}", "请设置"+item.productname+"的单价");
					pricetemplate = pricetemplate.replace("\$\{value\}", "");
					pricetemplate = pricetemplate.replace("\$\{onley\}", "");	
					pricetemplate = pricetemplate.replace("\$\{needset\}", "yes");
					if(item.productcount != "0"){
						pricetemplate = pricetemplate.replace("\$\{pricetype\}", "bottle");
					}else if(item.productweight != "0"){
						pricetemplate = pricetemplate.replace("\$\{pricetype\}", "weight");
					}else{
						pricetemplate = pricetemplate.replace("\$\{pricetype\}", "");
					}
				}else if(item.bottleprice>0){
					pricetemplate = pricetemplate.replace("\$\{value\}", item.productname+" 每瓶单价为"+item.bottleprice);
					pricetemplate = pricetemplate.replace("\$\{only\}", "disabled='disabled'");
					pricetemplate = pricetemplate.replace("\$\{needset\}", "");
					pricetemplate = pricetemplate.replace("\$\{pricetype\}", "");
				}else if(item.weightprice>0){
					pricetemplate = pricetemplate.replace("\$\{value\}", item.productname+" 每吨单价为"+item.weightprice);
					pricetemplate = pricetemplate.replace("\$\{only\}", "disabled='disabled'");
					pricetemplate = pricetemplate.replace("\$\{needset\}", "");
					pricetemplate = pricetemplate.replace("\$\{pricetype\}", "");
				}
				priceresult+=pricetemplate;
			}
			document.getElementById("orderdetails").innerHTML = result;
			document.getElementById("divSetprice").innerHTML = priceresult;
		}
	});
}

document.getElementById("btnSave").addEventListener("tap",function(){
	var util = new Util();
	var pkid = util.getParam("orderid");
	var param = [];
	var items = document.getElementsByName("priceitem");
	for(var i = 0;i<items.length;i++){
		var needset = items[i].getAttribute("needset");
		if(needset=="yes"){
			var itemid = items[i].getAttribute("id");
			var itemvalue = items[i].value;
			var itemtype = items[i].getAttribute("pricetype");
			if(util.isNullStr(itemvalue)){
				mui.toast("请设置价格");
				return;
			}
			param.push({"pkid":itemid,"value":itemvalue,"type":itemtype});
		}
	}
	var transform = {};
	transform.contents = base64_encode(JSON.stringify(param));
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/setFinalPrice/orderid/'+pkid, {
		type: 'post',
		data:transform,
		success: function(data) {
			if(data=="yes"){
				mui.toast("核价成功");
				setTimeout(function(){
					document.location.href = "ordersyewu.html";
				},1500);
			}else{
				mui.toast("核价失败,请联系系统管理员")
			}
		}
	});
});
document.getElementById("aHome").addEventListener("tap",function(){
	document.location.href="indexyewu.html";
});
document.getElementById("aOrders").addEventListener("tap",function(){
	document.location.href="ordersyewu.html";
});
mui.ready(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
	loaddata();
	loaddetail();
});