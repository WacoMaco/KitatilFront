<template>
    <div id ='LaptopForm'>
 <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    </div>

</template>

<script>
 import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
export default {
  components: {
        "vue-form-generator": VueFormGenerator.component,
  },
     data () {
    return {
      model: {
        name: '',
        batteryScore: 0,
        displayScore: 0,
        performanceScore: 0,
        otherScore: 0,
        image:'',
      },
       schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Name',
            model: 'name',
            required: true,
          },{
            type: 'input',
            inputType: 'url',
            label: 'Image URL',
            model: 'image',
            validator: VueFormGenerator.validators.url
          },
 
        ]
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