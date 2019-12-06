$(function(){
	$('.mybgBtn').click(function(){
		if(!$('.weui-input').val()){
			$.toast('请输入昵称！','text');
			return false;
		}
		tokenVerification('/account/editNickName',{
			nickName:$('.weui-input').val()
		},function(data){
			if(data.code == 200){
				$.toast(data.msg,600);
				setTimeout(function(){
					window.history.back(-1);
				},650)
			}else{
				console.log(data);
				$.toast(data.msg,'text')
			}
		})
	})
})
