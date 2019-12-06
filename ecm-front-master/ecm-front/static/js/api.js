
var imgHost = 'http://chenmk.cn';

// var shareLink = 'http://47.110.10.107';
// var host = 'http://47.110.10.107:8080/api';


 var shareLink = 'http://localhost';
 var host = 'http://localhost:8080/api';

// var shareLink = 'http://58.82.235.22:81';
// var host = 'http://58.82.235.22:8081/api';

//区号
var areaApi = '/index/getAreaCode';
//发送验证码
var codeApi = '/index/sendCode';
//注册
var registerApi = '/index/register';
//登录
var loginApi = '/index/login';
//忘记密码
var forgetpwdApi = '/index/forgetPassword';
//服务器和本地时间的时间差
var utc = 0;
//接口回调函数
function publicInterface(url,data,callbackFunc){
	$.ajax({
	    type: "post",
	    dataType: 'json',
	    url: host + url,
	    timeout:20000,
	    data: data,
		success: function (data) {
			return callbackFunc(data);
	    },
	    error:function(xhr,type,errorThrown){
			console.log(xhr.statusText);
			console.log("错误提示了："+ xhr.status +" ");
		}
	})
}
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

$(function(){
	$('#returnBtn a').click(function(){
		window.history.back(-1);
	})
})
//获取区号
function regioNum(){
	publicInterface(areaApi,{},function(data){
		if(data.code == 200){
			var obj = data.data;
			var v_arry = [];
    		if(obj.length>0){
    			$('.addTxt>b').text(obj[0].areaCode);
				$('.addTxt>b').attr('data-action',obj[0].type)
				for (var i = 0; i < obj.length; i++) {
					var v_data = {
		                label : obj[i].areaCode,
		                value : {
		                	id:obj[i].type,
		                	npc:obj[i].areaCode
		                }
		           };
					v_arry.push(v_data);

					$('#showPicker').on('click', function () {
				        weui.picker(v_arry, {
				            onChange: function (result) {

				            },
				            onConfirm: function (result) {
				                $('.addTxt>b').text(result[0].npc);
				                $('.addTxt>b').attr('data-action',result[0].id)
				            }
				        });
				    });
				}

    		}

		}
	})
}
