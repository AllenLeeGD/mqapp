//address=""搜索蓝牙//address=设备mac地址，自动配对给出mac地址的设备
function searchDevices(address) {
	var util = new Util();
    //注册类
    var main = plus.android.runtimeMainActivity();
    var IntentFilter = plus.android.importClass('android.content.IntentFilter');
    var BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
    var BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");
    var BAdapter = BluetoothAdapter.getDefaultAdapter();
    console.log("开始搜索设备");
    var filter = new IntentFilter();
    var bdevice = new BluetoothDevice();
    var on = null;
    var un = null;
    var vlist1 = document.getElementById('list1'); //注册容器用来显示未配对设备
    vlist1.innerHTML = ''; //清空容器
    var vlist2 = document.getElementById('list2'); //注册容器用来显示未配对设备
    vlist2.innerHTML = ''; //清空容器
    var button1 = document.getElementById('bt1');
    button1.disabled=true;
    button1.innerHTML='正在搜索请稍候';
    BAdapter.startDiscovery(); //开启搜索
    var receiver;
    receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
        onReceive: function(context, intent) { //实现onReceiver回调函数
            plus.android.importClass(intent); //通过intent实例引入intent类，方便以后的‘.’操作
            console.log(intent.getAction()); //获取action
            if(intent.getAction() == "android.bluetooth.adapter.action.DISCOVERY_FINISHED"){
                main.unregisterReceiver(receiver);//取消监听
                button1.disabled=false;
                button1.innerHTML='搜索设备';
                console.log("搜索结束")
            }else{
            BleDevice = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
            //判断是否配对
            if (BleDevice.getBondState() == bdevice.BOND_NONE) {
                console.log("未配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
                //参数如果跟取得的mac地址一样就配对
                if (address == BleDevice.getAddress()) {
                    if (BleDevice.createBond()) { //配对命令.createBond()
                        console.log("配对成功");
                        var uuid = util.uuidFast();
                        var template = document.getElementById("blue_pei_template").innerHTML;
                        template = template.replace("\$\{uuid\}", uuid);
                        template = template.replace("\$\{macid\}", BleDevice.getAddress());
                        template = template.replace("\$\{devicename\}", BleDevice.getName());
                        vlist2.innerHTML = vlist2.innerHTML + template;
                        $("#list2_div").show();
                        document.getElementById(uuid).addEventListener("tap", function() { 
							var macid = this.getAttribute('macid');
							print(macid);
						}); 
                    }

                } else {
                    if(BleDevice.getName() != on ){ //判断防止重复添加
	//                  li1.setAttribute('onclick', 'searchDevices(id)'); //注册click点击列表进行配对
	                    on = BleDevice.getName();
	                    var uuid = util.uuidFast();
	                    var template = document.getElementById("blue_template").innerHTML;
	                    template = template.replace("\$\{uuid\}", uuid);
                        template = template.replace("\$\{macid\}", BleDevice.getAddress());
                        template = template.replace("\$\{devicename\}", BleDevice.getName());
	                    vlist1.innerHTML = vlist1.innerHTML + template;
						$("#list1_div").show();
						document.getElementById(uuid).addEventListener("tap", function() { 
							var macid = this.getAttribute('macid');
//							searchDevices(macid);
						});
                    }

                }
            } else {
                if(BleDevice.getName() != un ){ //判断防止重复添加
	                console.log("已配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
	                var template = document.getElementById("blue_pei_template").innerHTML;
	                var uuid = util.uuidFast();
	                template = template.replace("\$\{uuid\}", uuid);
	                template = template.replace("\$\{macid\}", BleDevice.getAddress());
	                template = template.replace("\$\{devicename\}", BleDevice.getName());
	                un = BleDevice.getName();     
	                vlist2.innerHTML = vlist2.innerHTML + template;
	                $("#list2_div").show();
	                document.getElementById(uuid).addEventListener("tap", function() { 
						var macid = this.getAttribute('macid');
						print(macid);
					}); 
                }
            }}




        }
    });

    filter.addAction(bdevice.ACTION_FOUND);
    filter.addAction(BAdapter.ACTION_DISCOVERY_STARTED);
    filter.addAction(BAdapter.ACTION_DISCOVERY_FINISHED);
    filter.addAction(BAdapter.ACTION_STATE_CHANGED);
    main.registerReceiver(receiver, filter); //注册监听
}

var device = null,
    BAdapter = null,
    BluetoothAdapter = null,
    uuid = null,
    main = null,
    bluetoothSocket = null;

function print(mac_address) {
    if (!mac_address) {
        mui.toast('请选择蓝牙打印机');
        return;
    }

    main = plus.android.runtimeMainActivity();
    BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
    UUID = plus.android.importClass("java.util.UUID");
    uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    BAdapter = BluetoothAdapter.getDefaultAdapter();
    device = BAdapter.getRemoteDevice(mac_address);
    plus.android.importClass(device);
    bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);
    plus.android.importClass(bluetoothSocket);

    if (!bluetoothSocket.isConnected()) {
        console.log('检测到设备未连接，尝试连接....');
        bluetoothSocket.connect();
    }

    console.log('设备已连接');

    if (bluetoothSocket.isConnected()) {
        var outputStream = bluetoothSocket.getOutputStream();
        plus.android.importClass(outputStream);
        var string = "打印测试\r\n";
        var bytes = plus.android.invoke(string, 'getBytes', 'gbk');
        outputStream.write(bytes);
        outputStream.flush();
        device = null //这里关键
        bluetoothSocket.close(); //必须关闭蓝牙连接否则意外断开的话打印错误

    }

}