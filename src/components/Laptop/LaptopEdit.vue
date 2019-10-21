<template>
<div id='app' class="container">

<div v-id="isAdmin">
 <router-link class="btn btn-primary" :to="{name: 'LaptopView', params:{laptopId : laptop.id}}"> Dejar de editar </router-link>
</div>


<h2> {{laptop.name}}</h2>

<div id= 'cabecera' class='row'>

<div id='LaptopImage' class='col justify-content-center'>
<img id="LaptopImagTag" alt="No image" :src="this.laptop.image_url"/>
</div>
<div id="ki" class ='col-2'>
     <div id="LaptopInfo" class="btn btn-primary"><img class="logo" alt="Kimovil Logo" src="../../assets/logo.png"/> {{laptop.ki}} </div>
</div>
<div id ='Score Graphic justify-content-center' class="col">
    <Chart/>
</div>

</div>

<div class = 'row'>
<div class = 'col'>
<label for="batteryScore">Battery Score: </label>
<input v-model.number="batteryScore" type="number">
<label for="batteryScore">Other Score: </label>
<input v-model.number="otherScore" type="number">
<label for="performanceScore">Performance Score: </label>
<input v-model.number="performanceScore" type="number">
<label for="displayScore">Display Score: </label>
<input v-model.number="displayScore" type="number">
</div>
</div>


<div class ='row'>

<table class="col table-primary table-striped">
<thead>
    <tr style="text-align:center;">
      <th class="TypeCol" >Type</th>
      <th >Name</th>
      <th class="ScoreCol" >Score</th>
    </tr>
  </thead>
<tbody>
<tr id='SpecificationsLaptop'  v-bind:key="specification.id" v-for="specification in specifications"> 
      <td >{{specification.type}}</td>
      <td class="NameCol">{{specification.name}}</td>
      <td v-if="filter(specification.type)"><vue-slider class="slider" @drag-end="saveSpecification(specification.id,specification.score)" :marks="marks" :tooltip-formatter="formatter" :enable-cross="false" :min='0' :max='5' :adsorb="true" :interval="0.1"  v-model="specification.score" > 
  </vue-slider>



      </td>

</tr>
</tbody> 
</table>

<div id ="Offers" class='.col-sm-'>
<OfferList :offers = "offers"/>
</div>




</div>
</div>
</template>

<script>

import Specificationlist from "../Specifications/Specificationlist.vue";
import OfferList from "../Offers/OffersList.vue";
import Chart from "./Chart.vue";
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/material.css';

export default {
    components: {
        Specificationlist,
        OfferList,
        Chart,
        VueSlider,
        
  },
    props:['laptopId'],
    data(){
        return{
            id: '',
            laptop : [],
            specifications: [],
            offers:[],
            marks: {
            '0': '😡',
            '1': '😭',
            '2': '😢',
            '3': '😑',
            '4': '😊',
            '5': '😆'
        },
        batteryScore : 0,
        performanceScore : 0,
        otherScore : 0,
        displayScore : 0,
        }

        
    },

 mounted: function() {

      this.$http.get('http://localhost:8000/api/laptopView?laptopId='+ this.$route.params.laptopId).then((result) => {
            this.laptop = result.data.Laptop
            this.specifications = result.data.Specifications
            this.offers = result.data.Offers
                    this.batteryScore = this.laptop.batteryScore
        this.performanceScore = this.laptop.performanceScore
        this.otherScore = this.laptop.otherScore
        this.displayScore = this.laptop.displayScore
        })

 

 }, methods:{
     saveSpecification(id, score){
        const formData = new FormData();
        var token = "JWT " + this.$cookies.get("token");
        formData.append("score", score);
        formData.append("id", id);
        this.$http
      .post("http://localhost:8000/api/saveSpecification",formData,{
          headers: { Authorization: token }
        }).then(result => {
        this.saved = result.data.message;
        });
    }, filter(type){
        var res = false
        console.log(type)
        if(type == 'CPU' || type == 'GPU' || type == 'STORAGE' || type == 'CPU_MAX' || type == 'BATERY_DURATION' || 
        type == 'CACHE' || type == 'RAM' || type == 'CAMERA' || type == 'MEMORY_CARDS' || type == 'DISPLAY_RESOLUTION' 
        || type == 'DISPLAY' || type == 'WIRELESS' || type == 'STORAGE2'){
            res =  true
        }
        return res
    }
 }
}
</script>

<style scoped>
#ki{
    margin:auto;
}
.ScoreCol{
    width:25%;
}
td{
padding-bottom: 50px !important;
}
.NameCol{
    text-align: center;
}
.slider{
    width: 95% !important;
}

</style>