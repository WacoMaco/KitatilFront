<template>
    <div id ='SpecificationForm'>
 <vue-form-generator @validated="onValidated" :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    
    </div>

</template>

<script>

 import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
export default {
  name: 'SpecificationForm',
  components: {
        "vue-form-generator": VueFormGenerator.component,
  }, props: ['laptop', 'index', 'saved'],
  watch:{
    laptop: function(val){
         var id = val.id;
         var saved = this.saved
         if(id =! null && id != '' && saved){
          this.saveSpecification()
         }
       },
    saved: function(val){
         var id = this.laptop.id;
         var saved = val
         if(id =! null && id != '' && saved){
          this.saveSpecification()
         }
       },
     },
       methods: {
        onValidated(isValid, errors) {
            var string = 'Specification' + this.index;
            var dict = {};
            dict[string] = isValid;
            this.$emit('Errors',dict)

  }, saveSpecification(){
        const formData = new FormData();
        var token = "JWT " + this.$cookies.get("token");
        formData.append("laptopId", this.laptop.id);
        formData.append("name", this.model.name);
        formData.append("score", this.model.score);
        formData.append("type", this.model.type);
        this.$http
      .post("http://localhost:8000/api/saveNewSpecification",formData,{
          headers: { Authorization: token }
        })
  }
     },
     data () {
    return {
      model: {
        name: '',
        score: '',
        type: [],
      },
       schema: {
        groups:[
        {
            legend: this.$t('Spec'),
            fields: [
                {
                type: 'input',
                inputType: 'text',
                label: this.$t('Name'),
                model: 'name',
                required: true,
                validator: VueFormGenerator.validators.string,
                min: 0,
                max: 100,
                },                {
                type: 'select',
                values: function () {
                  return  [
                            { id: "WEIGHT", name: this.$t('WEIGHT') },
                            { id: "DISPLAY", name: this.$t('DISPLAY') },
                            { id: "DIMENTIONS", name: this.$t('DIMENTIONS') },
                            { id: "PANORAMIC", name: this.$t('PANORAMIC') },
                            { id: "RAM", name: this.$t('RAM')},
                            { id: "DISPLAY_RESOLUTION", name: this.$t('DISPLAY_RESOLUTION')},
                            { id: "RAM_VELOCITY", name: this.$t('RAM_VELOCITY')},
                            { id: "BATERY_TECNOLOGY", name: this.$t('BATERY_TECNOLOGY')},
                            { id: "CPU_MAX", name: this.$t('CPU_MAX')},
                            { id: "BATERY_CAPACITY", name: this.$t('BATERY_CAPACITY')},
                            { id: "STORAGE", name: this.$t('STORAGE')},
                            { id: "CACHE", name: this.$t('CACHE')},
                            { id: "STORAGE2", name: this.$t('STORAGE2')},
                            { id: "BRIGHTNESS", name: this.$t('BRIGHTNESS')},
                            { id: "DISPLAY_COEFICENT", name: this.$t('DISPLAY_COEFICENT')},
                            { id: "GPU_TECNOLOGY", name: this.$t('GPU_TECNOLOGY')},
                            { id: "KEYBOARD_NUMERIC", name: this.$t('KEYBOARD_NUMERIC')},
                            { id: "SOFTWARE", name: this.$t('SOFTWARE')},
                            { id: "WIRELESS", name: this.$t('WIRELESS')},
                            { id: "SOUND", name: this.$t('SOUND')},
                            { id: "RAM_TECNOLOGY", name: this.$t('RAM_TECNOLOGY')},
                            { id: "KEYBOARD_LANG", name: this.$t('KEYBOARD_LANG')},
                            { id: "GARANTY", name: this.$t('GARANTY')},
                            { id: "BATERY_DURATION", name: this.$t('BATERY_DURATION')},
                            { id: "BRAND", name: this.$t('BRAND')},
                            { id: "DISPLAY_INFO", name: this.$t('DISPLAY_INFO')},
                            { id: "CPU", name: this.$t('CPU')},
                            { id: "CPU_INFO", name: this.$t('CPU_INFO')},
                            { id: "SECURITY", name: this.$t('SECURITY') },
                            { id: "DISPLAY_ILUMINATION", name: this.$t('DISPLAY_ILUMINATION')},
                            { id: "GPU", name: this.$t('GPU')},
                            { id: "COLOR", name: this.$t('COLOR')},
                            { id: "CORES", name: this.$t('CORES')},
                            { id: "PROTECTION", name: this.$t('PROTECTION')},
                            { id: "CAMERA", name: this.$t('CAMERA')},
                            { id: "MEMORY_CARDS", name: this.$t('MEMORY_CARDS')},
                            { id: "KEYBOARD", name: this.$t('KEYBOARD')},
                            { id: "INTERFACES", name: this.$t('INTERFACES')},
                            { id: "SO", name: this.$t('SO')},
                      
      ];
                },
                label: this.$t('Type'),
                model: 'type',
                required: true,
                validator: VueFormGenerator.validators.string,
                },{
                type: 'input',
                inputType: 'number',
                label: this.$t('Score'),
                model: 'score',
                required: true,
                min: 0,
                max:5,
                validator: VueFormGenerator.validators.required,
                },
                ]
        }]
},
formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    }
     }
}
</script>

<style scoped>
#SpecificationForm{
    margin-top: 20px;
    margin-bottom: 20px;
    border: solid darkgray;
}
</style>