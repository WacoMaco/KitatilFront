<template>
<div >
<div class="container">
<div class="row justify-content-center type">
<v-select @input="selectedType" v-model="selected" :options="this.options"></v-select>
</div>

<div class="row justify-content-center specification">


<v-select @input="saveSpecification" v-model="specificationSelected" label="name" :options="this.specifications">
</v-select>

</div>
<div class="row justify-content-center checkbox">
<eva-icon v-if="specificationSelected != '' && specificationSelected.score != 0" name="checkmark-circle-2" animation="zoom" height="50px" width="auto" fill="limegreen"></eva-icon>
</div>

</div>
<vue-slider class="slider" :marks="this.marks" v-if="this.specificationSelected != ''" :tooltip-formatter="formatter" 
@drag-end="saveSpecification" :enable-cross="false" :min='0' :max='5' :adsorb="true" :interval="0.1"  v-model="specificationSelected.score" > 
  </vue-slider>



</div>
</template>


<script>
import vSelect from 'vue-select'
 import { EvaIcon } from 'vue-eva-icons'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/material.css'
import 'vue-select/dist/vue-select.css';
export default {
    name: "SpecificationEdit",
    components:{
        VueSlider,
        [EvaIcon.name]: EvaIcon,
        vSelect 
    },
    data(){
        return{
            options: ["CPU","GPU","RAM","STORAGE","DISPLAY","WIRELESS", "RAM_VELOCITY", 'INTERFACES'],
            selected: "CPU",
            specifications: [],
            specificationSelected:'',
             marks: {
            '0': '😡',
            '1': '😭',
            '2': '😢',
            '3': '😑',
            '4': '😊',
            '5': '😆'
        },
        saved: false,
        }
    },
    mounted: function() {
    var token = "JWT " + this.$cookies.get("token");
    this.$http
      .get("https://kitatil-api.herokuapp.com/api/specificationType?type=" + this.selected, {
          headers: { Authorization: token }
        }).then(result => {
        this.specifications = result.data;
        });
    },
    methods: {
    selectedType: function () {
      var token = "JWT " + this.$cookies.get("token");
      this.$http
      .get("https://kitatil-api.herokuapp.com/api/specificationType?type=" + this.selected,{
          headers: { Authorization: token }
        }).then(result => {
        this.specifications = result.data;
        });
    },
    saveSpecification(){
        const formData = new FormData();
        var token = "JWT " + this.$cookies.get("token");
        formData.append("score", this.specificationSelected.score);
        formData.append("id", this.specificationSelected.id);
        this.$http
      .post("https://kitatil-api.herokuapp.com/api/saveSpecification",formData,{
          headers: { Authorization: token }
        }).then(result => {
        this.saved = result.data.message;
        });
    }

    }, watch:{
    
    }
}
</script>

<style>
.type{
    margin-top:5%;
}
.specification{
    margin-top:5%;
    margin-bottom: 10%;
}
.checkbox{
    margin-bottom: 5%;

}


.v-select {
    width: 50%;

  }

</style>