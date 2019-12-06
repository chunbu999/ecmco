$(function(){
	var bind = GetQueryString().bind;
	var ifMethod;
	if(bind && bind == 1){
		$('.weui-title').text('绑定微信');
		$('#weChatBtn').text('确认绑定');
		$('#bindqrode').css('display','none');
		ifMethod = '0'
	}else{
		$('.weui-title').text('微信');
		$('#weChatBtn').text('保存');
		$('#bindqrode').css('display','block');
		ifMethod = '1'
	}
	showFun(ifMethod)
})
 
function showFun(){
	tokenVerification('/account/getCollection',{
		type:'1',
		status:0
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			if(obj != null && obj != ''){
				$('#weChatName').val(obj.name);
				$('#weChatName').attr('disabled',true);
				$('#weChatNo').val(obj.account);
				$('#weChatNo').attr('disabled',true);
				if(typeof obj.urlCode == '' && typeof obj.urlCode == null){
					$('#weChatImg').empty();
					$('#weChat').val('');
				}else{
					$('#weChatImg').append('<img id="img02" class="weui-uploader__file" />');
					$('#img02').attr('src',imgHost+obj.urlCode);
					$('#weChat').val(imgHost+obj.urlCode);
				}
				$('#weChatInput').attr('disabled',true);
			}
		}else{
			console.log(data)
		}
	})
}