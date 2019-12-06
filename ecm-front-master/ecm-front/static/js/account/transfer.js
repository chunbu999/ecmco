$(function(){
	$('#sureBtn').click(function(){
		if(!$('#userTel').val()){
    		$.toast("请输入对方手机号！", 'text');
    		return;
    	}
		if(!(istel.test($('#userTel').val()))){
			$.toast("请输入正确的手机号码！", 'text');
			return;
		}
		if(!$('#tranferNo').val()){
    		$.toast("请输入划转数量！", 'text');
    		return;
    	}
		if(!$('#tranferPwd').val()){
    		$.toast("请输入交易密码！", 'text');
    		return;
    	}
		tranferFun()
	})
})


function tranferFun(){
	tokenVerification(tranferApi,{
		phone:$('#userTel').val(),
		number:$('#tranferNo').val(),
		payPassword:$('#tranferPwd').val()
	},function(data){
		if(data.code == 200){
			$.toast(data.msg);
			var timers = setInterval(function(){
				location.reload();
				clearInterval(timers);
			},600)
		}else{
			$.toast(data.msg, 'text');
		}
	})
}
