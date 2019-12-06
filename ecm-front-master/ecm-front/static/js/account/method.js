var bind = GetQueryString().bind;
var ifMethod;
$(function(){
	if(bind == '1'){
		ifMethod = '0'
	}else{
		ifMethod = '1'
	}
    //支付宝
	$('#uploaderInput').change(function(){
		$.showLoading();
		var src = window.URL.createObjectURL(this.files[0]);
		$('#uploaderFiles').empty();
		$('#uploaderFiles').append('<img id="img01" class="weui-uploader__file" />');

		$('#img01').attr('src',src);
		var fileObj = document.getElementById("uploaderInput").files[0];
		var formFile = new FormData;
		formFile.append('file',fileObj);
		var data = formFile;
		uploadImg(data,function(data){
			$('#realPositive').val(data);
		})
	});
	//微信
	$('#weChatInput').change(function(){
		$.showLoading();
		var src = window.URL.createObjectURL(this.files[0]);
		$('#weChatImg').empty();
		$('#weChatImg').append('<img id="img02" class="weui-uploader__file" />');

		$('#img02').attr('src',src);
		var fileObj = document.getElementById("weChatInput").files[0];
		var formFile = new FormData;
		formFile.append('file',fileObj);
		var data = formFile;
		uploadImg(data,function(data){
			$('#weChat').val(data);
		})
	});
	//绑定支付宝
	$('#alipay').click(function(){
		if(!$('#alipayName').val()){
			$.toast('请输入您的姓名','text');
			return;
		}
		if(!$('#alipayNo').val()){
			$.toast('请输入您的账号','text');
			return;
		}
		var qorode;
		if(bind == 1){
			qorode = "";
		}else{
			if(!$('#realPositive').val()){
				$.toast('请上传二维码','text');
				return;
			}
			qorode = $('#realPositive').val()
		}

		var list = {
			name:$('#alipayName').val(),
			type:0,
			account:$('#alipayNo').val(),
			urlCode:qorode,
			status:0
		};
		$('#alipay').attr('disabled',true);
		bindAply(list);
	});
	//绑定微信
	$('#weChatBtn').click(function(){
		if(!$('#weChatName').val()){
			$.toast('请输入您的姓名','text');
			return;
		}
		if(!$('#weChatNo').val()){
			$.toast('请输入您的账号','text');
			return;
		}
		var qorodes;
		if(bind == 1){
			qorodes = "";
		}else{
			if(!$('#weChat').val()){
				$.toast('请上传二维码','text');
				return;
			}
			qorodes = $('#weChat').val()
		}

		var list = {
			name:$('#weChatName').val(),
			type:1,
			account:$('#weChatNo').val(),
			urlCode:qorodes,
			status:0
		};
		$('#weChatBtn').attr('disabled',true);
		bindAply(list);
	})
	//绑定银行卡
	$('#bankBtn').click(function(){
		if(!$('#bankName').val()){
			$.toast('请输入您的姓名','text');
			return;
		}
		if(!$('#bankNo').val()){
			$.toast('请输入银行卡号','text');
			return;
		}
		if(!$('#bankType').val()){
			$.toast('请输入开户银行','text');
			return;
		}
		var list = {
			name:$('#bankName').val(),
			type:2,
			bankNum:$('#bankNo').val(),
			bankName:$('#bankType').val(),
			address:$('#bankAddress').val(),
			status:0
		};
		$('#bankBtn').attr('disabled',true);
		bindAply(list);
	});

	//绑定USDT
	$('#bindBtn').click(function(){
		if(!$('#usdtaddr').val()){
			$.toast('请输入usdt','text');
			return;
		}
		var qorodes;
		if(bind == 1){
			qorodes = "";
		}else{
			if(!$('#weChat').val()){
				$.toast('请上传二维码','text');
				return;
			}
			qorodes = $('#weChat').val();
		}
		var list = {
			type:3,
			account:$('#usdtaddr').val(),
			urlCode:qorodes,
			status:0
		};
		$('#bankBtn').attr('disabled',true);
		bindAply(list);
	});
});

function bindAply(list){
	tokenVerification(methodApi,list,function(data){
		if(data.code == 200){
			$.toast(data.msg,'text');
			setTimeout(function(){
				location.reload();
			},800)
		}else{
			$.toast(data.msg,'text');
			$('#alipay').attr('disabled',false);
			$('#weChatBtn').attr('disabled',false);
			$('#bankBtn').attr('disabled',false);
			$('#bindBtn').attr('disabled',false);
		}
	})
}
