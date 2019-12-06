var pageSize = 10;
var pageNumber = 1;
var loading = false;
var dropDown = true;
var type = GetQueryString().type;
var id = GetQueryString().id;
$(function(){
	if(type && type == 0){
		$('.weui-title').text('主节点排行榜')
	}else{
		$('.weui-title').text('超级节点排行榜')
	}
	rankList();
})


if(dropDown){
	dropDown = false;
	//=========================下拉刷新
   	$("#tab1").pullToRefresh().on("pull-to-refresh", function () {
       	setTimeout(function () {
           	pageNumber = 1;
           	$('.ranking>ul').html('');
			$('.rankList>ul').html('');
           	rankList();
           	if (loading) loading = false;
           	$("#tab1").pullToRefreshDone(); // 重置下拉刷新
       	}, 1500);   //模拟延迟
   	});
   	//============================滚动加载
   	$("#tab1").infinite().on("infinite", function () {
       if (loading){
       	 return false;
       }
       loading = true;
       pageNumber++; //页数
       $('.weui-loadmore').show();
       setTimeout(function () {
           rankList();
           loading = false;
       }, 2500);   //模拟延迟
   	});
	var timerZX = setTimeout(function(){
		dropDown = true;
		clearTimeout(timerZX);
	},6000);
}



//获取排名
function rankList(){
	var datas = {
		type:type,
		pageSize:pageSize,
		pageNumber:pageNumber,
		voteActivityId:id
	};
	tokenVerification('/vote/getRanking',datas,function(data){
		if(data.code == 200){
			var obj = data.data;
			if(pageNumber == 1){
				if(obj.rows.length>0){
					if(obj.rows.length == 1){
						var npc = `
							<li>
								<img src="../../static/images/yajun.png" />
								<div class="brandtxt">
									<p class="names">暂无数据</p>
								</div>
							</li>
							<li>
								<img src="../../static/images/guanjun.png" />
								<div class="brandtxt">
									<p>`+ obj.rows[0].phone +`</p>
									<p><span>`+ obj.rows[0].num +`</span> 票</p>
								</div>
							</li>
							<li>
								<img src="../../static/images/jijun.png" />
								<div class="brandtxt">
									<p class="names">暂无数据</p>
								</div>
							</li>
						`;
					}else if(obj.rows.length == 2){
						var npc = `
							<li>
								<img src="../../static/images/yajun.png" />
								<div class="brandtxt">
									<p>`+ obj.rows[1].phone +`</p>
									<p><span>`+ obj.rows[1].num +`</span> 票</p>
								</div>
							</li>
							<li>
								<img src="../../static/images/guanjun.png" />
								<div class="brandtxt">
									<p>`+ obj.rows[0].phone +`</p>
									<p><span>`+ obj.rows[0].num +`</span> 票</p>
								</div>
							</li>
							<li>
								<img src="../../static/images/jijun.png" />
								<div class="brandtxt">
									<p class="names">暂无数据</p>
								</div>
							</li>
						`;
					}else{
						var npc = `
							<li>
								<img src="../../static/images/yajun.png" />
								<div class="brandtxt">
									<p>`+ obj.rows[1].phone +`</p>
									<p><span>`+ obj.rows[1].num +`</span> 票</p>
								</div>
							</li>
							<li>
								<img src="../../static/images/guanjun.png" />
								<div class="brandtxt">
									<p>`+ obj.rows[0].phone +`</p>
									<p><span>`+ obj.rows[0].num +`</span> 票</p>
								</div>
							</li>
							<li>
								<img src="../../static/images/jijun.png" />
								<div class="brandtxt">
									<p>`+ obj.rows[2].phone +`</p>
									<p><span>`+ obj.rows[2].num +`</span> 票</p>
								</div>
							</li>
						`;
					}
					$('.ranking>ul').append(npc);
					if(obj.rows.length>3){
						for(var i = 3;i<obj.rows.length;i++){
							var tpl = `
								<li>
									<p class="indexNum"><b>`+ obj.rows[i].rownum +`</b><span>`+ obj.rows[i].phone +`</span></p>
									<p><span>`+ obj.rows[i].num +`</span> 票</p>
								</li>
							`
							$('.rankList>ul').append(tpl);
						}
					}
				}else{
					$(".ranking ul").append('<div class="weui-cells__title nodata" >已无更多数据</div>');
	               	loading = true;
				}
				$(".weui-loadmore").hide();
			}else{
				if(obj.rows.length>0){
					for(var i = 0;i<obj.rows.length;i++){
						var tpl = `
							<li>
								<p class="indexNum"><b>`+ obj.rows[i].rownum +`</b><span>`+ obj.rows[i].phone +`</span></p>
								<p><span>`+ obj.rows[i].num +`</span> 票</p>
							</li>
						`
						$('.rankList>ul').append(tpl);
					}
				}else{
					$(".rankList ul").append('<div class="weui-cells__title nodata" >已无更多数据</div>');
	               	loading = true;
				}
				$(".weui-loadmore").hide();
			}
		}else{
			console.log(data);
			$(".weui-loadmore").hide();
		}
	})
}
