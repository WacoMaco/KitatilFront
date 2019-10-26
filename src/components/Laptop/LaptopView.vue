<template>
<div id='Laptop' class ='container' >

        <b-card class='laptop-bcard'>
          <div class ='row justify-content-center'>
          <b-card-text id ='LaptopCard' class='col'> {{laptop.name}}" </b-card-text>
          </div>
        <div class ='row justify-content-center'>
        <img class='col-4' id="LaptopImagTag" alt="No image" :src="this.laptop.image_url"/>
        </div>

         <div class ='row justify-content-center'>
         <div id="LaptopInfo" class="btn btn-primary"> {{laptop.bestPrice}}€ </div>

        </div>

        <div  class ='row justify-content-center'>
          <div v-if="laptop.ki > 4" id="LaptopInfo" class="btn btn-primary"><img class="logo" alt="Kimovil Logo" src="../../assets/logo.png"/> {{laptop.ki}} </div>
          <div v-if="laptop.ki < 4 && laptop.ki > 3" id="LaptopInfo" class="btn btn-warning"><img class="logo" alt="Kimovil Logo" src="../../assets/logo.png"/> {{laptop.ki}} </div>
          <div v-if="laptop.ki < 2.5" id="LaptopInfo" class="btn btn-danger"><img class="logo" alt="Kimovil Logo" src="../../assets/logo.png"/> {{laptop.ki}} </div>

        </div>

        </b-card>
</div>
</template>

<script>
export default {
    name: "Laptop",
    data(){
        return{

        }
    },
    props:['laptop'],
    methods:{
    }
}

</script>

<style>
.laptop-bcard {
  margin: 2em;
}
#LaptopImagTag{
  max-width: 50%;
}
#Laptop:hover{
  transform: scale(1.2);
  text-decoration: none;
}
#LaptopInfo{
  margin-top:1%;
  border-radius: 20px;
  padding: 1px 5px;
}
.logo{
  height: 20px;
  width: auto;
}
</style>
