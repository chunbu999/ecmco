var tel = GetQueryString().tel;
var pwd = GetQueryString().pwd;
var areas = GetQueryString().areas;
var aread = GetQueryString().aread;
$(function(){
	//选择区号
	regioNum();
	$('#forget01').click(function(){
		var istel = /^1\d{10}$/;
		if($('.addTxt>b').text() == null){
			$.toast('请选择区号!', "text");
			return;
		}
		if(!$('#forgetTel').val()){
			$.toast('请输入手机号码!', "text");
			return;
		}
		if($('.addTxt>b').text() == '86'){
			if(!(istel.test($('#forgetTel').val()))){
				$.toast('请输入11位的手机号码!', "text");
				return;
			}
		}
		
		var tel = $('#forgetTel').val();
		var areas = $('.addTxt>b').text();
		var areads = $('.addTxt>b').attr('data-action');
		location.href = 'forgetpwd.html?tel='+tel+"&areas="+areas+"&aread="+areads;
	})
	
	$('#forget02').click(function(){
		var isPsd = /^[A-Za-z0-9]{6,16}$/;
		if(!($('#forgetPwd').val())){
			$.toast('请输入新密码!',"text");
			return;
		}
		if(!(isPsd.test($('#forgetPwd').val()))){
			$.toast('请输入6-16位的新密码！', "text");
			return;
		}
		if(!($('#forgetPwds').val())){
			$.toast('请输入确认新密码!',"text");
			return;
		}
		if(!(isPsd.test($('#forgetPwds').val()))){
			$.toast('请输入6-16位的确认新密码！', "text");
			return;
		}
		if($('#forgetPwd').val() != $('#forgetPwds').val()){
			$.toast('两次密码输入不一致!', "text");
			return;
		}
		
		var pwd = $('#forgetPwd').val();
		location.href = 'forgetcode.html?tel='+tel+"&areas="+areas+"&aread="+aread+'&pwd='+ pwd;
	})
	
	$('#fogetBtn03').on('click',function(){
		if(!$('#forgetver').val()){
			$.toast('请输入验证码！', "text");
			return;
		}
		var data = {
			phone:tel,
			areaCode:areas,
			code:$('#forgetver').val(),
			password:pwd
		};
		publicInterface(forgetpwdApi,data,function(data){
			if(data.code == 200){
				$.toast(data.msg,'text');
				setTimeout(function(){
					location.href = 'login.html';
				},700)
			}else{
				$.toast(data.msg,'text')
			}
			
		})
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
