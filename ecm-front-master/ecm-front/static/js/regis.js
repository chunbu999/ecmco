var tel = GetQueryString().tel;
var pwd = GetQueryString().pwd;
var inviteCode = GetQueryString().inviteCode;
var areas = GetQueryString().areas;
var aread = GetQueryString().aread;
//var conn = {};
//console.log(WebIM, window.WebIM);
//WebIM.config = config;
//conn = WebIM.conn = new WebIM.default.connection({
//	appKey: WebIM.config.appkey,
//  isHttpDNS: WebIM.config.isHttpDNS,
//  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
//  host: WebIM.config.Host,
//  https: WebIM.config.https,
//  url: WebIM.config.xmppURL,
//  apiUrl: WebIM.config.apiURL,
//  isAutoLogin: false,
//  heartBeatWait: WebIM.config.heartBeatWait,
//  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
//  autoReconnectInterval: WebIM.config.autoReconnectInterval,
//  isStropheLog: WebIM.config.isStropheLog,
//  delivery: WebIM.config.delivery,
//})
$(function(){
	$('#register04').on('click',function(){
		if(!$('#checkCode').val()){
			$.toast('请输入验证码！','text');
			return;
		}
//		registerHuan();
		registerFun();
	})

	$('#getCode').on('click',function(){
		if(pwd && areas){
			//发送验证码
			sendFun();
		}
	})
})

//发送验证码
function sendFun(){
	var data = {
		phone:tel,
		areaCode:areas,
		type:aread
	};
	publicInterface(codeApi,data,function(data){
		if(data.code == 200){
			$.toast(data.msg,'text');
			var timerY = null, tn = 120;
			$('#getCode').attr('disabled',true);
			timerY = setInterval(function(){
				$('#getCode').val('重发验证码('+ tn +'s)');
				tn --;
				if(tn < 1){
					$('#getCode').val('重发验证码');
					$('#getCode').attr('disabled',false);
					clearInterval(timerY);
				}
			},1000);
		}else{
			$.toast(data.msg,'text');
		}

	})
}

//注册
function registerFun(){
	var data = {
		phone:tel,
		areaCode:areas,
		password:pwd,
		refereeCode:inviteCode,
		code:$('#checkCode').val(),
		area:aread
	};

	publicInterface(registerApi,data,function(data){
		if(data.code == 200){
			$.toast(data.msg,'text');
			//即时通讯注册
//			registerHuan();
			setTimeout(function(){
				location.href = "login.html";
			},600)
		}else{
			$.toast(data.msg,'text');
		}
	})
}


//function registerHuan(){
//	console.log(WebIM.config.appkey)
//	var option = {
//     	username: tel,
//     	password: '654321',
//     	appKey: WebIM.config.appkey,
//     	success: function () {
//         console.log('注册成功');
//     	},
//     	error: function () {
//         console.log('注册失败');
//     	},
//     	apiUrl: WebIM.config.apiURL
// };
// conn.signup(option);
//}
