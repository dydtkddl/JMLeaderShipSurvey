import React from 'react';
import Chart from 'react-apexcharts';

const GroupedBarChart = ({ data, title, explanation, averageData }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    colors: ['#00E396'],
    tooltip: {
      y: {
        formatter: function(value) {
          return value.toFixed(1); // 소숫점 1자리까지 반올림
        }
      }
    },
    dataLabels: {
      formatter: function (val, opt) {
        const goals = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals;
        if (goals && goals.length) {
          return `${val} / ${goals[0].value}`;
        }
        return val;
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['YOU', 'Other Average'],
      markers: {
        fillColors: ['#00E396', '#775DD0'],
      },
    },
    yaxis:{
      max : 5
    },
    xaxis: {
      categories: data.categories,
    },
  };

  
  
  const series = [
    {
      name: 'Actual',
      data: data.scores.map((score, index) => ({
        x: data.categories[index],
        y: parseFloat(score.toFixed(1)),
        goals: [
          {
            name: 'Average',
            value: parseFloat(averageData[index].toFixed(1)),
            strokeWidth: 2,
            strokeDashArray: 2,
            strokeColor: '#775DD0',
          },
        ],
      })),
    },
  ];

  return (
<div  >
  <h2>{title}</h2>
  <div id ="chart" >
    <Chart options={options} series={series} type="bar" height={350} />
  </div>
  <p className="explanation">{explanation}</p>
</div>
  );
};

export default GroupedBarChart;
