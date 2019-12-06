$(function(){
	argumentsFun(agreementApi,{
		type:0
	},function(data){
		if(data.code == 200){
			var x = document.getElementsByClassName("distributorOne");
			x[0].innerHTML = data.data.content;
		}else{
			console.log(data)
		}
	})
})
