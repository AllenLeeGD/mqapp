mui.plusReady(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
	document.getElementById("dgs").addEventListener("tap", function() {
		document.location.href = "dgsAdd.html";
	});
	document.getElementById("hsp").addEventListener("tap", function() {
		document.location.href = "hspAdd.html";
	});
	document.getElementById("jm").addEventListener("tap", function() { 
		document.location.href = "jmAdd.html";
	});
	document.getElementById("aHome").addEventListener("tap", function() {
		document.location.href = "indexyewu.html";
	}); 
	document.getElementById("aOrders").addEventListener("tap", function() {
		document.location.href = "ordersyewu.html";
	});
	document.getElementById("logout").addEventListener("tap", function() {
		localStorage.removeItem("USERID");
		localStorage.removeItem("USERNAME");
		document.location.href = "login.html";
	});
	
});