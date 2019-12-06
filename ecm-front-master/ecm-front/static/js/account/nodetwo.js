$(function(){
	gropFun();
	$('#nodeBtn').on('click',function(){
    	if(!$('#nodeName').val()){
    		$.toast("请输入姓名！", 'text');
    		return;
    	}
    	if(!$('#nodeNo').val()){
			$.toast("请输入身份证号！", 'text');
			return;
		}
    	if(!(isCard.test($('#nodeNo').val()))){
			$.toast("请输入18位的身份证号！", 'text');
			return;
		}
    	if(!$('#nodetel').val()){
    		$.toast("请输入手机号码！", 'text');
    		return;
    	}
    	if(!(istel.test($('#nodetel').val()))){
			$.toast("请输入11位的手机号码！", 'text');
			return;
		}
    	if(!$('#nodeChat').val()){
    		$.toast("请输入微信号码！", 'text');
    		return;
    	}
    	if(!(isLetter.test($('#nodeChat').val()))){
			$.toast("请输入正确的微信号码！", 'text');
			return;
		}
		var checklist = document.getElementById('checklist');
		if(!checklist.checked){
			$.toast('请先勾选用户协议！', 'text');
			return;
		}
		referFun();
    })
})

function gropFun(){
	tokenVerification('/account/getImmediately',{},function(data){
		if(data.code == 200){
			$('.grop').text(data.data.number)
		}else{
			console.log(data);
		}
	})
}
function referFun(){
	tokenVerification(referApi,{
		name:$('#nodeName').val(),
		phone:$('#nodetel').val(),
		idCard:$('#nodeNo').val(),
		wechart:$('#nodeChat').val(),
		type:0
	},function(data){
		if(data.code == 200){
			$.toast(data.msg);
			setTimeout(function(){
				location.href = 'acount.html';
			},800)
		}else{
			$.toast(data.msg, 'text');
		}
	})
}
