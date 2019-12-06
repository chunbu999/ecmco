var orderId = GetQueryString().orderId;
var varietie = GetQueryString().varietie;
$(function(){
	var type = GetQueryString().type;
	if(type && type == 2){//区分用户被接单请付款（进行中）和经济商的已接单的请付款（已接单type=2）
		$('.weui-title').text('已接单');
	}else{
		$('.weui-title').text('进行中');
		
	}
	orderDetail();
//	$('.weui-pull-right').click(function(){
//		var name = $('.buyName').text();
//		location.href = 'communication.html?name='+name;
//	})
})

function orderDetail(){
	tokenVerification('/trading/getBuyOrderDetail',{
		orderId:orderId,
		type:varietie
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			var payMethod,payTxt;
			$('.payMoney').text(obj[1].totalPrice);
			$('.trandeceil').text(obj[1].unitPrice);
			$('.trandeNum').text(obj[1].number);	
			$('.receipt').text(obj[1].orderDate);
			$('.serialNo').text(obj[1].serialNo);
			$('.poster').css('background','#999999');
			if(varietie == 0){
				$('.buyName').text(obj[1].phone);
				$('.nameTxt').text('买家')
			}else if(varietie == 1){
				$('.buyName').text(obj[1].layerPhone);
				$('.nameTxt').text('卖家')
			}
		}else{
			console.log(data)
		}
	})
}
