<template>
<div id='app' class="container">


<div class="EditButton" v-if="isAdmin">
 <router-link class="btn btn-primary" :to="{name: 'LaptopView', params:{laptopId : laptop.id}}"> {{this.$t('StopEdit')}} </router-link>
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
    <Chart :performanceScore = 'laptop.performanceScore' :batteryScore = 'laptop.batteryScore' :otherScore = 'laptop.otherScore' :displayScore = 'laptop.displayScore'/>
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



<div class ='row'>

<table class="col table-primary table-striped">
<thead>
    <tr style="text-align:center;">
      <th class="TypeCol" >{{this.$t('Type')}}</th>
      <th >{{this.$t('Name')}}</th>
      <th class="ScoreCol" >{{this.$t('Score')}}</th>
    </tr>
  </thead>
<tbody>
<tr id='SpecificationsLaptop'  v-bind:key="specification.id" v-for="specification in specifications"> 
      <td >{{changetype(specification.type)}}</td>
      <td class="NameCol"> <input v-on:keyup = "EditSpecification(specification.id,specification.name)" class ="SpecificationEditInput" v-model="specification.name" ></td>
      <td v-if="filter(specification.type)"><vue-slider class="slider" @drag-end="saveSpecification(specification.id,specification.score)" :marks="marks" :enable-cross="false" :min='0' :max='5' :adsorb="true" :interval="0.1"  v-model="specification.score" > 
  </vue-slider>



      </td>

</tr>
</tbody> 
</table>





<div id ="Offers" class='.col-sm-'>
<OfferList :offers = "offers"/>
</div>





</div>

<div v-bind:key="specification" v-for="(specification,index) in specificationsToAdd">
<SpecificationForm :saved= "saved" :index= 'index' @Errors = "AppendErrors"  :laptop= "laptop" class='col-9'/>  
<eva-icon id="DeleteItem" v-on:click='DeleteSpecification(index)' class='col' name="close"></eva-icon>
</div>
<button class="btn btn-primary" @click="addSpecification">Add Specification</button>


<div class="row justify-content-center">
<button  :disabled="ValidateForms" v-on:click="SaveConfirm" class="btn btn-primary"> Guardar </button>
</div>

</div>
</template>

<script>

import Specificationlist from "../Specifications/Specificationlist.vue";
import OfferList from "../Offers/OffersList.vue";
import Chart from "./Chart.vue";
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/material.css';
import SpecificationForm from '../Specifications/CreateSpecificationForm.vue'
import Vue from "vue";
export default {
    components: {
        Specificationlist,
        OfferList,
        Chart,
        VueSlider,
        SpecificationForm
        
  },
    props:['laptopId'],
    data: function(){
        return{   
            saved: false,
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
        specificationsToAdd: [],
        specificationsToEdit:{},
         isValid : {},
          isAdmin: false,
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


    this.$http.get('http://localhost:8000/api/laptopView?laptopId='+ this.$route.params.laptopId).then((result) => {
            this.laptop = result.data.Laptop
            this.specifications = result.data.Specifications
            this.offers = result.data.Offers
        })
    if (this.getCookie("user_type") == "admin") {
      this.isAdmin = true;
    }
 

 }, computed:{
      ValidateForms(){
          var res = false;
          for (var key in this.isValid){
            if (this.isValid[key] == false){
                res = true;
            }
          }
          return res;
      }
 },  methods:{
     SaveConfirm(){
      this.$bvModal.msgBoxConfirm('¿Quieres guardar las especificationes?')
          .then(value => {
            if(value == true){
                this.saved = true;
                this.SaveScore();
                this.SaveSpecificationsEdit();
                
                
            }
          })
     }, EditSpecification(id,name){
        this.specificationsToEdit[id] = name;
     },
     SaveSpecificationsEdit(){
        for (var id in this.specificationsToEdit){
        const formData = new FormData();
        var token = "JWT " + this.$cookies.get("token");
        formData.append("specificationId", id);
        formData.append("name", this.specificationsToEdit[id]);
        this.$http
      .post("http://localhost:8000/api/editSpecification",formData,{
          headers: { Authorization: token }
        })
        }
        
     },
      AppendErrors(errors){
         console.log(errors)
          this.isValid = Object.assign({}, this.isValid,errors);
         console.log(this.isValid)
      },
   getCookie: function(name) {
      var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return v ? v[2] : null;
    },

   DeleteSpecification(index){
              delete this.isValid["Specification" + index];
              this.specificationsToAdd.splice(index,1)

      },
   addSpecification() {
        var specification = Vue.extend(SpecificationForm)
        var instance = new specification()
        this.specificationsToAdd.push(instance.$mount()) // pass nothing

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
          this.$bvModal.msgBoxOk('Saved',  {
            okTitle:'Ok'
          }).then(value => { if(value){this.$router.go()}});
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
        if(type == 'CPU' || type == 'GPU' || type == 'STORAGE'  || type == 'BATERY_DURATION' || type == 'RAM' || type == 'CAMERA' || type == 'MEMORY_CARDS' || type == 'DISPLAY_RESOLUTION' 
        || type == 'DISPLAY' || type == 'WIRELESS' || type == 'STORAGE2' || type == 'RAM_VELOCITY' || type == 'SOFTWARE' || type == 'INTERFACES'){
            res =  true
        }
        return res
    },
    changetype(type){
      var res = '';
      if(type == "WEIGHT"){
        res = this.$t('WEIGHT')
      }
      else if(type == "DISPLAY"){
         res = this.$t('DISPLAY')
      }
      else if(type == "RAM"){
         res = this.$t('RAM')
      }
      else if(type == "DISPLAY_RESOLUTION"){
         res = this.$t('DISPLAY_RESOLUTION')
      }
      else if(type == "RAM_VELOCITY"){
         res = this.$t('RAM_VELOCITY')
      }
      else if(type == "BATERY_TECNOLOGY"){
         res = this.$t('BATERY_TECNOLOGY')
      }
      else if(type == "CPU_MAX"){
         res = this.$t('CPU_MAX')
      }
      else if(type == "BATERY_CAPACITY"){
         res = this.$t('BATERY_CAPACITY')
      }
      else if(type == "STORAGE"){
         res = this.$t('STORAGE')
      }
      else if(type == "DIMENTIONS"){
         res = this.$t('DIMENTIONS')
      }
      else if(type == "CACHE"){
         res = this.$t('CACHE')
      }
      else if(type == "PANORAMIC"){
         res = this.$t('PANORAMIC')
      }
      else if(type == "STORAGE2"){
         res = this.$t('STORAGE2')
      }
      else if(type == "BRIGHTNESS"){
         res = this.$t('BRIGHTNESS')
      }
      else if(type == "DISPLAY_COEFICENT"){
         res = this.$t('DISPLAY_COEFICENT')
      }
      else if(type == "WIRELESS"){
         res = this.$t('WIRELESS')
      }
      else if(type == "SOUND"){
         res = this.$t('SOUND')
      }
      else if(type == "RAM_TECNOLOGY"){
         res = this.$t('RAM_TECNOLOGY')
      }
      else if(type == "KEYBOARD_LANG"){
         res = this.$t('KEYBOARD_LANG')
      }
      else if(type == "GARANTY"){
         res = this.$t('GARANTY')
      }
      else if(type == "BATERY_DURATION"){
         res = this.$t('BATERY_DURATION')
      }
      else if(type == "BATERY_DURATION"){
         res = this.$t('BATERY_DURATION')
      }
      else if(type == "BRAND"){
         res = this.$t('BRAND')
      }
      else if(type == "DISPLAY_INFO"){
         res = this.$t('DISPLAY_INFO')
      }
      else if(type == "CPU"){
         res = this.$t('CPU')
      }
      else if(type == "CPU_INFO"){
         res = this.$t('CPU_INFO')
      }
      else if(type == "SECURITY"){
         res = this.$t('SECURITY')
      }
      else if(type == "DISPLAY_ILUMINATION"){
         res = this.$t('DISPLAY_ILUMINATION')
      }
      else if(type == "GPU"){
         res = this.$t('GPU')
      }
      else if(type == "GPU_TECNOLOGY"){
         res = this.$t('GPU_TECNOLOGY')
      }
      else if(type == "KEYBOARD_NUMERIC"){
         res = this.$t('KEYBOARD_NUMERIC')
      }
      else if(type == "SOFTWARE"){
         res = this.$t('SOFTWARE')
      }
      else if(type == "COLOR"){
         res = this.$t('COLOR')
      }
      else if(type == "CORES"){
         res = this.$t('CORES')
      }
      else if(type == "PROTECTION"){
         res = this.$t('PROTECTION')
      }
      else if(type == "CAMERA"){
         res = this.$t('CAMERA')
      }
      else if(type == "MEMORY_CARDS"){
         res = this.$t('MEMORY_CARDS')
      }
      else if(type == "KEYBOARD"){
         res = this.$t('KEYBOARD')
      }
      else if(type == "INTERFACES"){
         res = this.$t('INTERFACES')
      }
      else if(type == "SO"){
         res = this.$t('SO')
      }
      else if(type == "MATERIAL"){
         res = this.$t('MATERIAL')
      }
      else if(type == "MAX_RAM"){
         res = this.$t('MAX_RAM')
      }
      return res;
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
.EditButton{
    margin-top:10px;
    margin-bottom: 10px;
}
.SpecificationEditInput{
   background: lightblue;
}
</style>