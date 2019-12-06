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
		//type = 2经济商  varietie=0出售 =1购买
		location.href = 'payIng.html?type=2&orderId='+orderId+'&varietie='+varieties//区分用户被接单请付款（进行中type=1）和经济商的已接单的请付款（已接单type=2）
	})
	//	已付款
	$(document).on('click','.buyDiv',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'payOver.html?type=2&orderId='+orderId+'&varietie='+varieties
	})
	//	待放行
	$(document).on('click','.sellDiv',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'sellwait.html?type=2&orderId='+orderId+'&varietie='+varieties
	})
	//	请放行
	$(document).on('click','.pealseDiv',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'sellpel.html?type=2&orderId='+orderId+'&varietie='+varieties
	})
	//	已完成
	$(document).on('click','.fininsh',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'finish.html?type=2&status=1&orderId='+orderId+'&varietie='+varieties;
	})
	//超时完成
	$(document).on('click','.overfinish',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'finish.html?type=2&status=2'+'&varietie='+varieties+'&orderId='+orderId;;
	})
	//已取消
	$(document).on('click','.readCancel',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'finish.html?status=3&orderId='+orderId+'&varietie='+varieties
	})
	//支付超时
	$(document).on('click','.payCancel',function(){
		var orderId = $(this).attr('data-id');
		location.href = 'finish.html?type=2&status=4&orderId='+orderId+'&varietie='+varieties
	})
	//超时取消
//	$(document).on('click','.overfinish',function(){
//		var orderId = $(this).attr('data-id');
//		location.href = 'finish.html?type=2&status=5'+'&varietie='+varieties+'&orderId='+orderId;
//	})
	$('#titleFour').on('click','a',function(){
		var that = $(this);
		$(this).addClass('bar-active').siblings('a').removeClass('bar-active');
		titleStatus = $('#titleFour>.bar-active').attr('data-title');
		$('#buydiv a').eq(0).addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
		varieties = $(this).attr('data-title');
		if(titleStatus == '0'){//出售队列
			$('.tabName').text('请放行');
			$('#changeDiv').attr('data-type',1)
//			$('#buyNav').removeClass('weui-hiden');
//			$('#sellNav').addClass('weui-hiden');
//
//			$('#tabtxt div').eq(0).addClass('weui-tab__bd-item--active').siblings('div').removeClass('weui-tab__bd-item--active');
		}else{//购买队列
			$('.tabName').text('已付款')
			$('#changeDiv').attr('data-type',2)
//			$('#buyNav').addClass('weui-hiden');
//			$('#sellNav').removeClass('weui-hiden');
//			$('#selldiv a').eq(0).addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
//			$('#tatxt div').eq(0).addClass('weui-tab__bd-item--active').siblings('div').removeClass('weui-tab__bd-item--active');
		}
		$('.openDiv').on('click',function(){
			location.href = 'sellpel.html';
		})
		$('#tab01>ul').empty();
		$('.btnLast').empty();
		pageNumber=1;
		loading = false;
		recordFun();
		//获取当前是购买或者出售

//		$('#boxcontent div').eq(0).addClass('weui-tab__bd-item--active').siblings('div').removeClass('weui-tab__bd-item--active');
	})
	$(document).on('click','#buydiv>a',function(){
		$('#tab01>ul').empty();
		$('.btnLast').empty();
		pageNumber=1;
		loading = false;
		recordFun();
	})
	//标记多个列表已支付
	$(document).on('click','.signBtn',function(){
		var orderPop = $('.Checklist .weui-agree__checkbox');
		var orderTypeId;
		var areArr = [];
		var d = Array.prototype.slice.call(orderPop).map(function (it) {
			if(it.checked == true){
				return {
					id: it.getAttribute("data-order")
				};
			}
		});
		if(d.length>0){
			for(var i = 0;i<d.length;i++){
				if(d[i] == undefined){

				}else{
					areArr.push(d[i].id);
				}

			}
		}
		if(areArr.length>0){
			orderTypeId = areArr.join(',');
			signOrderFun(orderTypeId);
		}
	})
	//多选
	recordFun();
})


if(dropDown){
	dropDown = false;
	//=========================下拉刷新
   	$("#tabtxt").pullToRefresh().on("pull-to-refresh", function () {
       	setTimeout(function () {
           	pageNumber = 1;
           	$('#tab01>ul').empty();
			$('.btnLast').empty();
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
		layerState:$('#buydiv>a.weui-bar__item--on').attr('data-type')
	};
	var nameClass,orderStaute;
	var topValue = $('#titleFour>a.bar-active').attr('data-title');
	var tabValue = $('#buydiv>a.weui-bar__item--on').attr('data-type');
	if(topValue == '0'){
		nameClass = '出售';
	}else{
		nameClass = '购买';
	}

	tokenVerification('/trading/getLayerBuyOrderList',data,function(data){
		if(data.code == 200){
			var obj = data.data;
			var receipt,complete,jumpClass;
			if(obj.rows.length>0){
				for(var i = 0;i<obj.rows.length;i++){
					//tabbar的状态
					var btnTpl="";

					if(tabValue == '0'){
						if(topValue == '1'){
							receipt = '<div class="Checklist">'+
      							'<label class="weui-agree agreement">'+
									'<input type="checkbox" data-order="'+ obj.rows[i].id +'" class="weui-agree__checkbox" />'+
									'<span class="weui-agree__text">我已支付</span>'+
								'</label>'+
      						'</div>';
						}else{
							receipt=""
						}
						complete = ""
					}else if(tabValue == '1'){
						receipt = '';
						complete = ""
					}else if(tabValue == '2'){
						receipt = '';
						complete = '<li>完成时间：'+ obj.rows[i].completionDate +'</li>'
					}else{
						receipt = '';
						complete = '<li>取消时间：'+ obj.rows[i].updateDate +'</li>'
					}

					//详细订单的状态
					switch (obj.rows[i].layerDetailState){
						case '0':
							orderStaute = '请付款';
							jumpClass = 'buyIng';
							break;
						case '1':
							orderStaute = '已付款';
							jumpClass = 'buyDiv';
							break;
						case '2':
							orderStaute = '已完成';
							jumpClass = 'fininsh';//buyfinish
							break;
						case '3':
							orderStaute = '已取消';
							jumpClass = 'readCancel';//cancelpay
							break;
						case '4':
							orderStaute = '支付超时';
							jumpClass = 'payCancel';//overcancel
							break;
						case '5':
							orderStaute = '待放行';
							jumpClass = 'sellDiv';
							break;
						case '6':
							orderStaute = '请放行';
							jumpClass = 'pealseDiv';
							break;
						case '7':
							orderStaute = '超时完成';
							jumpClass = 'overfinish';
							break;
						case '8':
							orderStaute = '支付超时';
							jumpClass = 'payCancel';
							break;
						default:
							break;
					}
					var tpl = '<li>'+
			      			'<div class="centerBox '+ jumpClass +'" data-id="'+ obj.rows[i].id +'">'+
				      			'<div class="boxTitle">'+
				      				'<h3 class="titleTile">'+ nameClass +' ECM</h3>'+
				      				'<h3 class="changeColor">'+ orderStaute +'</h3>'+
				      			'</div>'+
				      			'<div class="boxList">'+
				      				'<div class="listLeft">'+
				      					'<ul>'+
				      						'<li>'+ nameClass +'数量：'+ obj.rows[i].number +' ECM</li>'+
				      						'<li>'+ nameClass +'单价：USDT'+ obj.rows[i].unitPrice +'</li>'+
				      						'<li>接单时间：'+ obj.rows[i].orderDate +'</li>'+
				      						''+ complete +''+
				      					'</ul>'+
				      				'</div>'+
				      				'<div class="listright">'+
				      					'<p>总价：<span class="changeColor">USDT'+ obj.rows[i].totalPrice +'</span></p>'+
				      				'</div>'+
				      			'</div>'+
				      		'</div>'+
			      			''+ receipt +''+
			      		'</li>';
			      	$('#tab01>ul').append(tpl);
			      	if(topValue == 1){
						if(tabValue == 0){

							btnTpl+='<button class="weui-btn mybgBtn signBtn">标记订单为已支付</button>'
							$('.btnLast').html(btnTpl);
						}
					}
			    }

			}else{
				$('#tab01>ul').append('<div class="weui-cells__title nodata" >已无更多数据</div>');
               	loading = true;
			}
			$(".weui-loadmore").hide();
		}else{
			$(".weui-loadmore").hide();
			console.log(data)
		}
	})
}

function signOrderFun(orderTypeId){
	tokenVerification('/trading/confirmOrderLayer',{
		orderIds:orderTypeId
	},function(data){
		if(data.code == 200){
			$.toast(data.msg);
			setTimeout(function(){
				location.reload();
			},700)
		}else{
			$.toast(data.msg,'text');
		}
	})
}
