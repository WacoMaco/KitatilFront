<template>
   
     <Push isOpen noOverlay disableOutsideClick>
      <a class="row justify-content-center" id="home" href="#" > 
        <span class="filaMenu" v-if= "ki === 'KiDescendente'" @click='OrdenaKi()'>{{this.$t('ORDENAR_KI')}} <eva-icon name="arrow-circle-down"> </eva-icon></span>  
        <span class="filaMenu" v-else @click='OrdenaKi()'>{{this.$t('ORDENAR_KI')}} <eva-icon name="arrow-circle-up"></eva-icon></span>  
      </a>
      <a class="row justify-content-center" id="home" href="#" > 
         <span class="filaMenu" v-if= "price === 'PrecioDescendente' || price === '' " @click='OrdenaPrecio()'>{{this.$t('ORDENAR_Price')}} <eva-icon name="arrow-circle-down"></eva-icon></span> 
        <span class="filaMenu" v-else @click='OrdenaPrecio()'>{{this.$t('ORDENAR_Price')}} <eva-icon name="arrow-circle-up"></eva-icon></span>  
      </a>
         
     <a class="row justify-content-center" id="home" href="#" @click='Test()'> 
        <span class="filaMenu" @click='OrdenaNovedades()'>{{this.$t('NEWS')}}:🆕</span>  
      </a>


  <vue-slider class="PrecioSlider" :marks="marksPrecio" :tooltip-formatter="formatter" @drag-end="precioFun" :enable-cross="false" :min='0' :max='2000' :adsorb="true" :interval="50"  v-model="precio" > 
  </vue-slider>

  


    </Push>

</template>


<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { Push } from 'vue-burger-menu'
export default {
    components:{
        Push,
        VueSlider
    },
     data(){
  return {
      price :'',
      ki : 'KiDescendente',
      news : 'Novedades',
      filter: '',
      laptops:[],
      precio:[0,2000],
      formatter: '{value}€',
       marksPrecio: val => val % 500 === 0? ({
          label: `${val}€`,
          labelStyle: {
            opacity: val * 0.01 * 0.7 + 0.3
          },
          labelActiveStyle: {
            color: 'white'
          }
        }) : false

  }
  },
  methods: {
    OrdenaKi() {
        if (this.ki == 'KiAscendente'){
            this.ki = 'KiDescendente';
            this.filter = 'KiDescendente';
        } else{
            this.ki = 'KiAscendente'
            this.filter = 'KiAscendente'
        }
        this.$emit('Ordena',this.filter)

    },
     OrdenaPrecio() {
        if (this.price == 'PrecioAscendente' || this.price == ''){
            this.price = 'PrecioDescendente'
            this.filter = 'PrecioDescendente'
        } else{
            this.price = 'PrecioAscendente'
            this.filter = 'PrecioAscendente'
        }
      
        this.$emit('Ordena',this.filter)
    },

      OrdenaNovedades() {
        this.$emit('Ordena',this.news)
    },
    precioFun: function () {
     this.$emit('precio',this.precio)
   },
  },
}
</script>

<style>




.vue-slider.vue-slider-ltr {
  /* overwrite slider styles */
  width: 200px;
}

.kiOrder{
  height: 25px;
  width: auto;
}
.bm-burger-button {
      position: fixed;
      width: 36px;
      height: 30px;
      left: 36px;
      top: 36px;
      cursor: pointer;
      margin-top: 5%;
      z-index: 1;
    }
    .bm-burger-bars {
      background-color: #373a47;
    }
    .line-style {
      position: absolute;
      height: 20%;
      left: 0;
      right: 0;
    }
    .cross-style {
      position: absolute;
      top: 12px;
      right: 2px;
      cursor: pointer;
    }
    .bm-cross {
      background: #bdc3c7;
    }
    .bm-cross-button {
      height: 24px;
      width: 24px;
    }
    .bm-menu {
      height: 100%; /* 100% Full-height */
      width: 0; /* 0 width - change this with JavaScript */
      position: fixed; /* Stay in place */
      z-index: 1000; /* Stay on top */
      top: 0;
      left: 0;
background: -moz-linear-gradient(180deg, #d8a3f7 0%,#4c66ea 25%,#ea3f95 50%,#6b213e 75%,#f708ab 100%); 
background: -webkit-linear-gradient(180deg, #d8a3f7 0%,#4c66ea 25%,#ea3f95 50%,#6b213e 75%,#f708ab 100%); 
background: linear-gradient(180deg, #d8a3f7 0%,#4c66ea 25%,#ea3f95 50%,#6b213e 75%,#f708ab 100%);
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 60px; /* Place content 60px from the top */
      transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
    }

    .bm-overlay {
      background: rgba(0, 0, 0, 0.3);
    }
    .bm-item-list {
      color: #b8b7ad;
      margin-left: 10%;
      font-size: 20px;
    }
    .bm-item-list > * {
      display: flex;
      text-decoration: none;
      padding: 0.7em;
    }
    .bm-item-list > * > span {
      margin-left: 10px;
      font-weight: 700;
      color: white;
    }
    .PrecioSlider{
      width:90% !important;
    }
</style>