<template>
<div id ='CreateLaptop'>
<LaptopForm @Errors = "AppendErrors" @LaptopSaved = 'RetainLaptop' :saved= "saved"/>

<div class='row'>

<div class ='col'>
<div v-bind:key="offer" v-for="(offer,index) in offers">

<OfferForm :saveItems= 'saveItems' :index= 'index' @Errors = "AppendErrors" :laptop= "laptop" class='col-9'/>  
<eva-icon id="DeleteItem" v-on:click='DeleteOffer(index)' class='col' name="close"></eva-icon>
</div>
<button class="btn btn-primary" @click="onClick">Add offer</button>
</div>


<div class='col'>

<div v-bind:key="specification" v-for="(specification,index) in specifications">

<SpecificationForm :saved= "saved" :index= 'index' @Errors = "AppendErrors" @selectedType = "ChangeSpecificationArray" :laptop= "laptop" class='col-9'/>  
<eva-icon id="DeleteItem" v-on:click='DeleteSpecification(index)' class='col' name="close"></eva-icon>

</div>


<button class="btn btn-primary" @click="addSpecification">Add Specification</button>
</div>
</div>
<div class ='row'>
<button class="btn btn-success" style='margin:auto; margin-top:20px;' :disabled="ValidateForms" @click="saveAll">Save All</button>
</div>
</div>
</template>

<script>
import LaptopForm from './CreateLaptopForm.vue'
import OfferForm from '../Offers/CreateOfferForm.vue'
import SpecificationForm from '../Specifications/CreateSpecificationForm.vue'
import Vue from "vue";
export default {
    name: 'CreateLaptop',
      components: {
        LaptopForm,
        OfferForm,
        SpecificationForm
  },mounted: function(){
    this.specificationsCopy = this.specificationsType;
    },
    data(){
  return {
      isValid : {},
      offers: [],
      saved: false,
      laptop: '',
      saveItems: false,
      specifications: [],

  }
  }, 
  
    methods: {

        addSpecification() {
        var specification = Vue.extend(SpecificationForm)
        var instance = new specification()
        this.specifications.push(instance.$mount()) // pass nothing

      },
      onClick() {
        var offer = Vue.extend(OfferForm)
        var instance = new offer()
        this.offers.push(instance.$mount()) // pass nothing

      },
      DeleteOffer(index){
              delete this.isValid["Offer" + index];
              this.offers.splice(index,1)

      },
     DeleteSpecification(index){
              delete this.isValid["Specification" + index];
              this.specifications.splice(index,1)

      },
       saveAll(){
          this.saved = true
          this.$bvModal.msgBoxOk('Saved',  {
            okTitle:'Ok'
          }).then(value => { if(value){this.$router.go()}});
         

      },
      RetainLaptop(laptop){
          this.laptop = laptop;
      },
    AppendErrors(errors){
          this.isValid = Object.assign({}, this.isValid,errors);
      },

     
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
    }
  }
</script>

<style scoped>

</style>