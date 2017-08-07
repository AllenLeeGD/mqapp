mui.ready(function() {
	mui.init();
	mui(".mui-scroll-wrapper").scroll();	
});
document.getElementById("dgs").addEventListener("tap",function(){
	document.location.href="dgsAdd.html";
});
document.getElementById("hsp").addEventListener("tap",function(){
	document.location.href="detail.html";
})