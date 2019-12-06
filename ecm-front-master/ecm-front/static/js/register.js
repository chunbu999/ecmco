var tel = GetQueryString().tel;
var pwd = GetQueryString().pwd;
var areas = GetQueryString().areas;
var aread = GetQueryString().aread;
$(function(){
	//选择区号
	regioNum();
	$('#register01').click(function(){
		var istel = /^1\d{10}$/;
		if($('.addTxt>b').text() == null){
			$.toast('请选择区号!', "text");
			return;
		}
		if(!$('#registerTel').val()){
			$.toast('请输入手机号码!', "text");
			return;
		}
		if($('.addTxt>b').text() == '86'){
			if(!(istel.test($('#registerTel').val()))){
				$.toast('请输入11位手机号码!', "text");
				return;
			}
		}
		
		var tel = $('#registerTel').val();
		var areas = $('.addTxt>b').text();
		var areads = $('.addTxt>b').attr('data-action');
		location.href = 'registerpwd.html?tel='+tel+"&areas="+areas+"&aread="+areads;
	})
	
	$('#register02').click(function(){
//		var isPsd = /^[A-Za-z0-9]{6,16}$/;
		if(!($('#registerPwd').val())){
			$.toast('请输入登录密码!',"text");
			return;
		}
		if(!($('#registerPwds').val())){
			$.toast('请输入确认登录密码!',"text");
			return;
		}
		if(!(isPsd.test($('#registerPwd').val()))){
			$.toast('请输入6-16位登录密码！', "text");
			return;
		}
		if(!(isPsd.test($('#registerPwds').val()))){
			$.toast('请输入6-16位确认登录密码！', "text");
			return;
		}
		if($('#registerPwd').val() != $('#registerPwds').val()){
			$.toast('两次密码输入不一致!', "text");
			return;
		}
		
		var pwd = $('#registerPwd').val();
		location.href = 'registerinvite.html?tel='+tel+"&areas="+areas+"&aread="+aread+'&pwd='+ pwd;
	})
	
	$('#register03').on('click',function(){
		if(!$('#registerinvite').val()){
			$.toast('请输入邀请码！', "text");
			return;
		}
		var inviteCode = $('#registerinvite').val();
		location.href = 'registercode.html?tel='+tel+"&areas="+areas+"&aread="+aread+'&pwd='+pwd+'&inviteCode='+inviteCode;
	})
})

