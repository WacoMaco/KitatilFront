<template>


<div id="chart">
     <apexchart type=radar height=350 :options="chartOptions" :series="series" />
</div>

</template>

<script>
import ApexCharts from 'apexcharts'
import Vue from 'vue'
export default {
      el: '#chart',
      components: {
        apexchart: ApexCharts,
      },
      data: {

      },mounted: function(){
        var options = {
          
        chart: {
          type: 'radar',
          
        },
        series: [{
          name: 'Score',
          data: [4,3,5,1]
        }],
        fill: {
          opacity: 0.7,
          colors: ['#B0AAF5']
        },
        xaxis: {
          categories: ['💻','🔋','Other','📺'],
           style: {
                fontSize: '50px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-xaxis-label',
            },
        
        
        },plotOptions: {
                radar: {
                    size: 110,
                   
                    polygons: {
                        connectorColors: '',
                        strokeColor: '',
                        fill: {
                            colors: ['#685CF2']
                        }
                    }
                }
        },
        colors: ['#FF4560'],
       markers: {
      colors: ['#fff'],
      strokeColor: '#FF4560',
      size: 3,
      hover: {
        size: 10
      },
    },yaxis:{
      show:false,
    }


      }
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
      }

    }


</script>

<style>
apexcharts-xaxis-label{
  background:black;
}



</style>