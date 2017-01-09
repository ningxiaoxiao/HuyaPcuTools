var myChart = echarts.init(document.getElementById('main'));

$.get('data2.json').done(function(datastr){

  var data=eval(datastr)
  var totalcount=[];
  var time=[];

  data.forEach(function(e) {
    totalcount.push(e.totalcount);
    time.push(getLocalTime(e.timesamp));
  });

  function getLocalTime(nS) {
    var date = new Date(parseInt(nS) * 1000);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();

    return h + m + s + '\r\n' + Y + M + D;
  }

  option = {
    title: {
      text: '虎牙户外总在线人数',
      x: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      x: 'left',
      data:['总人数']
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: {readOnly: false},
        magicType: {type: ['line', 'bar']},
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [{
      type: 'slider',
    }],
    xAxis: [{
      name: '时间',
      data:time,
    }],
    yAxis: [{
      name: '人数',
      type: 'value'
    }],
    series: [{
      name: '总人数',
      data: totalcount,
      type: 'line',
      markPoint:{
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      }
    }
    ]

  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);

})