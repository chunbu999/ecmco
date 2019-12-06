$(function(){
	//获取成为经纪商条件
	tokenVerification('/account/getConditions',{
		type:'0'
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			$('.coinPrice').text(obj.price);
		}else{
			console.log(data);
		}
	})
})
