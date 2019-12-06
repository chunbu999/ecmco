$(function(){
	var bind = GetQueryString().bind;
	var ifMethod;
	if(bind && bind == 1){
		$('.weui-title').text('绑定支付宝');
		$('#alipay').text('确认绑定');
		$('#bindqrode').css('display','none');
		ifMethod="0"
	}else{
		$('.weui-title').text('支付宝');
		$('#alipay').text('保存');
		$('#bindqrode').css('display','block');
		ifMethod='1'
	}
	showFun(ifMethod);
})

function showFun(ifMethod){
	tokenVerification('/account/getCollection',{
		type:'0',
		status:0
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			if(obj != null && obj != ''){
				$('#alipayName').val(obj.name);
				$('#alipayName').attr('disabled',true);
				$('#alipayNo').val(obj.account)
				$('#alipayNo').attr('disabled',true);
				if(obj.urlCode == null && obj.urlCode == ''){
					$('#img01').attr('disabled',false);
					$('#uploaderFiles').empty();
					$('#realPositive').val('');
				}else{
					$('#uploaderFiles').append('<img id="img01" class="weui-uploader__file" />');
					$('#img01').attr('src',imgHost+obj.urlCode);
					$('#realPositive').val(imgHost+obj.urlCode);
				}
				$('#uploaderInput').attr('disabled',true);
			}
		}else{
			console.log(data)
		}
	})
}
