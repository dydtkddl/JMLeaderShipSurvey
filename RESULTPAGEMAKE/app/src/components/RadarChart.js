import React from 'react';
import Chart from 'react-apexcharts';

const RadarChart = ({ data, averageData }) => {
  console.log(averageData)
  const options = {
    chart: {
      type: 'radar',
      height: 200, // Increase height to make it larger
    },
    plotOptions: {
      radar: {
        size: 190, // Increase the size to make the chart more compact
        polygons: {
          strokeColor: '#efffff',
          // fill: {
          //   colors: ['#f8f8f8', '#fff']
          // }
          fill: {
            opacity: 0.4,
            // colors : "#ff12ff" // 데이터포인트 영역 채우기
          },
        }
      }
    },
    xaxis: {
      categories: data.categories,
    },
    yaxis: {
      max: 5, // Specify the maximum value for the y-axis
      show: true,
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val;
        }
      }
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }
    },
    colors: ['#00E396', '#775DD0'], // 사용자 데이터와 평균 데이터의 색상 설정
    fill: {
      opacity: 0.4,
    },
    markers: {
      size: 4,
      colors: ['#00E396', '#775DD0'], // 포인트 색깔 설정
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#00E396', '#775DD0'], // 선 색깔 설정
    },
    legend: {
      show: true,
      position: 'bottom',
    }
  };

  const series = [
    {
      name: 'Score',
      data:data.scores.map(score => parseFloat(score.toFixed(1))),
    },
    {
      name: 'Average Score',
      data: averageData.map(score => {
        return parseFloat(score.toFixed(1))}),
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="radar" height={550} width = {700}  />
    </div>
  );
};

export default RadarChart;
