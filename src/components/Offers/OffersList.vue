<template>
<div id='OffersList'>
     <ul>
<div id='OffersListFor' v-bind:key="offer.id" v-for="(offer) in recorte">
         <a :href="offer.url">
      <li id='offer' :class="style" > 
         <p class ='btn btn-primary'> {{offer.price}}€ </p>
          <p> Shipping costs: {{offer.shippingCost}}€ </p>
          <p> Shop: {{offer.shop}} </p>
      </li>
      </a>

</div>
<div> <button v-if= "! (count >= offers.length) && ! (offers.length <= 4)"  v-on:click="loadMore"  class='ShowMore'>+ </button> </div>
</ul>

</div>
</template>

<script>
export default {
    name: "Offer",
    data(){
        return{
            style:'list-group-item',
            listaRecortada:[],
            count: 0,

        }
    },
    props:['offers'],
   computed:{
        recorte(){
            var recorte = this.offers
            return recorte.slice(0,this.count + 4)

        }
    }, methods:{
        loadMore(){
         this.count += 4
        }
    }
}
</script>

<style >
#offer:hover{
    background:darkslateblue;
    color: white;
}
.ShowMore {
	background:linear-gradient(to bottom, #44c767 5%, #5cbf2a 100%);
	background-color:#44c767;
	border-radius:42px;
	border:50% solid #18ab29;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
  width: 50px;
  height: 50px;
  margin-left: 40%;

}
</style>