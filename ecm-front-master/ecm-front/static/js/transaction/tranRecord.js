var titleStatus,pageNumber;
var pageSize = 10;
var pageNumber=1;
var loading = false;
var dropDown = true;
var varieties;
$(function(){
	varieties = $('#titleFour>.bar-active').attr('data-title');
	//	请付款
	$(document).on('click','.buyIng',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'payIng.html?type=1&orderId='+orderId+'&varietie='+varieties//区分用户被接单请付款（进行中type=1）和经济商的已接单的请付款（已接单type=2）
	})
	//	已付款
	$(document).on('click','.buyDiv',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'payOver.html?type=1&orderId='+orderId+'&varietie='+varieties//区分用户已付款（进行中）和经济商的已付款（已付款type=2）
	})
	//	待放行
	$(document).on('click','.sellDiv',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'sellwait.html?type=1&orderId='+orderId+'&varietie='+varieties
	})
	//	请放行
	$(document).on('click','.pealseDiv',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'sellpel.html?orderId='+orderId+'&varietie='+varieties
	})
	//	已完成
	$(document).on('click','.fininsh',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'finish.html?type=1&status=1&orderId='+orderId+'&varietie='+varieties
	})
	//超时完成
	$(document).on('click','.overfinish',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'finish.html?type=1&status=2'+'&varietie='+varieties+'&orderId='+orderId
	})
	//已取消
	$(document).on('click','.readCancel',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'finish.html?type=1&status=3&orderId='+orderId+'&varietie='+varieties
	})
	//支付超时
	$(document).on('click','.payCancel',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'finish.html?type=1&status=4'+'&varietie='+varieties+'&orderId='+orderId;
	})
	//超时取消
	$(document).on('click','.overfinish',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'finish.html?type=1&status=5'+'&varietie='+varieties+'&orderId='+orderId;
	})
	$('#titleFour').on('click','a',function(){
		$(this).addClass('bar-active').siblings('a').removeClass('bar-active');
		titleStatus = $('#titleFour>.bar-active').attr('data-title');
		$('#buydiv a').eq(0).addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
		$('#tab01>ul').empty();
		pageNumber=1;
		loading = false;
		recordFun();
		//获取当前是购买或者出售

//		$('#boxcontent div').eq(0).addClass('weui-tab__bd-item--active').siblings('div').removeClass('weui-tab__bd-item--active');
	})
	$(document).on('click','#buydiv>a',function(){
		$('#tab01>ul').empty();
		pageNumber=1;
		loading = false;
		recordFun();
	})

	recordFun();
})

if(dropDown){
	dropDown = false;
	//=========================下拉刷新
   	$("#tabtxt").pullToRefresh().on("pull-to-refresh", function () {
       setTimeout(function () {
           pageNumber = 1;
           $('#tab01>ul').html("");
           $('#tab01>ul').empty();
           recordFun();
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
           recordFun();
           loading = false;
       }, 2500);   //模拟延迟
   	});
	var timerZX = setTimeout(function(){
		dropDown = true;
		clearTimeout(timerZX);
	},6000);
}

function recordFun(){
	var data = {
		type:$('#titleFour>a.bar-active').attr('data-title'),
		pageNumber:pageNumber,
		pageSize:pageSize,
		orderState:$('#buydiv>a.weui-bar__item--on').attr('data-type')
	};
	var nameClass,orderStaute;
	var topValue = $('#titleFour>a.bar-active').attr('data-title');
	var tabValue = $('#buydiv>a.weui-bar__item--on').attr('data-type');
	if(topValue == '0'){
		nameClass = '购买 ';
	}else{
		nameClass = '出售 ';
	}
	tokenVerification('/trading/getBuyOrderList',{
		type:$('#titleFour>a.bar-active').attr('data-title'),
		pageNumber:pageNumber,
		pageSize:pageSize,
		orderState:$('#buydiv>a.weui-bar__item--on').attr('data-type')
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			var receipt,complete,jumpClass;
			if(obj.rows.length>0){
				for(var i = 0;i<obj.rows.length;i++){
					//tabbar的状态
					if(tabValue == '0'){
						receipt = "";
						complete = ""
					}else if(tabValue == '1'){
						receipt = '<li>接单时间：'+ obj.rows[i].orderDate +'</li>';
						complete = ""
					}else if(tabValue == '2'){
						receipt = '<li>接单时间：'+ obj.rows[i].orderDate +'</li>';
						complete = '<li>完成时间：'+ obj.rows[i].completionDate +'</li>'
					}else{
						receipt = '<li>接单时间：'+ obj.rows[i].orderDate +'</li>';
						complete = '<li>取消时间：'+ obj.rows[i].updateDate +'</li>'
					}

					//详细订单的状态
					switch (obj.rows[i].userDetailState){
						case '0':
							orderStaute = '待接单';
							jumpClass = '';
							break;
						case '1':
							orderStaute = '请付款';
							jumpClass = 'buyIng';
							break;
						case '2':
							orderStaute = '已付款';
							jumpClass = 'buyDiv';
							break;
						case '3':
							orderStaute = '已完成';
							jumpClass = 'fininsh';
							break;
						case '4':
							orderStaute = '已取消';
							jumpClass = 'readCancel';
							break;
						case '5':
							orderStaute = '超时取消';
							jumpClass = 'overfinish';
							break;
						case '6':
							orderStaute = '待放行';
							jumpClass = 'sellDiv';
							break;
						case '7':
							orderStaute = '请放行';
							jumpClass = 'pealseDiv';
							break;
						case '8':
							orderStaute = '超时完成';
							jumpClass = 'overfinish';
							break;
						case '9':
							orderStaute = '支付超时';
							jumpClass = 'payCancel';
							break;
						default:
							break;
					}
					var tpl = '<li class="'+ jumpClass +'" data-id="'+ obj.rows[i].id+'">'+
			      			'<div class="boxTitle">'+
			      				'<h3 class="titleTile">'+ nameClass +' ECM</h3>'+
			      				'<h3 class="changeColor">'+ orderStaute +'</h3>'+
			      			'</div>'+
			      			'<div class="boxList" style="font-size: 12px;">'+
			      				'<div class="listLeft">'+
			      					'<ul>'+
			      						'<li>'+ nameClass +'数量：'+ obj.rows[i].number +' ECM</li>'+
			      						'<li>'+ nameClass +'单价：'+ obj.rows[i].unitPrice +'USDT</li>'+
			      						'<li>发布时间：'+ obj.rows[i].createDate +'</li>'+
			      						''+ receipt +''+
			      						''+ complete +''+
			      					'</ul>'+
			      				'</div>'+
			      				'<div class="listright">'+
			      					'<p>总价：<span class="changeColor">'+ obj.rows[i].totalPrice +'USDT</span></p>'+
			      				'</div>'+
			      			'</div>'+
			      		'</li>';
			      	$('#tab01>ul').append(tpl);
			    }
			}else{
				$('#tab01>ul').append('<div class="weui-cells__title nodata" >已无更多数据</div>');
               	loading = true;
			}
			$(".weui-loadmore").hide();
		}else{
			console.log(data);
			$(".weui-loadmore").hide();
		}
	})
}

