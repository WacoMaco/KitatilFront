<template>
<div id='SpecificationsList'>
<div id='SpecificationsTable'>



<b-table :fields="fields" striped hover :items="specifications">

   

</b-table>
</div>
</div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/material.css'
export default {
    name: "Specification",
     components:{
        VueSlider,
    },
    data(){
        return{

            fields:[
                'type',
                'name',
            ],

    
        

            
        }
    },
    props:['specifications'],
    mounted: function() {


      if (this.getCookie("user_type") == "admin") {
      this.isAdmin = true;
    }



  }, methods: {
    getCookie: function(name) {
      var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return v ? v[2] : null;
    },
    editMode(id){
        this.edit = id;
    }
}
}
</script>