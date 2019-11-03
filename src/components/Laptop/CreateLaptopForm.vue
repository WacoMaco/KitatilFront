<template>
    <div id ='LaptopForm'>
 <vue-form-generator @validated="validateLaptop" :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    </div>

</template>

<script>
 import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
import Vue from "vue";
export default {
  components: {
        "vue-form-generator": VueFormGenerator.component,
  }, props: ['saved'],

     data () {
    return {
      laptop: '',
      model: {
        name: '',
        batteryScore: 0,
        displayScore: 0,
        performanceScore: 0,
        otherScore: 0,
        image:'',
        googleId:'',
        goAndSave: false,
      },
       schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Name',
            model: 'name',
            required: true,
            validator: VueFormGenerator.validators.required
          },{
            type: 'input',
            inputType: 'url',
            label: 'Image URL',
            model: 'image',
            validator: VueFormGenerator.validators.url,
          },
            {
            type: 'input',
            inputType: 'text',
            label: 'Google Id',
            model: 'googleId',
          }
 
        ]
},
formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    }
     }, methods: {
      validateLaptop(isValid, errors) {
        this.$emit('Errors',{'LaptopForm': isValid})
  },
       SaveLaptop(){
        const formData = new FormData();
        var token = "JWT " + this.$cookies.get("token");
        formData.append("name", this.model.name);
        formData.append("image_url", this.model.image);
        formData.append("googleId", this.model.googleId);
        this.$http
      .post("http://localhost:8000/api/saveLaptop",formData,{
          headers: { Authorization: token }
        }).then(result => {
        this.laptop = result.data.Laptop;
        this.$emit('LaptopSaved',result.data.Laptop)
        });
       }


     }, watch:{
       saved: function(val){
         if(val == true){
          this.SaveLaptop()
         }
         return val
       }
     }
}
</script>