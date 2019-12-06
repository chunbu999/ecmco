
$(function(){
	aboutList();
})

function aboutList(){
	tokenVerification(aboutApi,{},function(data){
		if(data.code == 200){
			$('.noticeDetail h3').text(data.data.title);
			var x = document.getElementsByClassName('content');
			x[0].innerHTML = data.data.content;
		}else{
			console.log(data)
		}
	})
}
