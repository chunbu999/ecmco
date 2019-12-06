var userInfo = JSON.parse(localStorage.getItem('userInfo'));
$(function(){
	
	//发送验证码
	$('#getCode').click(function(){
		if(userInfo){
			//发送验证码
			sendFun();
		}
	})
	//修改登录密码
	$('#updataBtn').click(function(){
		if(!$('#uploginpwd').val()){
			$.toast('请输入新密码!',"text");
			return;
		}
		if(!(isPsd.test($('#uploginpwd').val()))){
			$.toast('请输入6-16位的登录密码！', "text");
			return;
		}
		if(!$('#newpwd').val()){
			$.toast('请输入确认新密码!',"text");
			return;
		}
		if(!(isPsd.test($('#newpwd').val()))){
			$.toast('请输入6-16位的确认登录密码！', "text");
			return;
		}
		if($('#uploginpwd').val() != $('#newpwd').val()){
			$.toast('两次密码输入不一致!', "text");
			return;
		}
		if(!$('#loginver').val()){
			$.toast('请输入验证码!',"text");
			return;
		}
		upadtaFun();
	})
})

//发送验证码
function sendFun(){
	var data = {
		phone:userInfo.phone,
		type:userInfo.area
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

//修改登录密码
function upadtaFun(){
	tokenVerification(updatepwdApi,{
		password:$('#uploginpwd').val(),
		code:$('#loginver').val()
	},function(data){
		if(data.code == 200){
			$.toast(data.msg);
			localStorage.removeItem('userInfo');
			localStorage.removeItem('token');
			setTimeout(function(){
				location.href="../../login.html";
			},500);
		}else{
			$.toast(data.msg,'text');
		}
	})
}
