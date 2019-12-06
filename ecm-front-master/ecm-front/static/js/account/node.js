$(function(){
	//节点协议
	argumentsFun(agreementApi,{
		type:1
	},function(data){
		if(data.code == 200){
			var x = document.getElementsByClassName("nodeOnes");
			x[0].innerHTML = data.data.content;
		}else{
			console.log(data)
		}
	})
})