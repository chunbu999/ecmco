var payId = GetQueryString().pay;
$(function(){
	$('#thressMethod>.weui-panel__bd').on('click','a',function(){
		$(this).find('.selectInput').prop('checked',true).siblings('a').find('.selectInput').prop('checked',false);
		var value = $(this).find('.txtImg').attr('src');//图片地址
		var txt = $(this).find('.txtName').text();//支付名称
		var i = $(this).index();//索引
		var payMethod = {};
		if(value){
			payMethod.value = value;
			payMethod.txt = txt;
			payMethod.index = i;
			localStorage.setItem('payMethod',JSON.stringify(payMethod));
			window.history.back(-1);
		}
	})
	
	if(payId){
		var payIdArr = payId.split('');
		var payMethod,payTxt;
		if(payIdArr.length>0){
			$('#thressMethod>.weui-panel__bd').empty();
			for(var i = 0;i<payIdArr.length;i++){
				switch (payIdArr[i]){
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
				var tpl = '<a class="weui-cell weui-cell_access weui-cell_example">'+
					'<div class="weui-cell__hd methImg">'+
						'<img class="txtImg" src="'+ payMethod +'">'+
			    	'</div>'+
			    	'<div class="weui-cell__bd weui-cell_primary">'+
			        	'<p class="txtName">'+ payTxt +'</p>'+
			    	'</div>'+
			    	'<input class="selectInput" type="radio" value="'+ payIdArr[i] +'" name="sex" />'+
			    '</a>';
			    
			    $('#thressMethod>.weui-panel__bd').append(tpl);
			}
		}			
	}
})
