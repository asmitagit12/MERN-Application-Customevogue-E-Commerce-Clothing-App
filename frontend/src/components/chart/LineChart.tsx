import React from "react";
import ReactApexChart from "react-apexcharts";

interface LineChartProps {
  data: {
    categories: string[]; // X-axis labels
    series: { name: string; data: number[] }[]; // Data series
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.categories,
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      enabled: true,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#007BFF"],
  };

  return (
    <ReactApexChart
      options={options}
      series={data.series}
      type="line"
      height={300}
    />
  );
};

export default LineChart;
