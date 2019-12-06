var orderId = GetQueryString().orderId;
var types = GetQueryString().type;
var varietie = GetQueryString().varietie;
var arr2,len,pb1,omh;
var kinds;
$(function(){
	FastClick.attach(document.body);
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	}
	if(types && types == 2){//区分用户已付款（进行中）和经济商的已付款（已付款type=2）
		$('.weui-title').text('已接单');
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

  	$('.poster').click(function(){
  		$('.poster').attr('disabled',true)
  		if(types == 2){//经纪商标记已支付
  			payFun();
  		}else{//用户标记已支付
  			var type = 0; //确认支付
			canCelFun(type)
  		}
	})

	//取消支付
	$('.addShip').click(function(){
		$('.addShip').attr('disabled',true)
		var type = 1;
		canCelFun(type);
	})
})
//订单详情
function orderDetail(){
	tokenVerification('/trading/getBuyOrderDetail',{
		orderId:orderId,
		type:varietie, //type0：经纪商 1：用户
		status:0
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
				//$('.weui-cell_example').css('display','none');
				$('.qrcodePep').css('display','none');
				$('.changeBtn').css('display','none');
				$('.bankDiv').css('display','none');
				if(varietie == 0){
					$('.payee').text(obj[1].layerPhone);
				}

			}else{
				$('.weui-cell_example').css('display','flex');
				$('.bankDiv').css('display','flex');
				var arr = Object.keys(obj[0]);
				$('.qrcodePep').css('display','flex');
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
						case '3':
							payMethod = '../../static/images/yinhangka.png';
							payTxt = 'USDT';
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
						$('.payee').text(obj[0][ppp.index].name);
						//$('.noName').text(ppp.txt);

						if(ppp.txt == '银行卡'){
							$('.bankNo').text(obj[0][index].bankNum);
							$('.qroding').css('display','none');
                          	$('.qrcodePep').css('display','none');
						}else{
							$('.bankNo').text(obj[0][index].account);
							$('.qroding').css('display','flex');
                          	$('.qrcodePep').css('display','flex');
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
						$('.qroding').css('display','none');
						$('.qrcodePep').css('display','none');
					}else{
						$('.bankNo').text(obj[0][0].account);
						$('.qroding').css('display','flex');
						$('.qrcodePep').css('display','flex');
						$('#pb1').attr('data-img',imgHost+(obj[0][0].urlCode))
					}
				}
				if(len == 1){
					$('.changeBtn').css('display','none');
				}

			}
			countDown();
		}else{
			console.log(data)
		}
	})
}

$(document).on('click','#arrow',function(){
	localStorage.removeItem('payMethod');
})
//经纪商的支付操作
function payFun(){
	tokenVerification('/trading/confirmOrderLayer',{
		orderIds:orderId
	},function(data){
		if(data.code == 200){
			$.toast(data.msg);
			$('.addShip').attr('disabled',true);
			setTimeout(function(){
				window.history.back(-1);
			},650)
		}else{
			$.toast(data.msg,'text');
			$('.poster').attr('disabled',false);
			$('.addShip').attr('disabled',false)
		}
	})
}
//用户和经纪商的取消操作 和 用户的确认支付
function canCelFun(type){
	tokenVerification('/trading/confirmOrder',{
		orderId:orderId,
		type:type
	},function(data){
		if(data.code == 200){
			$.toast(data.msg);
			$('.addShip').attr('disabled',true);
			setTimeout(function(){
				window.history.back(-1);
			},650)
		}else{
			$.toast(data.msg,'text');
			$('.poster').attr('disabled',false);
			$('.addShip').attr('disabled',false)
		}
	})
}

//types = 2经济商  varietie=0出售 =1购买
function countDown(){
	tokenVerification('/trading/getCountDown',{},function(data){
		if(data.code == 200){
			var obj = data.data;
			if(varietie == 0){//买家
				$('.countdown').text(obj.buyer_pay_time);
			}else{//卖家
				$('.countdown').text(obj.seller_pay_time);
			}
			var value = $('.receipt').text();
			var kk = $('.countdown').text();
			countTime(value,kk);
		}else{
			if(varietie == 0){//买家
				$('.countdown').text(30);
			}else{//卖家
				$('.countdown').text(30);
			}
			var value = $('.receipt').text();
			var kk = $('.countdown').text();
			countTime(value,kk);
			console.log(data);
		}
	})
}

function countTime(value,kk) {//value下单时间
    //获取当前时间
    var date = new Date();
    var now = date.getTime() + utc;
    //设置截止时间
    //设置的倒计时时间
    var start = value;
    start = start.replace(/-/g,"/");

    var endDate = new Date(start);

    var end = endDate.getTime() + (kk * 60 * 1000);//下单时间加分钟乘以60秒

    //时间差
    var differTime = end - now;

    //定义变量,h,m,s保存倒计时的时间
    var h, m, s;
    //服务器时间和本地时间不一样是出现bug
    if (differTime >= 0) {
        h = Math.floor(differTime / 1000 / 60 / 60);
        m = Math.floor(differTime / 1000 / 60 % 60);
        s = Math.floor(differTime / 1000 % 60);
        h = h < 10 ? ("0" + h) : h;
        m = m < 10 ? ("0" + m) : m;
        s = s < 10 ? ("0" + s) : s;
        var timeDom = h + "小时" +  m + "分" +  s + "秒";
        $(".countdown").text(timeDom);
        //递归调用函数所以是延时器不是定时器
        setTimeout(function () {
            countTime(value,kk)
        }, 1000);
   }

   else {
        var timeDom ="00小时 00分 00秒";
        $(".countdown").text(timeDom);
        setTimeout(function(){
        	window.history.go(-1);
        },700)
	}
}
