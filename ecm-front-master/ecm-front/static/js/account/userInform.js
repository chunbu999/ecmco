$(function(){
    window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	}
	userInfoFun();
	
	$('#weChatInput').change(function(){
		$.showLoading();
		var src = window.URL.createObjectURL(this.files[0]);
//		$('#uploaderFiles').empty();
//		$('#uploaderFiles').append('<img id="img01" class="weui-uploader__file" />');
//		
		$('.headerImg').attr('src',src);
		var fileObj = document.getElementById("weChatInput").files[0];
		var formFile = new FormData;
		formFile.append('file',fileObj);
		var data = formFile;
		$.ajax({
	    	type:"post",
	    	url:host+headerApi,
	    	data:data,
	    	dataType:'json',
	    	cache: false,//上传文件无需缓存
	        processData: false,//用于对data参数进行序列化处理 这里必须false
	        contentType: false, 
	        headers:{'token' : token},
	    	success:function(data){
	    		setTimeout(function() {
                    $.hideLoading();
                }, 800)
	    		if(data.code == 200){
	    			$.toast('上传成功','text');
	    		}else{
	    			$.toast(data.msg,'text');
	    		}
	    	}
	    });
	});
})
//获取个人信息
function userInfoFun(){
	tokenVerification(userInfoApi,{},function(data){
		if(data.code == 200){
			var obj = data.data;
			$('#nickName').text(obj.nickName);
			$('.uid').text(obj.uid);
			var imgSrc;
			if(obj.portrait == ''){
				imgSrc = '../../static/images/loginImg.png'
			}else{
				imgSrc = imgHost+obj.portrait;
			}
			$('.headerImg').attr('src',imgSrc);
		}
	})
}