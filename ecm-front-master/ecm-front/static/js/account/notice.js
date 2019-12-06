var pageSize = 10;
var pageNumber = 1;
var loading = false;
var dropDown = true;
$(function(){
	noticeList();
	
//	if(dropDown){
//		dropDown = false;
		//=========================下拉刷新
	   	$(".myAssets").pullToRefresh().on("pull-to-refresh", function () {
	       setTimeout(function () {
	           pageNumber = 1;
	           $('#thressMethod>div').html("");
	           noticeList();
	           if (loading) loading = false;
	           $(".myAssets").pullToRefreshDone(); // 重置下拉刷新
	       }, 1500);   //模拟延迟
	   	});
	   	//============================滚动加载
	   	$(".myAssets").infinite().on("infinite", function () {
	       if (loading){
	       	 return false;
	       }
	       loading = true;
	       pageNumber++; //页数
	       $('.weui-loadmore').show();
	       setTimeout(function () {
	           noticeList();
	           loading = false;
	       }, 2500);   //模拟延迟
	   	});
//		var timerZX = setTimeout(function(){
//			dropDown = true;
//			clearTimeout(timerZX);
//		},600);
//	}

	
})
function noticeList(){
	tokenVerification(noticeApi,{
		pageSize:pageSize,
		pageNumber:pageNumber
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			if(obj.rows.length>0){
				for(var i = 0;i<obj.rows.length;i++){
					var tpl = `
						<a data-id=`+ obj.rows[i].noticeId +` class="weui-cell weui-cell_access weui-cell_example">
					    	<div class="weui-cell__bd weui-cell_primary">
					        	<div class="noContent">
					        		<h4 class="weui-media-box__title">`+ obj.rows[i].title +`</h4>
					        		<p class="weui-media-box__desc">`+ obj.rows[i].content +`</p>
					        	</div>
					        	<div class="time">`+ obj.rows[i].createTime +`</div>
					    	</div>
					    </a>
					`;
					$('#thressMethod>div').append(tpl);
				}
			}else{
				$('#thressMethod>div').append('<div class="weui-cells__title nodata" >已无更多数据</div>');
               	loading = true;
//				$('#thressMethod>div').append('<p class="nodata>暂无数据</p>')
			}
			$(".weui-loadmore").hide();
		}else{
			$(".weui-loadmore").hide();         
		}
	})
}

$(document).on('click','.weui-panel__bd a',function(){
	var id = $(this).attr('data-id');
	location.href = 'noticeDetail.html?id='+id;
})
