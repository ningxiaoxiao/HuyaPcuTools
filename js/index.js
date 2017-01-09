var myChart = echarts.init(document.getElementById('main'));

$.get('data.json').done(function(datastr){

  var data=eval(datastr)
  var timedata = [];
  var livecount = [];
  var acAdd = [];//订
  var acAddLast = [];
  var totalcount=[];
  var name =data[0].nick;
  var acAddLastValue = data[0].activitycount;



  var lastAc=0;
  var lasttitle="";
  data.forEach(function(e) {
    if(e.title!=lasttitle)//重新开播了
    {
      lastAc= e.activitycount;//重新开播订阅人数增长

      acAddLastValue= e.activitycount;//防止出现很高增长

      lasttitle= e.title;
    }


    timedata.push(getLocalTime(e.timesamp));
    livecount.push(e.livecount);
    totalcount.push(e.totalcount);
    acAdd.push(e.activitycount - lastAc);
    acAddLast.push(e.activitycount - acAddLastValue);
    acAddLastValue = e.activitycount;
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
      text: name +' 在线人数与订阅增减分析',
      x: 'center'
    },
    legend: {
      x: 'left',
      data: ['在线人数', '订阅人数', '订阅增长']
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params, ticket, callback) {

        var c=data[params[0].dataIndex].title+'<br>'+params[0].name+'<br>';

        c+= '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[0].color+'"></span>';
        c+=params[0].seriesName+':'+params[0].value+'<br>';

        c+= '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[1].color+'"></span>';
        c+=params[1].seriesName+':'+params[1].value+'<br>';

        c+= '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[2].color+'"></span>';
        c+=params[2].seriesName+':'+params[2].value+'<br>';


        return c;
      }

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
      type: 'category',
      boundaryGap: false,
      data: timedata,
    }],
    yAxis: [{
      name: '人数',
      type: 'value'
    }],
    series: [{
      name: '订阅增长',
      data: acAddLast,
      type: 'bar',
      areaStyle: {
        normal: {}
      },
      barGap: '1%',
      barWidth: 100,
      markPoint:{
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      }
    },{
      name: '在线人数',
      data: livecount,
      type: 'line',
      areaStyle: {
        normal: {}
      },
      smooth: true,
      smoothMonotone: '',
      markPoint:{
        data:[
          {type:'max',
            name:'最高在线'}
        ]
      }

    }, {
      name: '订阅人数',
      data: acAdd,
      type: 'line',
      areaStyle: {
        normal: {}
      },
      smooth: true,
      smoothMonotone: '',
    },
    ]

  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);

})