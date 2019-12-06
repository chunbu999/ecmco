var userInfo = JSON.parse(localStorage.getItem('userInfo'));
$(function(){

	//修改交易密码
	$('#tradeBtn').on('click',function(){
		if(!$('#tradepwd').val()){
			$.toast('请输入密码','text');
			return;
		}
		if($('#tradepwd').val().length < 6 || $('#tradepwd').val().length >6){
			$.toast('请输入6位的交易密码！','text');
			return;
		}
		if(!(/^\d+$/).test($('#tradepwd').val())){
			$.toast('请输入6位的数字交易密码！','text');
			return;
		}
		if(!$('#tradepwds').val()){
			$.toast('请输入确认密码','text');
			return;
		}
		if($('#tradepwds').val().length < 6 || $('#tradepwds').val().length >6){
			$.toast('请输入6位的确认交易密码！','text');
			return;
		}
		if(!(/^\d+$/).test($('#tradepwds').val())){
			$.toast('请输入6位确认的数字交易密码！','text');
			return;
		}
		if($('#tradepwd').val() != $('#tradepwds').val()){
			$.toast('两次密码输入不一致!', "text");
			return;
		}
		if(!$('#tradever').val()){
			$.toast('请输入验证码','text');
			return;
		}
		//修改交易密码
		upatetrader();
	})
	
	
	$('#getCode').on('click',function(){
		if(userInfo){
			sendInform();
		}
	})
	
})
//修改交易密码
function upatetrader(){
	var data ={
		payPassword:$('#tradepwd').val(),
		code:$('#tradever').val()
	};
	tokenVerification(updatetradeApi,data,function(data){
		if(data.code == 200){
			$.toast(data.msg);
			setTimeout(function(){
				window.history.back(-1);
			},1000)
		}else{
			$.toast(data.msg,'text')
		}
	})
}

//发送验证码
function sendInform(){
	tokenVerification(codeApi,{
		phone:userInfo.phone,
		type:userInfo.area
	},function(data){
		if(data.code == 200){
			$.toast(data.msg);
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
			$.toast(data.msg,'text')
		}
	})
}
