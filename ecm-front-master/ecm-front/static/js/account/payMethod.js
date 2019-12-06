$(function(){
	var bind = GetQueryString().bind;
	if(bind && bind == 1){
		$('.weui-title').text('绑定支付方式');
		$('#alipay').attr('href','methodzhi.html?bind=1');
		$('#weChat').attr('href','methodwei.html?bind=1');
		$('#bankBox').attr('href','methodbank.html?bind=1');
	}else{
		$('.weui-title').text('收款方式')
	}
})
