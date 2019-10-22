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

<div class = 'row scoresEditBox'>
<div class='col'>
<label for="batteryScore">Battery Score: </label>
<input v-on:keydown="keyboard" :max="5" :min=0 class="ScoreEdit form-control" v-model.number="batteryScore" type="number">
</div>
<div class='col'>
<label for="batteryScore">Other Score: </label>
<input v-on:keydown="keyboard" :max="5" :min=0 class="ScoreEdit form-control" v-model.number="otherScore" type="number">
</div>
<div class='col'>
<label for="performanceScore">Performance Score: </label>
<input v-on:keydown="keyboard" :max="5" :min=0 class="ScoreEdit form-control" v-model.number="performanceScore" type="number">
</div>
<div class='col'>
<label for="displayScore">Display Score: </label>
<input v-on:keydown="keyboard" :max="5" :min=0 class="ScoreEdit form-control" v-model.number="displayScore" type="number">
</div>
</div>

<div class="row justify-content-center">
<div v-on:click="SaveConfirm" class="btn btn-primary"> Guardar </div>
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
     SaveConfirm(){
      this.$bvModal.msgBoxConfirm('¿Quieres guardar las scores?')
          .then(value => {
            if(value == true){
                this.SaveScore();
            }
          })
     },
     SaveScore(){
        const formData = new FormData();
        var token = "JWT " + this.$cookies.get("token");
        formData.append("performanceScore", this.performanceScore);
        formData.append("otherScore", this.otherScore);
        formData.append("batteryScore", this.batteryScore);
        formData.append("displayScore", this.displayScore);
        formData.append("id", this.laptop.id);
        this.$http
      .post("http://localhost:8000/api/saveScores",formData,{
          headers: { Authorization: token }
        }).then(result => {
        this.$bvModal.msgBoxOk('Scores guardados',  {
                    okTitle:'Aceptar'
                  });
        });
     },
     keyboard(event){
         if(event.key != "1" && event.key != "0"  && event.key != "2"  && event.key != "3"  && event.key != "4" 
          && event.key != "5" ){
            event.preventDefault();
         }

     },
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
 }, 
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
.ScoreEdit{
    width: 50px;
    margin-right: 10px;
}
.scoresEditBox{
    margin-bottom: 20px;
}

</style>