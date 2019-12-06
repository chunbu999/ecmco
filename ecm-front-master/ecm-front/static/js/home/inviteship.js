$(function(){
	var userInfo = JSON.parse(localStorage.getItem('userInfo'));
	if(userInfo != ''){
		$('#inviteNum').val(userInfo.refereeCode);
		$('#copy-pp').text(userInfo.refereeCode);
		var onlylink = shareLink+'/template/home/linkregiter.html?code='+userInfo.refereeCode
		$('#qrcodeLink').val(onlylink);
		$('#link-pp').text(onlylink)
	}
	//复制邀请码
	$('#copyBtn').click(function(){
		jsCopy();
	})
	//复制注册链接
	$('.addShip').click(function(){
		var _this = $(this);
		linkCopy(_this);
	})
	$('.poster').click(function(){
		location.href = 'poster.html';
	})
	rankingList();

	$('.enterbtns>a').click(function(){
		$('#qrcode').empty();
		$('.weui-mask--visible').css('display','block');
		$('.weui-dialog--visible').css('display','block');
		tokenVerification('/account/getImmediately',{},function(data){
			if(data.code == 200){
				$('.qrcode>img').attr('src',imgHost+data.data.qrcode)
			}else{
				console.log(data)
			}
		})
	})
	$('.deleteDiv').click(function(){
		$('.weui-mask--visible').css('display','none');
		$('.weui-dialog--visible').css('display','none');
	})
})


function copyUrl() {
	var Url = document.getElementById("inviteNum");
	if(Url){
		Url.select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		$.toast("已复制");
	}else{
		$.toast(Url);
	}

}
//复制邀请码
function jsCopy(){
    var u = navigator.userAgent;
    //苹果
    if (u.match(/(iPhone|iPod|iPad);?/i)) {
        var copyDOM = document.getElementById("copy-pp");  //要复制文字的节点
        var range = document.createRange();
        // 选中需要复制的节点
        range.selectNode(copyDOM);
        // 移除选中的元素
        window.getSelection().removeAllRanges();
        // 执行选中元素
        window.getSelection().addRange(range);
        // 执行 copy 操作
        var successful = document.execCommand('copy');
        try {
            var msg = successful ? '已复制' : '失败';
            $.toast(msg);
        } catch(err) {
            $.toast(err,'text');
        }

    }

    // 安卓
    if(u.indexOf('Android') > -1 ){
		copyUrl();
    }

}
//复制注册链接
function linkCopy(obj){
	var us = navigator.userAgent;
    //苹果
    if (us.match(/(iPhone|iPod|iPad);?/i)) {
    	var copyDOM = obj[0].parentNode.children[2];
        var range = document.createRange();
        // 选中需要复制的节点
        range.selectNode(copyDOM);
        // 移除选中的元素
        window.getSelection().removeAllRanges();
        // 执行选中元素
        window.getSelection().addRange(range);
//      var copyDOMs = document.getElementById("link-pp");  //要复制文字的节点
//      var ranges = document.createRange();
//      // 选中需要复制的节点
//      ranges.selectNode(copyDOMs);
//      // 执行选中元素
//      window.getSelection().addRange(ranges);
        // 执行 copy 操作
        var successfuls = document.execCommand('copy');
        try {
            var msg = successfuls ? '已复制' : '失败';
            $.toast(msg);
        } catch(err) {
            $.toast(err,'text');
        }

    }
	// 安卓
    if(us.indexOf('Android') > -1 ){
		var Url = document.getElementById("qrcodeLink");
		Url.select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		$.toast("已复制");
    }
}

function rankingList(){
	tokenVerification(rankingApi,{},function(data){
		if(data.code == 200){
			var obj = data.data;
			if(obj.length>0){
				if(obj.length == 1){
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
							<p class="names">`+ obj[0].uId +`</p>
							<p><span>`+ obj[0].number +`</span> ECM</p>
						</div>
					</li>
					<li>
						<img src="../../static/images/jijun.png" />
						<div class="brandtxt">
							<p class="names">暂无数据</p>
						</div>
					</li>
				`;
				}else if(obj.length == 2){
					var tpl = `
					<li>
						<img src="../../static/images/yajun.png" />
						<div class="brandtxt">
							<p class="names">`+ obj[1].uId +`</p>
							<p><span>`+ obj[1].number +`</span> ECM</p>
						</div>
					</li>
					<li>
						<img src="../../static/images/guanjun.png" />
						<div class="brandtxt">
							<p class="names">`+ obj[0].uId +`</p>
							<p><span>`+ obj[0].number +`</span> ECM</p>
						</div>
					</li>
					<li>
						<img src="../../static/images/jijun.png" />
						<div class="brandtxt">
							<p class="names">暂无数据</p>
						</div>
					</li>
				`;
				}else {
					var tpl = `
						<li>
							<img src="../../static/images/yajun.png" />
							<div class="brandtxt">
								<p class="names">`+ obj[1].uId +`</p>
								<p><span>`+ obj[1].number +`</span> ECM</p>
							</div>
						</li>
						<li>
							<img src="../../static/images/guanjun.png" />
							<div class="brandtxt">
								<p class="names">`+ obj[0].uId +`</p>
								<p><span>`+ obj[0].number +`</span> ECM</p>
							</div>
						</li>
						<li>
							<img src="../../static/images/jijun.png" />
							<div class="brandtxt">
								<p class="names">`+ obj[2].uId +`</p>
								<p><span>`+ obj[2].number +`</span> ECM</p>
							</div>
						</li>
					`;
				}
				$('.ranking ul').append(tpl)
			}
		}else{
			console.log(data)
		}
	})
}
