<template>
  <div id="chart">
    <apexchart type="radar" height="350" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
import Vue from "vue";
export default {
  el: "#chart",
  components: {
    apexchart: ApexCharts
  },
  props: ["performanceScore", "batteryScore", "otherScore", "displayScore"],
  data: {
    chart: ""
  },
  mounted: function() {
    var options = {
      chart: {
        type: "radar"
      },
      series: [
        {
          name: "Score",
          data: ["0", "0", "0", "0"]
        }
      ],
      fill: {
        opacity: 0.7,
        colors: ["#B0AAF5"]
      },
      xaxis: {
        categories: ["💻", "🔋", "Other", "📺"],
        style: {
          fontSize: "50px",
          fontFamily: "Helvetica, Arial, sans-serif",
          cssClass: "apexcharts-xaxis-label"
        }
      },
      responsive: [
        {
          breakpoint: 1200,
          options: {
            plotOptions: {
              radar: {
                size: 60
              }
            }
          }
        },
        {
          breakpoint: 800,
          options: {
            plotOptions: {
              radar: {
                size: 30
              }
            }
          }
        }
      ],

      plotOptions: {
        radar: {
          size: 110,

          polygons: {
            connectorColors: "",
            strokeColor: "",
            fill: {
              colors: ["#685CF2"]
            }
          }
        }
      },
      colors: ["#FF4560"],
      markers: {
        colors: ["#fff"],
        strokeColor: "#FF4560",
        size: 3,
        hover: {
          size: 10
        }
      },
      yaxis: {
        show: false
      }
    };
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    this.chart = chart;
  },
  watch: {
    performanceScore(val) {
      var chart = this.chart;
      chart.updateSeries([
        {
          data: [
            this.performanceScore,
            this.batteryScore,
            this.otherScore,
            this.displayScore
          ]
        }
      ]);
    }
  }
};
</script>

<style>
apexcharts-xaxis-label {
  background: black;
}

#chart {
  max-width: 760px;
  margin: 35px auto;
  opacity: 0.9;
}
</style>