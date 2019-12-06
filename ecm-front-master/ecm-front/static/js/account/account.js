var isBroke;//是否为经销商
var isggsn;//是否为支持节点
//var conn = {};
//WebIM.config = config;
//conn = WebIM.conn = new WebIM.default.connection({
//  isHttpDNS: WebIM.config.isHttpDNS,
//  host: WebIM.config.Host,
//  https: WebIM.config.https,
//  url: WebIM.config.xmppURL,
//  apiUrl: WebIM.config.apiURL,
//  isAutoLogin: false,
//  delivery: WebIM.config.delivery
//})
//conn.listen({
//	onError: function (message) { //失败回调
//      console.log('onError: ', message);
//  }
//})
$(function(){
	$("#recharge").on('click',function () {
		location.href='recharge.html';
	});
	$("#cashWithdrawal").on('click',function () {
		location.href='cashWithdrawal.html';
	});
  	getIsIphonex ();
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	}
	userInfoFun();
	$('.closeBtn').on('click',function(){
		tokenVerification('/account/openPwd',{
			type:$('.closeBtn').attr('data-type')
		},function(data){
    		if(data.code == 200){
    			$.toast(data.msg);
    			userInfoFun();
    		}else{
    			console.log(data)
    		}
    	})
	})

	$('.dealer').click(function(){
		if(isBroke == '0'){
			isLayer(1);
		}else if(isBroke == '1'){
			$.toast('您已是经销商，无需再次申请！');
		}
	})
	$('.ggsn').click(function(){
		if(isggsn == '0'){
			isLayer(0);
		}else{
			$.toast('您已是节点，无需再次申请！');
		}
	})

	$('.leftassets>a').click(function(){
		location.href = 'payMethod.html?bind=2';
	})
	//退出登录
	$(document).on("click", ".outBtn", function() {
	    $.confirm("您确定要退出登录？", "确认删除?", function() {
	    	tokenVerification(outApi,{},function(data){
	    		if(data.code == 200){
	    			$.toast(data.msg, "text");
	    			localStorage.removeItem('userInfo');
					localStorage.removeItem('token');
					//即时通讯退出登录
//	    			var userName = localStorage.getItem('ecmUser'),
//	            		userToken = localStorage.getItem('ecmToken');
//	            	if(userName != null && userName != ''){
//	            		conn.close();
//	            		localStorage.removeItem('ecmToken');
//	            		localStorage.removeItem('ecmUser');
//	            	}
	    			setTimeout(function(){
	    				location.href = '../../login.html';
	    			},800)
	    		}
	    	})
	    }, function(e) {
	      location.reload();
	    });
	});
});
function userInfoFun(){
	tokenVerification(userInfoApi,{},function(data){
		if(data.code == 200){
			var obj = data.data;
			var userInfo = JSON.stringify(obj);
			localStorage.setItem('userInfo',userInfo)
			$('#account').text(obj.nickName);
			$('#unid').text(obj.uid);
			isBroke = obj.isLayer;
			isggsn = obj.userType;
			var imgSrc;
			if(obj.portrait == ''){
				imgSrc = '../../static/images/loginImg.png'
			}else{
				imgSrc = imgHost+obj.portrait;
			}
			if (!isBroke){
				$('#statistics').hide();
			}
			var userNode;
			switch (obj.userType){
				case '0':
					userNode = "普通用户"
					break;
				case '1':
					userNode = "支持节点"
					break;
				case '2':
					userNode = "主节点"
					break;
				case '3':
					userNode = "超级节点"
					break;
				default:
					break;
			}
			$('.superNode').text(userNode);
			$('#userHeader').attr('src',imgSrc);
			var bindTxt,startTxt;
			if(obj.isBindCollection == '1'){
				bindTxt = '已绑定';
			}else{
				bindTxt = '未绑定';
			}
			$('#ifBind').text(bindTxt);
			if(obj.pswState == '1'){//开启
				startTxt = '关闭';
				$('.closeBtn').attr('data-type','0');
			}else{//关闭
				startTxt = '开启';
				$('.closeBtn').attr('data-type','1');
			}
			$('.closeBtn').text(startTxt);
		}
	})
}

function isLayer(kindof){
	tokenVerification('/account/isLayerStatus',{
		type:kindof
	},function(data){
		if(data.code == 200){
			if(kindof == 1){
				location.href = 'distributor.html';
			}else if(kindof == 0){
				location.href = 'node.html';
			}

		}else{
			if(data.code == 202){
				if(kindof == 1){
					location.href = 'distributor.html';
				}else if(kindof == 0){
					location.href = 'node.html';
				}

			}
			if(data.code == 330){
				$.toast(data.msg)
			}
		}
	})
}
