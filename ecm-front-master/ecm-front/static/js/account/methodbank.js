
$(function(){
	var bind = GetQueryString().bind;
	var ifMethod;
	if(bind && bind == 1){
		$('.weui-title').text('绑定银行卡');
		$('#bankBtn').text('确认绑定');
		ifMethod = '0'
	}else{
		$('.weui-title').text('银行卡');
		$('#bankBtn').text('保存');
		ifMethod = '1'
	}
	showFun(ifMethod)
})

function showFun(ifMethod){
	tokenVerification('/account/getCollection',{
		type:'2',
		status:0
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			if(obj != null && obj != ''){
				$('#bankName').val(obj.name);
				$('#bankName').attr('disabled',true);
				$('#bankNo').val(obj.bankNum);
				$('#bankNo').attr('disabled',true);
				$('#bankType').val(obj.bankName);
				$('#bankType').attr('disabled',true);
				$('#bankAddress').val(obj.address);
				$('#bankAddress').attr('disabled',true);
			}		
		}else{
			console.log(data)
		}
	})
}