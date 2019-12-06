$(function(){
	//获取成为节点条件
	tokenVerification('/account/getConditions',{
		type:'1'
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			$('.day').text(obj.day);
			$('.orderNum').text(obj.orderNum);
			$('.coinNum').text(obj.coinNum);
			$('.linesNum').text(obj.linesNum);
			$('.procedure').text(obj.procedure);
		}else{
			console.log(data);
		}
	})
})
