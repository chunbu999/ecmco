var pageSize = 10;
var pageNumber=1;
var loading = false;
var dropDown = true;
$(function(){
	apealFun();
	
})
if(dropDown){
	dropDown = false;
	//=========================下拉刷新
   	$("#tabtxt").pullToRefresh().on("pull-to-refresh", function () {
       	setTimeout(function () {
           	pageNumber = 1;
           	$('.recordList ul').html('');
           	apealFun();
           	if (loading) loading = false;
           	$("#tabtxt").pullToRefreshDone(); // 重置下拉刷新
       	}, 1500);   //模拟延迟
   	});
   	//============================滚动加载
   	$("#tabtxt").infinite().on("infinite", function () {
       if (loading){
       	 return false;
       }
       loading = true;
       pageNumber++; //页数
       $('.weui-loadmore').show();
       setTimeout(function () {
           apealFun();
           loading = false;
       }, 2500);   //模拟延迟
   	});
	var timerZX = setTimeout(function(){
		dropDown = true;
		clearTimeout(timerZX);
	},6000);
	
	$(document).on('click','#recodeLowd>li',function(){
		var id = $(this).attr('data-no')
		location.href = 'appelBox.html?appealId='+id
	})
}
function apealFun(){
	tokenVerification('/trading/getComplaintList',{
		pageNumber:pageNumber,
		pageSize:pageSize
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			$('.recordList>ul').empty();
			if(obj.rows.length>0){
				for(var i = 0;i<obj.rows.length;i++){
					var tpl = '<li data-no="'+ obj.rows[i].serialNo +'">'+
						'<div class="boxDiv">'+
							'<ul>'+
								'<li>申诉订单：'+ obj.rows[i].serialNo +'</li>'+
								'<li>申诉对象：'+ obj.rows[i].phone +'</li>'+
								'<li>申诉时间：'+ obj.rows[i].createDate +'</li>'+
								'<li>申诉结果：'+ (obj.rows[i].type == '0' ? '审核中' : '已完成') +'</li>'+
							'</ul>'+
						'</div>'+
					'</li>';
					$('.recordList>ul').append(tpl);
				}
			}else{
				$('.recordList>ul').append('<div class="weui-cells__title nodata" >已无更多数据</div>');
               	loading = true;
			}
			$(".weui-loadmore").hide();	
		}else{
			$(".weui-loadmore").hide();	
			console.log(data);
		}
	})
}
