$(function(){
	publicInterface('/account/getAgreement',{
		type:2
	},function(data){
		if(data.code == 200){
			var x = document.getElementsByClassName("myContent");
			x[0].innerHTML = data.data.content;
		}
	})
})
