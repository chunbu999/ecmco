var bannerNum = 0;
$(function(){
   	var bannerTxt = JSON.parse(localStorage.getItem('bannerTxt'));
   	if(bannerTxt != null && bannerTxt != ''){
   		localStorage.removeItem('bannerTxt');
   		bannerInfo(bannerTxt);//直接渲染
   	}else{
   		$.showLoading("数据加载中");
   		bannerFun();//请求
   	}
	userInfoFun();
	$('#ecmmmmm .leftassets h2').click(function(){
		var value = $(this).text();
		location.href="myassets.html?asset="+value;
	})
	$('#ecmmmmm .rightassets h2').click(function(){
		var value = $(this).text();
		location.href="sell.html?asset="+value;
	})

	getIsIphonex ()
})

//获取banner图
function bannerFun(){
	tokenVerification('/person/getManageSlide',{},function(data){
		if(data.code == 200){
			var txt = data.data;
			bannerInfo(txt)
		}else{
			$.hideLoading();
		}

	})
}

//渲染banner图信息
function bannerInfo(txt){
	bannerNum = bannerNum+1;
	localStorage.setItem('bannerTxt',JSON.stringify(txt));
	$.hideLoading();
	$(".swiper-container").swiper({
	    loop: true,
	    autoplay:2000
	});
	var obj = txt;
	$('.imgNumber').text(obj.proportion);
	var str = (obj.destruction).toString();
	var strs = [];
	strs = str.split('');
	$('#newTotal ul').empty();
	if(strs.length > 0){
		for (var i =0;i<str.length ;i++ ){
			var tpl = '<li>'+ strs[i] + '</li>';
			$('#newTotal ul').append(tpl);
		}
	}
	var str1 = (obj.dropNumber).toString();
	var strn = [];
	strn = str1.split('');
	$('#surplusTotal ul').empty();
	if(strn.length > 0){
		for (var i =0;i<str1.length ;i++ ){
			var tpls = '<li>'+ strn[i] +'</li>';
			$('#surplusTotal ul').append(tpls);
		}
	}
	$('.reform').empty();
	$('.listFun').empty();
	if(obj.communityList.length>0){
		if(obj.communityList.length == 1){
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
		         		<p class="names">`+ obj.communityList[0].uId +`</p>
		         		<p><span>`+ obj.communityList[0].number +`</span> TRA</p>
		        	</div>
		       	</li>
		       	<li>
		        	<img src="../../static/images/jijun.png" />
		        	<div class="brandtxt">
		         		<p class="names">暂无数据</p>
		        	</div>
		       </li>
			`
		}else if(obj.communityList.length == 2){
			var tpl = `
				<li>
		        	<img src="../../static/images/yajun.png" />
		        	<div class="brandtxt">
		         		<p class="names">`+ obj.communityList[1].uId +`</p>
		         		<p><span>`+ obj.communityList[1].number +`</span> TRA</p>
		        	</div>
				</li>
				<li>
		        	<img src="../../static/images/guanjun.png" />
		        	<div class="brandtxt">
		         		<p class="names">`+ obj.communityList[0].uId +`</p>
		         		<p><span>`+ obj.communityList[0].number +`</span> TRA</p>
		        	</div>
		       	</li>
		       	<li>
		        	<img src="../../static/images/jijun.png" />
		        	<div class="brandtxt">
		         		<p class="names">暂无数据</p>
		        	</div>
		       </li>
			`
		}else{
			var tpl = `
				<li>
		        	<img src="../../static/images/yajun.png" />
		        	<div class="brandtxt">
		         		<p class="names">`+ obj.communityList[1].uId +`</p>
		         		<p><span>`+ obj.communityList[1].number +`</span> TRA</p>
		        	</div>
				</li>
				<li>
		        	<img src="../../static/images/guanjun.png" />
		        	<div class="brandtxt">
		         		<p class="names">`+ obj.communityList[0].uId +`</p>
		         		<p><span>`+ obj.communityList[0].number +`</span> TRA</p>
		        	</div>
		       	</li>
		       	<li>
		        	<img src="../../static/images/jijun.png" />
		        	<div class="brandtxt">
		         		<p class="names">`+ obj.communityList[2].uId +`</p>
		         		<p><span>`+ obj.communityList[2].number +`</span> TRA</p>
		        	</div>
		        	</div>
		       </li>
			`;
		}
		$('.reform').append(tpl);
	}else{

	}
	if(obj.tradOrderList.length>0){
		if(obj.tradOrderList.length == 1){
			var tpls = `
				<li>
		        	<img src="../../static/images/yajun.png" />
		        	<div class="brandtxt">
		         		<p class="names">暂无数据</p>
		        	</div>
				</li>
				<li>
		        	<img src="../../static/images/guanjun.png" />
		        	<div class="brandtxt">
		         		<p class="names">`+ obj.tradOrderList[0].uId +`</p>
		         		<p><span>`+ obj.tradOrderList[0].number +`</span> 单</p>
		        	</div>
		       	</li>
		       	<li>
		        	<img src="../../static/images/jijun.png" />
		        	<div class="brandtxt">
		         		<p class="names">暂无数据</p>
		        	</div>
		       </li>
			`
		}else if(obj.tradOrderList.length == 2){
			var tpls = `
				<li>
		        	<img src="../../static/images/yajun.png" />
		        	<div class="brandtxt">
		         		<p class="names">`+ obj.tradOrderList[1].uId +`</p>
		         		<p><span>`+ obj.tradOrderList[1].number +`</span> </p>
		        	</div>
				</li>
				<li>
		        	<img src="../../static/images/guanjun.png" />
		        	<div class="brandtxt">
		         		<p class="names">`+ obj.tradOrderList[0].uId +`</p>
		         		<p><span>`+ obj.tradOrderList[0].number +`</span> 单</p>
		        	</div>
		       	</li>
		       	<li>
		        	<img src="../../static/images/jijun.png" />
		        	<div class="brandtxt">
		         		<p class="names">暂无数据</p>
		        	</div>
		       </li>
			`
		}else{
			var tpls = `
				<li>
		        	<img src="../../static/images/yajun.png" />
		        	<div class="brandtxt">
		         		<p class="names">`+ obj.tradOrderList[1].uId +`</p>
		         		<p><span>`+ obj.tradOrderList[1].number +`</span> 单</p>
		        	</div>
				</li>
				<li>
		        	<img src="../../static/images/guanjun.png" />
		        	<div class="brandtxt">
		         		<p class="names">`+ obj.tradOrderList[0].uId +`</p>
		         		<p><span>`+ obj.tradOrderList[0].number +`</span> 单</p>
		        	</div>
		       	</li>
		       	<li>
		        	<img src="../../static/images/jijun.png" />
		        	<div class="brandtxt">
		         		<p class="names">`+ obj.tradOrderList[2].uId +`</p>
		         		<p><span>`+ obj.tradOrderList[2].number +`</span> 单</p>
		        	</div>
		        	</div>
		       </li>
			`;
		}
		$('.listFun').append(tpls);
	}else{
		var tpls = `
			<li>
	        	<img src="../../static/images/yajun.png" />
	        	<div class="brandtxt">
	         		<p class="names">暂无数据</p>
	        	</div>
			</li>
			<li>
	        	<img src="../../static/images/guanjun.png" />
	        	<div class="brandtxt">
	         		<p class="names">暂无数据</p>
	        	</div>
	       	</li>
	       	<li>
	        	<img src="../../static/images/jijun.png" />
	        	<div class="brandtxt">
	         		<p class="names">暂无数据</p>
	        	</div>
	       </li>
		`;
		$('.listFun').append(tpls);
	}

	if(bannerNum == 1){
		bannerFun();
	}
}

//获取个人信息
function userInfoFun(){
	tokenVerification(userInfoApi,{},function(data){
		if(data.code == 200){
			var obj = data.data;
			var user = JSON.stringify(obj);
			localStorage.setItem('userInfo',user);
			var userNode;
			switch (obj.userType){
				case '0':
					userNode = "普通用户"
					break;
				case '1':
					userNode = "支持节点"
					break;
				case '2':
					userNode = "主节点"
					break;
				case '3':
					userNode = "超级节点"
					break;
				default:
					break;
			}
			$('#account').text(obj.nickName);
			$('#unid').text(obj.uid);
			$('.superNode').text(userNode);
			$('.totalMoney').text(obj.totalAssets);
			$('.leftassets h2').text(obj.assets);
			$('.rightassets h2').text(obj.sell);
			//USDT
			$('#totalMoneyUsdt').text(obj.usdt+obj.frozen);
			$('#leftassetsUsdt h2').text(obj.usdt);
			$('#rightassetsUsdt h2').text(obj.frozen);

			$('#userHead').attr('src',(obj.portrait == "" ? '../../static/images/loginImg.png' : imgHost+obj.portrait))
			var str = (obj.communityCountDay).toString();
			var strs = [];
			strs = str.split('');
			if(strs.length > 0){
				for (var i =0;i<str.length ;i++ ){
					var tpl = `
						<li>`+ strs[i] +`</li>
					`;
					$('.community ul').append(tpl);
				}
			}
		}
	})
}
