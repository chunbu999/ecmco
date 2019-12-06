var code = GetQueryString().code;
$(function(){
	regioNum();
    if(code){
    	$('#inviteCode').val(code);
    	$('#inviteCode').attr('disabled',true);
    }
    
    //获取验证码
    $('#getCode').on('click',function(){
    	var istel = /^1\d{10}$/;
		if($('.addTxt>b').text() == null){
			$.toast('请选择区号!', "text");
			return;
		}
		if(!$('#loginTel').val()){
			$.toast('请输入手机号码!', "text");
			return;
		}
		if($('.addTxt>b').text() == '86'){
			if(!(istel.test($('#loginTel').val()))){
				$.toast('请输入11位的手机号码!', "text");
				return;
			}
		}
		sendFun()
	})
    //注册
    $('#loginBtn').click(function(){
    	if($('.addTxt>b').text() == null){
			$.toast('请选择区号!', "text");
			return;
		}
    	if(!$('#loginTel').val()){
			$.toast('请输入手机号码!', "text");
			return;
		}
    	if($('.addTxt>b').text() == '86'){
			if(!(istel.test($('#loginTel').val()))){
				$.toast('请输入11位的手机号码!', "text");
				return;
			}
		}
    	if(!$('#loginPwd').val()){
			$.toast('请输入登录密码!', "text");
			return;
		}
    	//验证密码
		var isPsd = /^[A-Za-z0-9]{6,16}$/;
    	if(!(isPsd.test($('#loginPwd').val()))){
			$.toast('请输入6-16位的登录密码!', "text");
			return;
		}
    	if(!$('#inviteCode').val()){
			$.toast('请输入邀请码!', "text");
			return;
		}
    	if(!$('#checkCode').val()){
			$.toast('请输入验证码!', "text");
			return;
		}
    	registerFun();
    })
})


//发送验证码
function sendFun(){
	var data = {
		phone:$('#loginTel').val(),
		areaCode:$('.addTxt>b').text(),
		type:$('.addTxt>b').attr('data-action')
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

function registerFun(){
	var data = {
		phone:$('#loginTel').val(),
		areaCode:$('.addTxt>b').text(),
		password:$('#loginPwd').val(),
		refereeCode:$('#inviteCode').val(),
		code:$('#checkCode').val(),
		area:$('.addTxt>b').attr('data-action')
	};
	publicInterface(registerApi,data,function(data){
		if(data.code == 200){
			$.toast(data.msg,'text');
			setTimeout(function(){
				location.href = 'https://fir.im/3eva';
			},600)
		}else{
			$.toast(data.msg,'text');
		}
	})
}
