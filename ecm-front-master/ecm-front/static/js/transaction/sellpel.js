var orderId = GetQueryString().orderId;
var type = GetQueryString().type;
var varietie = GetQueryString().varietie;
$(function(){
	if(type && type == 2){//区分用户被接单请付款（进行中）和经济商的已接单的请付款（已接单type=2）
		$('.weui-title').text('请放行');
	}else{
		$('.weui-title').text('进行中');
		
	}
	orderDetail();
	
	$('.poster').click(function(){
		releaseFun();
	})
	$('.addShip').click(function(){
		location.href = 'appeal.html'
	})
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
			$('.receipt').text(obj[1].createDate);
			$('.orderTime').text(obj[1].orderDate);
			$('.orderNO').text(obj[1].serialNo);
			if(obj[1].appeal == '1'){
				$('.addShip').attr('disabled',true);
				$('.poster').attr('disabled',true);
			}else{
				$('.addShip').attr('disabled',false);
				$('.poster').attr('disabled',false);
			}
			if(type == 2){//身份 ：经济商
				$('.payee').text(obj[1].phone);
			}else{//身份 ：用户
				$('.payee').text(obj[1].layerPhone);
			}
			
			if(varietie == 0){//出售
				$('.nameTxt').text('买家')
			}else{//购买
				$('.nameTxt').text('卖家')
			}
		}else{
			console.log(data)
		}
	})
}


function releaseFun(){
	tokenVerification('/trading/release',{
		orderId:orderId,
		type:0
	},function(data){
		if(data.code == 200){
			$.toast(data.msg);
			$('.poster').attr('disabled',true);
			setTimeout(function(){
				window.history.back(-1);
			},700)
		}else{
			$.toast(data.msg,'text');
			console.log(data)
		}
	})
}
