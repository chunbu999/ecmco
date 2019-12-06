var ifSignUp;
var activeId;//投票id
var selectNum;//选取多少人
var pageSize = 10;
var pageNumber = 1;
var loading = false;
var dropDown = true;
$(function(){
	var showImg = true;
	var numll = 0;
	getIsIphonex ();
	//点击投票
	$(document).on("click", ".voteBtn", function() {
		var id = $(this).attr('data-id');		
	    tokenVerification('/vote/getVoteMultiple',{},function(data){
				if(data.code == 200){
					var tpl = `
						<div class="voteModal">
							<h4>投票数量</h4>	
							<span class="lineBottom"></span>
							<div class="voteContent">
								<div class="weui-cell">
									<div class="weui-cell__bd">
										<input class="weui-input" id="voteNum" type="number"  placeholder="请输入投票数量">
									</div>
									<div class="weui-cell__hd">票</div>
								</div>
								<p class="raido">手续费`+ data.data.poundage +`</p>
								<p class="tip">* 1ECM=1票，且只能投`+ data.data.multiple +`的整倍数。</p>
							</div>
						</div>
					`;
					$.confirm(tpl, function() {
				    	if(!$('#voteNum').val()){
				    		$.toast('请输入投票数量','text');
				    		return false;
				    	}
					    var data = {
					    	userId:id,
					      	num:$('#voteNum').val(),
					      	type:$('.title-select option:selected').val(),
					      	voteActivityId:activeId
					    };
					    tokenVerification('/vote/toVote',data,function(data){
					      	if(data.code == 200){
					      		$.toast(data.msg);
					      		pageNumber = 1;
					      		$('#sercher>ul').empty();
					      		voteFun();
					      		selectFun();
					      	}else{
					      		$.toast(data.msg,'text');
					      	}
					    })
				    }, function() {
				      //取消操作
				      location.reload();
				    });
	
				}
			})
	
	});
	$('.checkA').click(function(){
		var type = $('.title-select option:selected').val();
		location.href = 'noteVoting.html?type='+type+'&id='+activeId;
	})
	//获取活动详情
	activityDetail();
	
	$('.title-select').change(function(){
		var status = $(this).val();
		if(status == '0'){
			$('select').css('width','120px');
		}else{
			$('select').css('width','140px');
		}
		$('#sercher>ul').empty();
		activityDetail();//获取活动详情
	})
	
	//投票报名
	$('#enlistBtn').click(function(){
		var id = $(this).attr('data-id');
		//当前时间戳
		var nowTimes = Date.parse(new Date());
		//报名结束的时间
		var startTime = $('.signEnd').text();
		startTime = startTime.replace(/-/g,"/");
		var str1 = new Date(startTime.split(" ")).getTime();
		//投票开始的时间
		var endTime = $('.voteStart').text();
		endTime = endTime.replace(/-/g,"/");
		var str2 = new Date(endTime.split(" ")).getTime();
		if(str1 < nowTimes && str2 > nowTimes){
			$.toast('报名已结束','text');
			return false;
		}
		var data = {
			type:$('.title-select option:selected').val(),
			voteActivityId:id
		};
		tokenVerification('/vote/signUp',data,function(data){
			if(data.code == 200){
				$.toast(data.msg);
			}else{
				console.log(data);
				$.toast(data.msg);
			}
		})
	})
})
function selectFun(){
	tokenVerification('/vote/getChooseVote',{
		voteActivityId:activeId,
		type:$('.title-select option:selected').val(),
	},function(data){
		if(data.code == '200'){
			$('.numberDiv').text(data.data.count);
			$('.totalNum').text(data.data.person - data.data.count)
		}else{
			console.log(data)
		}
	})
}
if(dropDown){
	dropDown = false;
	//=========================下拉刷新
   	$(".outside").pullToRefresh().on("pull-to-refresh", function () {
       	setTimeout(function () {
           	pageNumber = 1;
           	$('#sercher>ul').html('');
           	votePelpo();
           	if (loading) loading = false;
           	$(".outside").pullToRefreshDone(); // 重置下拉刷新
       	}, 1500);   //模拟延迟
   	});
   	//============================滚动加载
   	$(".outside").infinite().on("infinite", function () {
       if (loading){
       	 return false;
       }
       loading = true;
       pageNumber++; //页数
       $('.weui-loadmore').show();
       setTimeout(function () {
           votePelpo();
           loading = false;
       }, 2500);   //模拟延迟
   	});
	var timerZX = setTimeout(function(){
		dropDown = true;
		clearTimeout(timerZX);
	},6000);
}


//获取投票页面的数据
function voteFun(){
	tokenVerification('/vote/voteInfo',{
		type:$('.title-select option:selected').val()
	},function(data){
		if(data.code == 200){
			var obj = data.data;
			$('.voted').text(obj.voteNum);
			$('.leftassets h2').text(obj.myEcm);
			$('.rightassets h2').text(obj.myVoteNum);
			votePelpo();
		}else{
			console.log(data)
		}
	})
}

//获取排名
function rankList(){
	var data = {
		type:$('#selectClass>option:selected').val(),
		pageSize:selectNum,
		pageNumber:1,
		voteActivityId:activeId
	};
	tokenVerification('/vote/getRanking',data,function(data){
		if(data.code == 200){
			var obj = data.data;
			$('#voteList').empty();
			if(obj.rows.length>0){
				for(var i = 0;i<obj.rows.length;i++){
					var tpl = '<tr>'+
							'<td>'+ (i > 2 ? obj.rows[i].rownum : '')  +'</td>'+
							'<td class="cenDiv">'+
								'<img class="header-img" src="'+ ((obj.rows[i].portrait) == "" ? '../../static/images/loginImg.png' : (imgHost+obj.rows[i].portrait)) +'" />'+
								'<span>'+ obj.rows[i].phone +'</span>'+
							'</td>'+
							'<td class="voteTick">'+ obj.rows[i].num +'</td>'+
						'</tr>';
					$('#voteList').append(tpl);
				}
			}else{
				$('#voteList').append("<td class='nodata' colspan='3'>暂无数据</td>");
			}
		}else{
			console.log(data)
		}
	})
}

//参与报名的人列表
function votePelpo(){
	var data = {
		type:$('.title-select option:selected').val(),
		voteActivityId:activeId,
		pageSize:pageSize,
		pageNumber:pageNumber
	};
	tokenVerification('/vote/getSignUpList',data,function(data){
		if(data.code == 200){
			var obj = data.data;
			if(obj.rows.length>0){
				var showIf;
				for(var i = 0;i<obj.rows.length;i++){
					switch (obj.rows[i].typeStatus){
						case '0':
							showIf = 'weui-hiden'
							break;
						case '1':
							showIf = ''
							break;
						default:
							break;
					}
					var tpl = `
						<li class="listType">
							<img src="`+ ((obj.rows[i].url) == "" ? '../../static/images/loginImg.png' : imgHost+obj.rows[i].url) +`" />
							<div class="shopTxt">
								<p>`+ obj.rows[i].phone +`</p>
								<p>`+ obj.rows[i].person +`人</p>
								<h2><span class="moneyNum">`+ obj.rows[i].num +`</span> ECM</h2>
								<a class="weui-btn voteBtn" type="button" data-id="`+ obj.rows[i].userId +`">为他投票<img src="../../static/images/xin.png" /></a>
							</div>
							<div class="selectImg `+ showIf +`">
								<img src="../../static/images/zhichi.png" />
							</div>
						</li>
					`;
					$('#sercher>ul').append(tpl); 
				}
			}else{
				$('#sercher>ul').append('<div class="weui-cells__title nodata" >已无更多数据</div>');
	            loading = true;
			}
			selectFun();//获取已投人数
			$(".weui-loadmore").hide();
		}else{
			$(".weui-loadmore").hide();
		}
	})
}

function activityDetail(){
	tokenVerification('/vote/getActivity',{},function(data){
		if(data.code == 200){
			var obj = data.data;
			activeId = obj.id;
			var arr = [];
			var votelist = obj.type;
			arr = votelist.split(',');
			for(var i = 0;i<arr.length;i++){
				if(arr.length>1){
					$('.firstColor').removeClass('hidden');
					$('.superVote').removeClass('hidden');
				}else{
					var all_options = document.getElementById("selectClass").options;
					for(var n = 0;n<all_options.length;n++){
						if(all_options[n].value == arr[i]){
							all_options[n].selected  = true;
						}else{
							all_options[n].setAttribute('class','hidden')
						}
					}
				}
			}
			var typeVote =$('.title-select option:selected').val();
			$('.signStart').text(obj.signStartDate);//报名的时间
			$('.signEnd').text(obj.signEndDate);
			$('.choice').text(obj.person);
			if(typeVote == 0){
				$('.voting').text('主节点');
				$('.voteStart').text(obj.oneVoteStartDate);//一轮投票的时间
				$('.voteEnd').text(obj.oneVoteEndDate);
				$('.selection').text(obj.num);
				if(arr.length>1){
					selectNum = obj.num;
				}else{
					selectNum = obj.number;
				}
			}else if(typeVote == 1){
				$('.voting').text('超级节点');
				$('.selection').text(obj.number);
				selectNum = obj.number;
				if(obj.twoVoteStartDate == null || obj.twoVoteStartDate == ''){
					$('.voteStart').text(obj.oneVoteStartDate);//二轮的投票时间
					$('.voteEnd').text(obj.oneVoteEndDate);
				}else{
					$('.voteStart').text(obj.twoVoteStartDate);//二轮的投票时间
					$('.voteEnd').text(obj.twoVoteEndDate);
				}				
			}
			$('#enlistBtn').attr('data-id',obj.id);
			if(obj.condition == 0){//未开始
				
			}else if(obj.condition == 1){//报名中
				$('#explain').removeClass('hidden');
			}else if(obj.condition == 2){//报名已结束
				$('#explain').removeClass('hidden');
			}else if(obj.condition == 3){//投票中
				$('.voteList').removeClass('hidden');
				$('.column').removeClass('hidden');
				voteFun();//获取投票页面的数据
			}else if(obj.condition == 4){//活动已结束
				$('#voteResult').removeClass('hidden');
				rankList();//排名列表
			}
//			if(obj.condition == 0){
////				$('.centerDiv').removeClass('hidden');
//				$('#explain').removeClass('hidden');
//				$('.outside').addClass('hidden');
//				$('#voteResult').addClass('hidden');
////				$('#enlistBtn').attr('disabled',false);
//			}else if(obj.condition == 1){
//				$('#explain').removeClass('hidden');
////				$('.centerDiv').addClass('hidden');
////				$('#enlistBtn').attr('disabled',false);
//				ifVoteFun();
//			}else{
//				$('#explain').addClass('hidden');
//				$('.outside').addClass('hidden');
//				$('#voteResult').removeClass('hidden');
//				rankList();//排名列表
//			}

			if($('#selectClass>option:selected').val() == 0){
				$('select').css('width','120px');
			}else{
				$('select').css('width','140px');
			}	
		}else{
			console.log(data)
		}
	})
}

function ifVoteFun(){
	//当前时间戳
	var nowTime = Date.parse(new Date());
	//投票开始的时间
	var startTime = $('.voteStart').text();
	startTime = startTime.replace(/-/g,"/");
	
	var str1 = new Date(startTime.split(" ")).getTime();
	//投票结束的时间
	var endTime = $('.voteEnd').text();
	endTime = endTime.replace(/-/g,"/");
	var str2 = new Date(endTime.split(" ")).getTime();
	if(str1 < nowTime && str2 > nowTime){
		$('#explain').addClass('hidden');
		$('.voteList').removeClass('hidden');
		voteFun();//获取投票页面的数据
	}else{
		$('#explain').removeClass('hidden');
		$('.voteList').addClass('hidden');
	}
}
