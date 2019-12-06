var herChart;
var options = null;

$(function(){
	var doms = document.getElementById("echartLine");
	herChart = echarts.init(doms);
	options = {
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
	        data:['交易单数','个人收益'],
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
	            name: '交易单数',
	        },
	        {
	            type: 'value',
	            name: '个人收益',
	        }
	    ],
	    series: [
	        {
	            name:'交易单数',
	            type:'bar',
	            data:[],
	            itemStyle:{ 
	            	normal:{ 
	            		color:'#E75050' 
	            	} 
	            },
	        },
	        {
	            name:'个人收益',
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
	if (options && typeof options === "object") {
	    herChart.setOption(options, true);
	}
})
