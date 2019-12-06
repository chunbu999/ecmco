var id = GetQueryString().id;
$(function(){
	if(id){
		detailList(id)
	}
})

function detailList(id){
	tokenVerification(noticeDetailApi,{
		noticeId:id
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			$('.weui-title').text(obj.title);
			$('.noticeDetail p').text(obj.createTime);
			$('.content').text(obj.content);
		}
	})
}
