var tokens = localStorage.getItem('token');
if(tokens != null && tokens != ''){
	location.href = 'template/home/index.html'
}

$(function(){
	//选择区号
	$('#loginTel').val('');
	$('#loginPwd').val('');
	regioNum();
    $('#loginBtn').on('click',function(){
    	if(!$('#loginTel').val()){
    		$.toast("请输入手机号码！", 'text');
    		return;
    	}
    	var istel = /^1\d{10}$/;
    	if($('.addTxt>b').text() == '86'){
			if(!(istel.test($('#loginTel').val()))){
				$.toast("请输入11位的手机号码！", 'text');
				return;
			}
		}
    	if(!$('#loginPwd').val()){
    		$.toast("请输入密码！", 'text');
    		return;
    	}
    	var isPsd = /^[A-Za-z0-9]{6,16}$/;
		if(!(isPsd.test($('#loginPwd').val()))){
			$.toast("请输入6-16位的密码！", 'text');
			return;
		}
		
		loginFun();
    })
});

function loginFun(){
	var data = {
		phone:$('#loginTel').val(),
		areaCode:$('.addTxt>b').text(),
		password:$('#loginPwd').val()
	};
	
	publicInterface(loginApi,data,function(data){
		if(data.code == 200){
			$.toast('登录成功！','text');
			localStorage.setItem('token',data.data.token);
			setTimeout(function(){
				location.href = 'template/home/index.html';
			},600)			
		}else{
			$.toast(data.msg,'text');
		}
	})
}
