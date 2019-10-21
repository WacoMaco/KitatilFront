<template>
<div id='app' class="container">

<div v-id="isAdmin">
 <router-link class="btn btn-success" :to="{name: 'LaptopEdit', params:{laptopId : laptop.id}}"> Editar </router-link>
</div>

<h2> {{laptop.name}}</h2>

<div id= 'cabecera' class='row'>

<div id='LaptopImage' class='col justify-content-center'>
<img id="LaptopImagTag" alt="No image" :src="this.laptop.image_url"/>
</div>
<div id="ki" class ='col-2'>
     <div id="LaptopInfo" class="btn btn-primary"><img class="logo" alt="Kimovil Logo" src="../assets/logo.png"/> {{laptop.ki}} </div>
</div>
<div id ='Score Graphic justify-content-center' class="col">
    <Chart/>
</div>

</div>

<div class ='row'>

<div id ="Specifications" class='col'>
<Specificationlist :specifications = "specifications"/>
</div>

<div id ="Offers" class='.col-sm-'>
<OfferList :offers = "offers"/>
</div>




</div>
</div>
</template>

<script>

import Specificationlist from "./Specifications/Specificationlist.vue";
import OfferList from "./Offers/OffersList.vue";
import Chart from "./Laptop/Chart.vue"

export default {
    components: {
        Specificationlist,
        OfferList,
        Chart
  },
    props:['laptopId'],
    data(){
        return{
            id: '',
            laptop : [],
            specifications: [],
            offers:[],
            isAdmin: false,
        }

        
    },

 mounted: function() {

    this.$http.get('http://localhost:8000/api/laptopView?laptopId='+ this.$route.params.laptopId).then((result) => {
            this.laptop = result.data.Laptop
            this.specifications = result.data.Specifications
            this.offers = result.data.Offers
        })
    if (this.getCookie("user_type") == "admin") {
      this.isAdmin = true;
    }
 

 }, methods: {
     getCookie: function(name) {
      var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return v ? v[2] : null;
    },
 }
}
</script>

<style scoped>
#ki{
    margin:auto;
}


</style>