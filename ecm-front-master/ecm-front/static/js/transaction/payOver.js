var orderId = GetQueryString().orderId;
var varietie = GetQueryString().varietie;
var type = GetQueryString().type;
var arr2,len,pb1,omh;
$(function(){
	FastClick.attach(document.body);
	
	if(type && type == 2){//区分用户已付款（进行中）和经济商的已付款（已付款type=2）
		$('.weui-title').text('已付款');
	}else{
		$('.weui-title').text('进行中');
		
	}
	orderDetail();
	
	$(document).on('click','.weui-cell_example',function(){
		if(len > 1){
			location.href = 'changePay.html?pay='+arr2;
		}
	})
	//查看大图
	$("#pb1").click(function() {
		omh = $('#pb1').attr('data-img');
		if(omh){
			$.photoBrowser({items: [omh]}).open(0);
		}
  	});
})
//订单详情
function orderDetail(){
	tokenVerification('/trading/getBuyOrderDetail',{
		orderId:orderId,
		type:varietie,//type0：经纪商 1：用户
		status:0 //收款方式
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			var payMethod,payTxt;
			$('.payMoney').text(obj[1].totalPrice);
			$('.trandeceil').text(obj[1].unitPrice);
			$('.trandeNum').text(obj[1].number);
			$('.receipt').text(obj[1].orderDate);
			$('.orderNO').text(obj[1].serialNo);
			if(obj[0][0] == null && obj[0][0] == undefined){
				$('.weui-cell_example').css('display','none');
				$('.qroding').css('display','none');
				$('.changeBtn').css('display','none');
				$('.bankDiv').css('display','none');
				if(varietie == 0){
					$('.payee').text(obj[1].layerPhone);
				}
			}else{
				$('.qroding').css('display','flex');
				$('.bankDiv').css('display','flex');
				var arr = Object.keys(obj[0]);
				len = arr.length;//支付方式的长度
				var arrArr = [];
				if(len > 0){
					$('.changeBtn').css('display','block');
					switch (obj[0][0].type){
						case '0':
							payMethod = '../../static/images/zhifubao.png';
							payTxt = '支付宝';
							break;
						case '1':
							payMethod = '../../static/images/weixin.png';
							payTxt = '微信';
							break;
						case '2':
							payMethod = '../../static/images/yinhangka.png';
							payTxt = '银行卡';
							break;
						default:
							break;
					}
					for(var i = 0;i<arr.length;i++){
						arrArr.push(obj[0][i].type)
					}
					arr2 = arrArr.join("");
				}else{
					$('.changeBtn').css('display','none');
				}
				var ppp = JSON.parse(localStorage.getItem('payMethod'));
				if(ppp){
					var arrLength = Object.keys(ppp); 
					if(arrLength.length>0){
						var index = ppp.index;
						$('.weImg>img').attr('src',ppp.value);
						$('.payKind').text(ppp.txt);
						$('.payee').text(obj[0][index].name);
						$('.noName').text(ppp.txt);
						
						if(ppp.txt == '银行卡'){
							$('.bankNo').text(obj[0][index].bankNum);
							$('.qroding').css('display','none')
						}else{
							$('.bankNo').text(obj[0][index].account);
							$('.qroding').css('display','flex');
							$('#pb1').attr('data-img',imgHost+(obj[0][index].urlCode))
						}
					}
				}else{
					$('.weImg>img').attr('src',payMethod);
					$('.payKind').text(payTxt);
					$('.payee').text(obj[0][0].name);
					$('.noName').text(payTxt);
					if(obj[0][0].type == '2'){
						$('.bankNo').text(obj[0][0].bankNum);
						$('.qroding').css('display','none')
					}else{
						$('.bankNo').text(obj[0][0].account);
						$('.qroding').css('display','flex');
						$('#pb1').attr('data-img',imgHost+(obj[0][0].urlCode))
					}
				}	
				$('.poster').css('background','#999999');
				if(len == 1){
					$('.changeBtn').css('display','none');
				}
			}
		}else{
			console.log(data)
		}
	})
}

$(document).on('click','#arrow',function(){
	localStorage.removeItem('payMethod');
})
