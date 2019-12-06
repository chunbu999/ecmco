$(function(){
	var id = $('.weui-navbar>a.weui-bar__item--on').attr('data-id');
	rankIngFun(id)
	
	$('.weui-navbar>a').click(function(){
		var id = $(this).attr('data-id');
		rankIngFun(id);
	})
})

function rankIngFun(id){
  	$.showLoading('数据加载中');
	tokenVerification(topApi,{
		type:id
	},function(data){
		if(data.code == 200){
          	$.hideLoading();
			var obj = data.data;
			$('#threeList').empty();
			$('#lastList').empty();
			var showClass;
			if(id == 0){
				showClass = 'ECM';
			}else if(id == 1){
				showClass = 'TRA';
			}else{
				showClass = '单';
			}
			$('.rankNum>span').text(obj.ranking);
			if(obj.list.length>0){
				if(obj.list.length == 1){
					var tpl = `
						<li>
							<img src="../../static/images/yajun.png" />
							<div class="brandtxt">
								<p class="names">暂无数据</p>
							</div>
						</li>
						<li>
							<img src="../../static/images/guanjun.png" />
							<div class="brandtxt">
								<p class="names">`+ obj.list[0].uId +`</p>
								<p><span>`+ obj.list[0].number +`</span> `+ showClass +`</p>
							</div>
						</li>
						<li>
							<img src="../../static/images/jijun.png" />
							<div class="brandtxt">
									<p class="names">暂无数据</p>
							</div>
						</li>
					`;
				}else if(obj.list.length == 2){
					var tpl = `
						<li>
							<img src="../../static/images/yajun.png" />
							<div class="brandtxt">
								<p class="names">`+ obj.list[1].uId +`</p>
								<p><span>`+ obj.list[1].number +`</span> `+ showClass +`</p>
							</div>
						</li>
						<li>
							<img src="../../static/images/guanjun.png" />
							<div class="brandtxt">
								<p class="names">`+obj.list[0].uId +`</p>
								<p><span>`+ obj.list[0].number +`</span> `+ showClass +`</p>
							</div>
						</li>
						<li>
							<img src="../../static/images/jijun.png" />
							<div class="brandtxt">
								<p class="names">暂无数据</p>
							</div>
						</li>
					`;
				}else{
					var tpl = `
						<li>
							<img src="../../static/images/yajun.png" />
							<div class="brandtxt">
								<p class="names">`+ obj.list[1].uId +`</p>
								<p><span>`+ obj.list[1].number +`</span> `+ showClass +`</p>
							</div>
						</li>
						<li>
							<img src="../../static/images/guanjun.png" />
							<div class="brandtxt">
								<p class="names">`+ obj.list[0].uId +`</p>
								<p><span>`+ obj.list[0].number +`</span> `+ showClass +`</p>
							</div>
						</li>
						<li>
							<img src="../../static/images/jijun.png" />
							<div class="brandtxt">
								<p class="names">`+ obj.list[2].uId +`</p>
								<p><span>`+ obj.list[2].number +`</span> `+ showClass +`</p>		
							</div>
						</li>
					`;
				}
				$('#threeList').append(tpl)
			}	
			
			if(obj.list.length>3){
				
				for(var n = 3;n<obj.list.length;n++){
					var npc = `
						<li>
							<p class="indexNum"><b>`+ obj.list[n].rownum +`</b> <span>`+ obj.list[n].uId +`</span></p>
							<p>`+ obj.list[n].number+showClass +`</p>
						</li>
					`;
					$('#lastList').append(npc);
				}
			}
		}else{
          	$.hideLoading();
			console.log(data);
		}
	})
}
