var id = GetQueryString().appealId;
$(function(){
	//查看大图
	$(document).on('click','.appelcheckImg',function(){
		var omh = $(this).attr('data-img');
		if(omh){
			$.photoBrowser({items: [imgHost+omh]}).open(0);
		}
	});
	appealBox();
})

function appealBox(){
	tokenVerification('/trading/getBuyOrderDetailBySerialNo',{
		serialNo:id
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			$('.payMoney').text(obj[0].totalPrice);
			$('.trandeceil').text(obj[0].unitPrice);
			$('.trandeNum').text(obj[0].number);
			$('.receipt').text(obj[0].orderDate);
			$('.orderNO').text(obj[0].serialNo);
			$('.payee').text(obj[1].phone);
			$('#apealTxt').val(obj[1].content);
			$('.appelcheckImg').attr('data-img',obj[1].url);
			$('.appealTime').text(obj[1].createDate);
			if(obj[1].userId == obj[0].userId){//用户
				if(obj[0].type == '0'){//买家
					if(obj[1].type == '0'){
						$('.weui-title').text('审核中');
						$('.statusName').text('审核中');
					}else if(obj[1].type == '1'){
						$('.weui-title').text('申诉成功');
						$('.statusName').text('申诉成功');
					}else{
						$('.weui-title').text('申诉失败');
						$('.statusName').text('申诉失败');
					}
				}else if(obj[0].type == '1'){//卖家
					if(obj[1].type == '0'){
						$('.weui-title').text('审核中');
						$('.statusName').text('审核中');
					}else if(obj[1].type == '1'){
						$('.weui-title').text('申诉失败');
						$('.statusName').text('申诉失败');
					}else{
						$('.weui-title').text('申诉成功');
						$('.statusName').text('申诉成功');
					}
				}
			}else if(obj[1].userId == obj[0].pickUserId){//经济商 
				if(obj[0].type == '0'){//卖家 
					if(obj[1].type == '0'){
						$('.weui-title').text('审核中');
						$('.statusName').text('审核中');
					}else if(obj[1].type == '1'){
						$('.weui-title').text('申诉失败');
						$('.statusName').text('申诉失败');
					}else{
						$('.weui-title').text('申诉成功');
						$('.statusName').text('申诉成功');
					}
				}else if(obj[0].type == '1'){//买家
					if(obj[1].type == '0'){
						$('.weui-title').text('审核中');
						$('.statusName').text('审核中');
					}else if(obj[1].type == '1'){
						$('.weui-title').text('申诉成功');
						$('.statusName').text('申诉成功');
					}else{
						$('.weui-title').text('申诉失败');
						$('.statusName').text('申诉失败');
					}
				}
			}
			
		}else{
			console.log(data);
		}
	})
}
