<template>
    <div id ='OfferForm'>
 <vue-form-generator @validated="onValidated" :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    </div>

</template>

<script>

 import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
export default {
  name: 'OfferForm',
  components: {
        "vue-form-generator": VueFormGenerator.component,
  }, props: ['laptop', 'index'],
  watch:{
       laptop: function(val){
         var id = val.id;
        console.log('Watch antes' + val.id)
         if(id =! null && id != ''){
          console.log('Watch dentro' + val.id)
          this.saveOffer()
         }
       }
     },
       methods: {
        onValidated(isValid, errors) {
            var string = 'Offer' + this.index;
            var dict = {};
            dict[string] = isValid;
            this.$emit('Errors',dict)

  }, saveOffer(){
      const formData = new FormData();
        var token = "JWT " + this.$cookies.get("token");
        formData.append("laptopId", this.laptop.id);
        formData.append("price", this.model.price);
        formData.append("shippingCost", this.model.shippingCost);
        formData.append("shop", this.model.shop);
        formData.append("url", this.model.url);
        this.$http
      .post("https://kitatil-api.herokuapp.com/api/saveOffer",formData,{
          headers: { Authorization: token }
        })
  }
     },
     data () {
    return {
      model: {
        price: '',
        shippingCost: '',
        shop:'',
        url: '',
      },
       schema: {
        groups:[
        {
            legend: this.$t('Offer'),
            fields: [
                {
                type: 'input',
                inputType: 'number',
                label: this.$t('price'),
                model: 'price',
                required: true,
                validator: VueFormGenerator.validators.number,
                min: 0,
                },                {
                type: 'input',
                inputType: 'url',
                label: 'URL',
                model: 'url',
                required: true,
                validator: VueFormGenerator.validators.url,
                },{
                type: 'input',
                inputType: 'number',
                label: this.$t('Shipping_cost'),
                model: 'shippingCost',
                required: true,
                min: 0,
                validator: VueFormGenerator.validators.number,
                },{
                type: 'input',
                inputType: 'text',
                label: this.$t('shop'),
                model: 'shop',
                required: true,
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
#OfferForm{
    margin-top: 20px;
    margin-bottom: 20px;
    border: solid darkgray;
}
</style>