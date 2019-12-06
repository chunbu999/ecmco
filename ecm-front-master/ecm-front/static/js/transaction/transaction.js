var check_val;
var isOpen;//判断是否开启二次密码
var sellBox;//判断是否开启出售池
$(function(){
	userInfoFun();
  	getIsIphonex ();
//	var userInfo = JSON.parse(localStorage.getItem('userInfo'));

	//获取购买、出售的数量
	var kindId = $('.navtitle .weui-bar__item--on').attr('data-id');
	numberFun(kindId);
	$('.navtitle').on('click','a',function(){
		var titleId = $(this).attr('data-id');
		numberFun(titleId);
		if(titleId == '0'){
			$('.single').removeClass('weui-hiden');
			$('.double').addClass('weui-hiden');
			$('.methodDiv').text('选择您的付款方式');
		}else{
			$('.single').addClass('weui-hiden');
			$('.double').removeClass('weui-hiden');
			$('.methodDiv').text('选择您的收款方式');
		}

	})
	//提交发布
	$('.mybgBtn').click(function(){
		if(sellBox == '1'){
			var types = $('.navtitle>a.weui-bar__item--on').attr('data-id');
			var select;
			var buyPrice = $('input:radio:checked').val();
			if(types == 0){
				if(!buyPrice){
					$.toast('请输入您的付款方式');
					return;
				}
				select = buyPrice;
			}else{
				show();
				if(check_val.length == 0){
					$.toast('请输入您的收款方式');
					return;
				}
				var arr = check_val.join(','); //使用,拼接数组元素
				select = arr;
			}
			if(isOpen == '1'){
				var pwdModal = `
					<div class="voteModal">
						<h4>请输入密码</h4>	
						<span class="lineBottom"></span>
						<div class="voteContent">
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input class="weui-input" id="pwdNum" type="password"  placeholder="请输入交易密码">
								</div>
							</div>
						</div>
					</div>
				`;
				$.confirm(pwdModal,function(){
					if(!$('#pwdNum').val()){
						$.toast('请输入密码！','text');
						return false;
					}
					if(!(isPsd.test($('#pwdNum').val()))){
						$.toast('请输入6-16位的密码！','text');
						return false;
					}
					releaseFun(select);
				},function() {
			      //取消操作
			      location.reload();
			    });
			}else{
				releaseFun(select);
			}
		}else{
			$.toast('出售池暂未开启');
		}
	})


//	选择支付方式
//	$(document).on('click','.weui_check',function(e){
//		var _this = $(this).parent('.agreement').parent('li').index();
////		e.preventDefault();              //阻止事件本身的动作
//      e.stopPropagation();			 //阻止事件冒泡到父元素
//		var payType = $(this).val();
//		bindMethid(payType,_this,1);
//	})
	$(document).on('click','.weui-agree__checkbox',function(e){
		var _this = $(this).parent('.agreement').parent('li').index();
//		e.preventDefault();              //阻止事件本身的动作
        e.stopPropagation();			 //阻止事件冒泡到父元素
		var payType = $(this).val();
		bindMethid(payType,_this,2);
	})
})
function show(){
    var obj = document.getElementsByName("test");
    check_val = [];
    for(k in obj){
        if(obj[k].checked)
            check_val.push(obj[k].value);
    }
    return check_val;
}
//获取购买、出售的数量
function numberFun(kindId){
	tokenVerification('/trading/getTransactionQuantity',{
		type:kindId
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			$('#listBox').empty();
			if(kindId == 0){
				var tpl = '<li>'+
	    				'<p>购买数量</p>'+
	    				'<p><span class="number">'+ obj.number +'</span> ECM</p>'+
	    			'</li>'+
	    			'<li>'+
	    				'<p>购买单价</p>'+
	    				'<p><span class="price">'+ obj.unitPrice +'USDT</span></p>'+
	    			'</li>'+
	    			'<li>'+
	    				'<p>购买总价</p>'+
	    				'<p><span class="totalPrice">'+ obj.totalPrice +'USDT</span></p>'+
	    			'</li>';
			}else{
				var tpl = '<li>'+
    				'<p>出售数量</p>'+
    				'<p><span class="number">'+ obj.number +'</span> ECM</p>'+
    			'</li>'+
    			'<li>'+
    				'<p>出售单价</p>'+
    				'<p><span class="price">'+ obj.unitPrice +'USDT</span></p>'+
    			'</li>'+
    			'<li>'+
    				'<p>出售总价</p>'+
    				'<p><span class="totalPrice">'+ obj.totalPrice +'USDT</span></p>'+
    			'</li>';
			}
			$('#listBox').append(tpl);
		}else{
			console.log(data)
		}
	})
}

//验证是否绑定支付方式
function bindMethid(payType,_this,mde){
	tokenVerification('/trading/validationCollection',{
		type:payType,
		status:0 //$('.navtitle .weui-bar__item--on').attr('data-id')
	},function(data){
		if(data.code == 200){
			if(mde == 1){
				$('#as>ul>li').eq(''+ _this +'').find('.weui_check').attr('checked',true);
			}else{
				$('#moreSelect>ul>li').eq(''+ _this +'').find('.weui-agree__checkbox').attr('checked',true)
			}
		}else{
			$.toast(data.msg,'text');
			if(mde == 1){
				$('#as>ul>li').eq(''+ _this +'').find('.weui_check').attr('checked',false);
			}else{
				$('#moreSelect>ul>li').eq(''+ _this +'').find('.weui-agree__checkbox').attr('checked',false)
			}
			console.log(data)
		}
	})
}

function userInfoFun(){
	tokenVerification(userInfoApi,{},function(data){
		if(data.code == 200){
			var obj = data.data;
			isOpen = obj.pswState;
			if(obj.isLayer == '1'){
				$('.tranceTitle').on('click','.tranLeft',function(){
					location.href = 'broker.html'
				})
			}
			sellBox = obj.sellPoolState;
		}
	})
}

//发布
function releaseFun(select){
	var data = {
		number:$('.number').text(),
		totalPrice:$('.totalPrice').text(),
		unitPrice:$('.price').text(),
		payWay:select,
		type:$('.navtitle>a.weui-bar__item--on').attr('data-id'),
		payPassWord:$('#pwdNum').val()
	};
	tokenVerification('/trading/buyAndSell',data,function(data){
		if(data.code == 200){
			$.toast(data.msg);
			setTimeout(function(){
				location.reload();
			},600)
		}else{
			console.log(data);
			$.toast(data.msg);
		}
	})
}

