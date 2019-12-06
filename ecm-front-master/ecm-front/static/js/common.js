//修改登录密码
var updatepwdApi = '/account/editPassword';
//修改交易密码
var updatetradeApi = '/account/editPayPassword';
//退出登录
var outApi = '/index/outLogin';
//获取个人信息
var userInfoApi = '/person/getUserInfo';
//我的社群
var communityApi = '/person/myCommunity';
//资产池
var assetApi = '/person/getUserRunningWaterList';
//关于我们
var aboutApi = '/account/getAboutUs';
//公告列表
var noticeApi = '/account/getNotice';
//公告详情
var noticeDetailApi = '/account/getNoticeDetail';
//获取协议
var agreementApi = '/account/getAgreement';
//经销商申请
var referApi = '/account/referApply';
//资产转账
var tranferApi = '/account/transfer';
//获取前三排名
var rankingApi = '/account/getTopThree';
//获取排行榜
var topApi = '/account/getTopList';
//绑定支付方式
var methodApi = '/account/bindPay';
//上传头像
var headerApi = '/account/uploadPortrait';
//修改昵称
var nickApi = '/account/editNickName';

//验证手机号
var istel = /^1\d{10}$/;
//验证密码
var isPsd = /^[A-Za-z0-9]{6,16}$/;
//验证姓名
var isName = /^[\u4e00-\u9fa5·A-z]+$/;
//验证身份证
var isCard = /^[0-9]{6}([1]|[2]){1}[0-9]{1}[0-9]{2}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}[0-9]{3}[0-9Xx]{1}$/;
//验证银行卡号
var isBank = /^([1-9]{1})(\d{14}|\d{18})$/;
//验证字母和数字
var isLetter = /^[A-Za-z0-9]+$/;


function GetQueryString(){
	var url = window.location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
	    var str = url.substr(1);
	    strs = str.split("&");
	    for(var i = 0; i < strs.length; i ++) {
	    	theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);     
	    }
  	}
  	return theRequest;
}

//验证token信息
var token = localStorage.getItem('token');
function tokenVerification(url,data,callbackFunc){
	$.ajax({
		type:"post",
		url:host+url,
		data:data,
		dataType:'json',
		timeout:20000,
		headers:{'token' : token},
		success: function (data) {
			return callbackFunc(data);
	    },
	    error:function(xhr,type,errorThrown){
			console.log(xhr.statusText);
			console.log("错误提示了："+ xhr.status +" ");
			if(xhr.status == 322){
				$.toast('请先登录！');
				localStorage.removeItem('token');
				localStorage.removeItem('userInfo');
				localStorage.removeItem('ecmToken');
	            localStorage.removeItem('ecmUser');
				location.href = '/login.html';
				
			}else if(xhr.status == 321){
				$.toast('账号已被封禁！');
				localStorage.removeItem('token');
				localStorage.removeItem('userInfo');
				location.href = '/login.html';
			}
			$.hideLoading();
		}
	})
}


//获取协议
function argumentsFun(url,data,callbackFunc){
	$.ajax({
		type:"post",
		url:host+url,
		data:data,
		dataType:'json',
		timeout:60000,
		headers:{'token' : token},
		success: function (data) {
			return callbackFunc(data);
	    },
	    error:function(xhr,type,errorThrown){
			console.log(xhr.statusText);
			console.log("错误提示了："+ xhr.status +" ");
			if(xhr.status == 403){
				alert('请先登录！')
				localStorage.removeItem('token');
				location.href = 'login.html';
			}
		}
	})
}


//上传图片
function uploadImg(data,callbackFunc){
	$.ajax({
    	type:"post",
    	url:host+"/index/addPhoto",
    	data:data,
    	dataType:'json',
    	cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, 
    	success:function(data){
    		setTimeout(function() {
                $.hideLoading();
            }, 800)
    		if(data.code == 200){
    			$.toast('上传成功');
    			var dataUrl = data.data.src;
    			return callbackFunc(dataUrl);
    		}else{
    			alert(data.msg);
    		}
    	}
    });
}
/**
 * 判断是否是iphonex
 */
function getIsIphonex () {
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
        if (screen.height == 812 && screen.width == 375) {
          	//$('.weui-tabbar__item').css('padding','2px 0 0 0');
          	$('.tabs-bottom>.weui-tabbar__item').css('padding','2px 0 0 0');
        	$('.weui-tabbar').css('padding-bottom','10px')
            return true;
        }else {
            return false;
		}
    }
};
//conn.listen({
//  onOpened: function ( message ) {          //连接成功回调
//      // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
//      // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
//      // 则无需调用conn.setPresence();             
//  },  
//  onClosed: function ( message ) {},         //连接关闭回调
//  onTextMessage: function ( message ) {},    //收到文本消息
//  onEmojiMessage: function ( message ) {},   //收到表情消息
//  onPictureMessage: function ( message ) {}, //收到图片消息
//  onCmdMessage: function ( message ) {},     //收到命令消息
//  onAudioMessage: function ( message ) {},   //收到音频消息
//  onLocationMessage: function ( message ) {},//收到位置消息
//  onFileMessage: function ( message ) {},    //收到文件消息
//  onVideoMessage: function (message) {
//      var node = document.getElementById('privateVideo');
//      var option = {
//          url: message.url,
//          headers: {
//            'Accept': 'audio/mp4'
//          },
//          onFileDownloadComplete: function (response) {
//              var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
//              node.src = objectURL;
//          },
//          onFileDownloadError: function () {
//              console.log('File down load error.')
//          }
//      };
//      WebIM.utils.download.call(conn, option);
//  },   //收到视频消息
//  onPresence: function ( message ) {},       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
//  onRoster: function ( message ) {},         //处理好友申请
//  onInviteMessage: function ( message ) {},  //处理群组邀请
//  onOnline: function () {},                  //本机网络连接成功
//  onOffline: function () {},                 //本机网络掉线
//  onError: function ( message ) {},          //失败回调
//  onBlacklistUpdate: function (list) {       //黑名单变动
//      // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
//      console.log(list);
//  },
//  onReceivedMessage: function(message){},    //收到消息送达服务器回执
//  onDeliveredMessage: function(message){},   //收到消息送达客户端回执
//  onReadMessage: function(message){},        //收到消息已读回执
//  onCreateGroup: function(message){},        //创建群组成功回执（需调用createGroupNew）
//  onMutedMessage: function(message){}        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
//});