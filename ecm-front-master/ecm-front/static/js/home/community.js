var myChart;
var option = null;

$(function(){
	myCommunity();
	var dom = document.getElementById("container");
	myChart = echarts.init(dom);
//	
//	var app = {};
//	
//	app.title = '折柱混合';
	
	option = {
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
	    toolbox: {
	    	show:false,
	        feature: {
	            dataView: {show: true, readOnly: false},
	            magicType: {show: true, type: ['line', 'bar']},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        }
	    },
	    legend: {
	        data:['邀请人数','活跃用户'],
	        right: '0'
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: [],
	            axisPointer: {
	                type: 'shadow'
	            }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '邀请人数',
//	            min: 0,
//	            max: 250,
//	            interval: 50
	        },
	        {
	            type: 'value',
	            name: '活跃用户',
//	            min: 0,
//	            max: 25,
//	            interval: 5
	        }
	    ],
	    series: [
	        {
	            name:'邀请人数',
	            type:'bar',
	            data:[],
	            itemStyle:{ 
	            	normal:{ 
	            		color:'#E75050' 
	            	} 
	            },
	        },
	        {
	            name:'活跃用户',
	            type:'bar',
	            data:[],
	        	itemStyle:{ 
	            	normal:{ 
	            		color:'#439CEC' 
	            	} 
	            },
	        }
	    ]
	};
	

	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
	
	$('#imgCopy').click(function(){
		copy();
	})
})

function myCommunity(){
	tokenVerification(communityApi,{},function(data){
		if(data.code == 200){
			var obj = data.data;
			$('.ifbind').text(obj.bind);
			$('#inviteTxt').text(obj.inviteCode);
			$('.nickNode').text(obj.userType);
			$('.direct').text(obj.directDriveCount);
			$('.general').text(obj.communityCount);
			$('.trading').text(obj.tradCount);
			$('.earnings').text((obj.toMonthCount) == '' ? 0 : (obj.toMonthCount));
			var timeData = [];//时间
			var pelpeoData = [];//活跃人数
			var inviteData = [];//邀请人数
			var timerData = [];//时间
			var trantionData = [];//交易单数
			var selfData = [];//个人收益
			$('#definite').empty();
			$('#tradingVolume').empty();
			//每月明细
			for(var i=0; i<obj.statisticalVoList.length; i++){
				timeData.push(obj.statisticalVoList[i].createDate);
				pelpeoData.push(obj.statisticalVoList[i].number);
				inviteData.push(obj.statisticalVoList[i].count);
				var tpl = `
					<tr>
		    			<td>`+ obj.statisticalVoList[i].createDate +`</td>
		    			<td>`+ obj.statisticalVoList[i].count+`</td>
		    			<td>`+ obj.statisticalVoList[i].number+`</td>
		    			<td>`+ obj.statisticalVoList[i].community+`</td>
		    		</tr>
				`;
				$('#definite').append(tpl);
			}
			for(var i=0; i<obj.statisticalVoTradList.length; i++){
				timerData.push(obj.statisticalVoTradList[i].createDate);
				trantionData.push(obj.statisticalVoTradList[i].count);
				selfData.push(obj.statisticalVoTradList[i].number);
				var tpl = `
					<tr>
		    			<td>`+ obj.statisticalVoTradList[i].createDate +`</td>
		    			<td>`+ obj.statisticalVoTradList[i].count+`</td>
		    			<td>`+ obj.statisticalVoTradList[i].number+`</td>
		    		</tr>
				`;
				$('#tradingVolume').append(tpl);
			}
			option.xAxis[0].data = timeData;
			option.series[0].data = inviteData;
			option.series[1].data = pelpeoData;
			options.xAxis[0].data = timerData;
			options.series[0].data = trantionData;
			options.series[1].data = selfData;
			myChart.setOption(option, true);
			herChart.setOption(options, true);
		}
	})
}

function copy() {

	var u = navigator.userAgent;
    //苹果
    if (u.match(/(iPhone|iPod|iPad);?/i)) {
        var copyDOM = document.getElementById("inviteTxt");  //要复制文字的节点
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
		var text =document.getElementById("inviteTxt").innerText; 
		var input = document.createElement('input'); 
		input.setAttribute('id', 'copyInput'); 
		input.setAttribute('value', text); 
		document.getElementsByTagName('body')[0].appendChild(input); 
		document.getElementById('copyInput').select(); 
		if (document.execCommand('copy')) { 
			$.toast('已复制'); 
		} 
		document.getElementById('copyInput').remove(); 
    }
	
	
}