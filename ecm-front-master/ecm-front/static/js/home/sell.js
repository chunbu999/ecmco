var pageSize = 12;
var pageNumber = 1;
var loading = false;
var dropDown = true;
var asset = GetQueryString().asset;
$(function(){
	if(asset){
		$('.assetTxt h2>span').text(asset);
	}else{
		$('.assetTxt h2>span').text('0');
	}
	assetsFun()
})

if(dropDown){
	dropDown = false;
	//=========================下拉刷新
   	$("#listBox").pullToRefresh().on("pull-to-refresh", function () {
       setTimeout(function () {
           pageNumber = 1;
           $("#sellList").html("");
           assetsFun();
           if (loading) loading = false;
           $("#listBox").pullToRefreshDone(); // 重置下拉刷新
       }, 1500);   //模拟延迟
   	});
   	//============================滚动加载
   	$("#listBox").infinite().on("infinite", function () {
       if (loading){
       	 return false;
       }
       loading = true;
       pageNumber++; //页数
       $('.weui-loadmore').show();
       setTimeout(function () {
           assetsFun();
           loading = false;
       }, 2500);   //模拟延迟
   	});
	var timerZX = setTimeout(function(){
		dropDown = true;
		clearTimeout(timerZX);
	},6000);
}

function assetsFun(){
	tokenVerification(assetApi,{
		type:1,
		pageSize:pageSize,
		pageNumber:pageNumber
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			var typeSay;
			if(obj.rows.length>0){
				for(var i = 0;i<obj.rows.length;i++){
					if(obj.rows[i].porm == '0'){
						typeSay = '+';
					}else{
						typeSay = '-';
					}
					var tpl = `
						<li>
							<p>`+ obj.rows[i].statusName +`</p>
							<p>`+ typeSay+obj.rows[i].money +`</p>
							<p>`+ (obj.rows[i].createDate).substring(0,16)+`</p>
						</li>
					`;
					$('#sellList').append(tpl);
				}
			}else{
				$(".assetRecord ul").append('<div class="weui-cells__title nodata" >已无更多数据</div>');
               	loading = true;
			}
			$(".weui-loadmore").hide();
		}else{
			$(".weui-loadmore").hide();         
            console.log(data);
		}
	})
}
