<template>
<div id='OffersList'>
     <ul>
<div id='OffersListFor' v-bind:key="offer.id" v-for="(offer) in offers">
         <a :href="offer.url">
      <li id='offer' :class="style" > 
         <p class ='btn btn-primary'> {{offer.price}}€ </p>
          <p> Shipping costs: {{offer.shippingCost}}€ </p>
          <p> Shop: {{offer.shop}} </p>
      </li>
      </a>

</div>
</ul>
</div>
</template>

<script>
export default {
    name: "Offer",
    data(){
        return{
            style:'list-group-item'

        }
    },
    props:['offers'],
}
</script>

<style >
#offer:hover{
    background:darkslateblue;
    color: white;
}
</style>