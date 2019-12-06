var pageSize = 10;
var pageNumber=1;
var loading = false;
var dropDown = true;
var titleId;
var ifBind;//是否绑定收款方式
$(function(){
	userInfoFun();
  	getIsIphonex ();
	$('.tranceTitle').on('click','.tranLeft',function(){
		location.href = 'transaction.html'
	})
	//获取购买、出售的数量
//	var kindId = $('.navtitle .weui-bar__item--on').attr('data-id');
	titleId = $('.navtitle .weui-bar__item--on').attr('data-id');
	numberFun();

	//买、卖列表
	$('.navtitle').on('click','a',function(){
		titleId = $(this).attr('data-id');
		pageNumber = 1;
		loading = false;
		$('#listFun').empty();
		numberFun();
	})
	//加入购买出售队列
	$(document).on('click','.addShop',function(){
		var id = $(this).attr('data-order');
		var kinof = $(this).attr('data-kind');
		if(kinof == 'Y'){//出售
				var type = $('.navtitle>a.weui-bar__item--on').attr('data-id');
				var orderType;
				if(type == 0){
					orderType = 1
				}else if(type == 1){
					orderType = 0
				}
				queueFun(id,orderType)
		}else if(kinof == 'N'){//购买
			var type = $('.navtitle>a.weui-bar__item--on').attr('data-id');
			var orderType;
			if(type == 0){
				orderType = 1
			}else if(type == 1){
				orderType = 0
			}
			queueFun(id,orderType)
		}
	})

})
function userInfoFun(){
	tokenVerification(userInfoApi,{},function(data){
		if(data.code == 200){
			var obj = data.data;
			ifBind = obj.isBindCollection;
		}
	})
}
if(dropDown){
	dropDown = false;
	//=========================下拉刷新
   	$("#tabtxt").pullToRefresh().on("pull-to-refresh", function () {
       	setTimeout(function () {
           	pageNumber = 1;
           	$('#listFun').html('');
           	numberFun();
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
       $('.weui-loadmore').show();
       setTimeout(function () {
          	pageNumber++; //页数
           	numberFun();
           	loading = false;
       },1500);   //模拟延迟
   	});
	var timerZX = setTimeout(function(){
		dropDown = true;
		clearTimeout(timerZX);
	},6000);
}


function numberFun(){
	var datas = {
		pageSize:pageSize,
		pageNumber:pageNumber,
		type:titleId
	};
	tokenVerification('/trading/getBuySellList',datas,function(data){
		if(data.code == 200){
			var obj = data.data;
			var nameTxt;
			var kindVo;
			if(titleId == 1){
				nameTxt = '购买';
				kindVo = 'N'
			}else{
				nameTxt = '出售';
				kindVo = 'Y'
			}
			if(obj.rows.length>0){
				for(var i = 0;i<obj.rows.length;i++){
					var js = obj.rows[i].payWay;
					ss = js.split(",");
					var npl = '';
					for(var n = 0;n<ss.length;n++){
						if(ss[n] == 0){
			        		npl+='<img src="../../static/images/zhifubao.png" />';
						}else if(ss[n] == 1){
				        	npl+='<img src="../../static/images/weixin.png" />';
						}else{
				        	npl+='<img src="../../static/images/yinhangka.png" />';
						}
					}
					var tpl = `
						<li>
		    				<div class="twoBox">
		    					<div class="brokerLeft">
		    						<ul>
		    							<li class="headerDiv">
		    								<img class="headerImg" src="`+ (obj.rows[i].portrait == '' ? '../../static/images/loginImg.png' : imgHost+obj.rows[i].portrait) +`" />
		    								<h4>`+ obj.rows[i].phone +`</h4>
		    							</li>
		    							<li>数量：`+ obj.rows[i].number +` ECM</li>
		    							<li>总价：`+ obj.rows[i].totalPrice +`USDT</li>
		    							<li class="methodImg">
											`+ npl +`
		    							</li>
		    						</ul>
		    					</div>
		    					<div class="brokerright">
		    						<p>单价</p>
	    							<h2>`+ obj.rows[i].unitPrice +`USDT</h2>
	    							<button class="weui-btn addShop" data-kind="`+ kindVo +`" data-order='`+ obj.rows[i].id +`'>加入`+ nameTxt +`队列</button>
		    					</div>
		    				</div>
		    			</li>
					`;
					$('#listFun').append(tpl)
				}
			}else{
				$('#listFun').append('<div class="weui-cells__title nodata" >已无更多数据</div>');
               	loading = true;
			}
			$(".weui-loadmore").hide();
		}else{
			console.log(data);
			$(".weui-loadmore").hide();
		}
	})
}


function queueFun(id,orderType){
	tokenVerification('/trading/joinQueue',{
		orderId:id,
		type:orderType
	},function(data){
		if(data.code == 200){
			$.toast(data.msg);
			setTimeout(function(){
				location.reload();
			},700)
		}else{
			$.toast(data.msg,'text')
			console.log(data);
		}
	})
}
