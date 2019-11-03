<template>
<div id='SpecificationsList'>
<div id='SpecificationsTable'>



<b-table :sort-desc.sync="sortDesc" :sort-by.sync="sortBy" :fields="fields" striped hover :items="specifications">
 <template v-slot:cell(type)="type">
   {{changetype(type.item.type)}}
 </template>
   

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
                {key: 'type', sortable: true, label: this.$t('Type')},
                  {key: 'name', label: this.$t('Name')},
            ],
            sortBy:"type",
            sortDesc: false,
            

    
        

            
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
    },
    changetype(type){
      var res = '';
      if(type == "WEIGHT"){
        res = this.$t('WEIGHT')
      }
      else if(type == "DISPLAY"){
         res = this.$t('DISPLAY')
      }
      else if(type == "DIMENTIONS"){
         res = this.$t('DIMENTIONS')
      }
      else if(type == "PANORAMIC"){
         res = this.$t('PANORAMIC')
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
      else if(type == "CACHE"){
         res = this.$t('CACHE')
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
      else if(type == "GPU_TECNOLOGY"){
         res = this.$t('GPU_TECNOLOGY')
      }
      else if(type == "KEYBOARD_NUMERIC"){
         res = this.$t('KEYBOARD_NUMERIC')
      }
      else if(type == "SOFTWARE"){
         res = this.$t('SOFTWARE')
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
}
}
</script>