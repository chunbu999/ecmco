$(function(){
	$('.mybgBtn').click(function(){
		if(!$('#orderNo').val()){
			$.toast('请输入申诉订单','text');
			return;
		}
		if(!$('#orderName').val()){
			$.toast('请输入申诉对象','text');
			return;
		}
		apealList();
	})
	
	//图片上传
	$('#uploaderInput').change(function(){
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
})

function apealList(){
	var datas = {
		phone:$('#orderName').val(),
		content:$('#contentTxt').val(),
		url:$('#realPositive').val(),
		serialNo:$('#orderNo').val()
	};
	tokenVerification('/trading/submitComplaint',datas,function(data){
		if(data.code == 200){
			$.toast(data.msg);
			setTimeout(function(){
				location.href = 'appealRecord.html';
			},700)
		}else{
			$.toast(data.msg,'text');
			console.log(data);
		}
	})
}
