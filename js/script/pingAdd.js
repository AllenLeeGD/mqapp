function loadping(){
	mui.ajax(edu_host + '/index.php/Mq/Price/loadgastype/classify/1/type/1', {
		type: 'post',
		success: function(data) {
			var arr = new Array();
				var gradePicker = new mui.PopPicker();
				for(var i = 0; i < data.length; i++) {
					var _item = data[i];
					arr.push({
						value: _item['pkid'],
						text: _item['name']
					});
				}
				gradePicker.setData(arr);
				var showGradePickerButton = document.getElementById('showPing');
				showGradePickerButton.addEventListener('tap', function(event) {
					gradePicker.show(function(items) {
						document.getElementById('pname').value = items[0].text;
						document.getElementById('pid').value = items[0].value;						
						//返回 false 可以阻止选择框的关闭
						//return false;
					});
				}, false);
		}
	});
}
function loadran(){
	mui.ajax(edu_host + '/index.php/Mq/Price/loadgastype/classify/1/type/4', {
		type: 'post',
		success: function(data) {
			var arr = new Array();
				var gradePicker = new mui.PopPicker();
				for(var i = 0; i < data.length; i++) {
					var _item = data[i];
					arr.push({
						value: _item['pkid'],
						text: _item['name']
					});
				}
				gradePicker.setData(arr);
				var showGradePickerButton = document.getElementById('showRan');
				showGradePickerButton.addEventListener('tap', function(event) {
					gradePicker.show(function(items) {
						document.getElementById('rname').value = items[0].text;
						document.getElementById('rid').value = items[0].value;						
						//返回 false 可以阻止选择框的关闭
						//return false;
					});
				}, false);
		}
	});
}
function loadQi(){
	mui.ajax(edu_host + '/index.php/Mq/Price/loadgastype/classify/1/type/3', {
		type: 'post',
		success: function(data) {
			var arr = new Array();
				var gradePicker = new mui.PopPicker();
				for(var i = 0; i < data.length; i++) {
					var _item = data[i];
					arr.push({
						value: _item['pkid'],
						text: _item['name']
					});
				}
				gradePicker.setData(arr);
				var showGradePickerButton = document.getElementById('showQi');
				showGradePickerButton.addEventListener('tap', function(event) {
					gradePicker.show(function(items) {
						document.getElementById('qname').value = items[0].text;
						document.getElementById('qid').value = items[0].value;						
						//返回 false 可以阻止选择框的关闭
						//return false;
					});
				}, false);
		}
	});
}
function loadjie(){
	mui.ajax(edu_host + '/index.php/Mq/Price/loadgastype/classify/1/type/2', {
		type: 'post',
		success: function(data) {
			var arr = new Array();
				var gradePicker = new mui.PopPicker();
				for(var i = 0; i < data.length; i++) {
					var _item = data[i];
					arr.push({
						value: _item['pkid'],
						text: _item['name']
					});
				}
				gradePicker.setData(arr);
				var showGradePickerButton = document.getElementById('showJie');
				showGradePickerButton.addEventListener('tap', function(event) {
					gradePicker.show(function(items) {
						document.getElementById('jname').value = items[0].text;
						document.getElementById('jid').value = items[0].value;						
						//返回 false 可以阻止选择框的关闭
						//return false;
					});
				}, false);
		}
	});
}
function loadpei(){
	mui.ajax(edu_host + '/index.php/Mq/Price/loadgastype/classify/2/type/6', {
		type: 'post',
		success: function(data) {
			var arr = new Array();
				var gradePicker = new mui.PopPicker();
				for(var i = 0; i < data.length; i++) {
					var _item = data[i];
					arr.push({
						value: _item['pkid'],
						text: _item['name']
					});
				}
				gradePicker.setData(arr);
				var showGradePickerButton = document.getElementById('showPei');
				showGradePickerButton.addEventListener('tap', function(event) {
					gradePicker.show(function(items) {
						document.getElementById('fname').value = items[0].text;
						document.getElementById('fid').value = items[0].value;						
						//返回 false 可以阻止选择框的关闭
						//return false;
					});
				}, false);
		}
	});
}
function loadprice(jurl){
	var util = new Util();
	var pid = document.getElementById("pid").value;
	var rid = document.getElementById("rid").value;
	var qid = document.getElementById("qid").value;
	var jid = document.getElementById("jid").value;
	if(util.isNullStr(pid)){
		pid="emptystr";
	}
	if(util.isNullStr(rid)){
		rid="emptystr";
	}
	if(util.isNullStr(qid)){
		qid="emptystr";
	}
	if(util.isNullStr(jid)){
		jid="emptystr";
	}
	var memberid = util.getParam("memberid");
	mui.ajax(edu_host + '/index.php/Mq/Mobileorder/getPrice/memberid/'+memberid+"/pid/"+pid+"/rid/"+rid+"/qid/"+qid+"/jid/"+jid, {
		type: 'post',
		success: function(data) {
			document.getElementById("price").value = data;
			if(!util.isNullStr(jurl)){
				document.location.href = jurl+"&price="+data;
			}
		}
	});
}
document.getElementById("btnSave").addEventListener("tap",function(){
	var util = new Util();
	var numbers = document.getElementById("numbers").value;
	var weight = document.getElementById("weight").value;
	if(util.isNullStr(numbers) && util.isNullStr(weight)){
		mui.toast("请填写数量或者重量");
		return;
	}
	var pid = document.getElementById("pid").value;
	var pname = document.getElementById("pname").value;
	var rname = document.getElementById("rname").value;
	var rid = document.getElementById("rid").value;
	var jname = document.getElementById("jname").value;
	var jid = document.getElementById("jid").value;
	var fname = document.getElementById("fname").value;
	var fid = document.getElementById("fid").value;
	var qname = document.getElementById("qname").value;
	var qid = document.getElementById("qid").value;
	var jurl = "dgsAdd.html?type=bottle&pid="+pid+"&pname="+base64_encode(pname)+"&rid="+rid+"&rname="+base64_encode(rname)+"&jid="+jid+"&jname="+base64_encode(jname)+
	"&fid="+fid+"&fname="+base64_encode(fname)+"&qid="+qid+"&qname="+base64_encode(qname)+"&numbers="+numbers+"&weight="+weight;
	loadprice(jurl);
})
document.getElementById("btnPrice").addEventListener("tap",function(){
	loadprice();
})

mui.plusReady(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
	loadping();
	loadran();
	loadQi();
	loadpei();
	loadjie();
});

