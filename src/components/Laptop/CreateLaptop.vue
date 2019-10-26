<template>
<div id ='CreateLaptop'>
<LaptopForm/>

<div v-bind:key="offer" v-for="(offer,index) in offers">
<div class="row">
<OfferForm class='col-9'/>  
<eva-icon v-on:click='DeleteOffer(index)' class='col-1' name="close"></eva-icon>
</div>
</div>




<button @click="onClick">Add offer</button>

</div>
</template>

<script>
import LaptopForm from './CreateLaptopForm.vue'
import OfferForm from '../Offers/CreateOfferForm.vue'
import Vue from "vue";
export default {
      components: {
        LaptopForm,
        OfferForm
  },data(){
  return {
      offers: [],

  }
  }, 
  
    methods: {
      onClick() {
        var offer = Vue.extend(OfferForm)
        var instance = new offer()
        this.offers.push(instance.$mount()) // pass nothing

      },
      DeleteOffer(index){
              console.log(index)
              this.offers.splice(index,1)

      }
    }
  }
</script>