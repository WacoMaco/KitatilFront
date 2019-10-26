<template>
    <div id ='OfferForm'>
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
        price: 0,
        shippingCost: 0,
        displayScore: 0,
        performanceScore: 0,
        otherScore: 0,
        image:'',
        shop:'',
      },
       schema: {
        groups:[
        {
            legend:'Offer',
            fields: [
                {
                type: 'input',
                inputType: 'number',
                label: 'Price',
                model: 'price',
                required: true,
                },{
                type: 'input',
                inputType: 'number',
                label: 'Shipping cost',
                model: 'shippingCost',
                },{
                type: 'input',
                inputType: 'text',
                label: 'Shop',
                model: 'shop',
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
#OfferForm{
    margin-top: 20px;
    margin-bottom: 20px;
    border: solid darkgray;
}
</style>