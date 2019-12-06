var orderId = GetQueryString().orderId;
var status = GetQueryString().status;
var varietie = GetQueryString().varietie;
var types = GetQueryString().type;
$(function(){
	if(status == '1'){
		$('.orderStaute>h2').append('<span class="fininsh">已完成</span>');
		$('.orderTxt').text('订单已完成');
	}else if(status == '2'){
		$('.orderStaute>h2').append('<span class="overfinish">超时完成</span>');
		$('.orderTxt').text('订单超时未放行，系统自动放行');
	}else if(status == '3'){
		$('.weui-title').text('已取消')
		$('.orderStaute>h2').append('<span class="overfinish">已取消</span>');
		$('.orderTxt').text('订单已取消');
		$('.txt').text('取消')
	}else if(status == '4'){
		$('.orderStaute>h2').append('<span class="overfinish">支付超时</span>');
		$('.orderTxt').text('订单已取消');
		$('.txt').text('取消')
	}else if(status == '5'){
		$('.orderStaute>h2').append('<span class="overfinish">超时取消</span>');
		$('.orderTxt').text('订单已超时取消');
		$('.txt').text('取消')
	}
	orderDetail();
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
			if(status == 3 || status == 4){
				$('.finishTime').text(obj[1].updateDate);
			}else{
				$('.finishTime').text(obj[1].completionDate);
			}
			
			if(types == 2){//身份 ：经济商
				$('.payee').text(obj[1].phone);
			}else{//身份 ：用户
				$('.payee').text(obj[1].layerPhone);
			}
			
			if(varietie == 0){//出售
				$('.nameTxt').text('卖家')
			}else{//购买
				$('.nameTxt').text('买家')
				
			}
			$('.orderTime').text(obj[1].orderDate);
			$('.orderNO').text(obj[1].serialNo);
		}else{
			console.log(data)
		}
	})
}