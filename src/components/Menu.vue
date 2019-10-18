<template>
   
     <Push disableOutsideClick>
      <a id="home" href="#" > 
        <span v-if= "ki === 'KiDescendente'" @click='OrdenaKi()'>Ordenar por Ki Descendente</span>  
        <span v-else @click='OrdenaKi()'> Ordenar por Ki Ascendente</span>  
      </a>
      <a id="home" href="#" > 
         <span v-if= "price === 'PrecioDescendente' || price === '' " @click='OrdenaPrecio()'>Ordenar por Precio Ascendente</span> 
        <span v-else @click='OrdenaPrecio()'> Ordenar por Precio Descendente</span>  
      </a>
         
     <a id="home" href="#" @click='Test()'> 
        <span @click='OrdenaNovedades()'>Ordenar por novedades</span>  
      </a>


  <vue-slider :tooltip-formatter="formatter" @drag-end="precioFun" :enable-cross="false" :min='0' :max='3000' :adsorb="true" :interval="50"  v-model="precio" > 
  </vue-slider>


    </Push>

</template>


<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/material.css'
import { Push } from 'vue-burger-menu'
export default {
    components:{
        Push,
        VueSlider
    },
     data(){
  return {
      price :'',
      ki : 'KiAscendente',
      news : 'Novedades',
      filter: '',
      laptops:[],
      precio:[0,2500],
      formatter: '{value}€',

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
       this.$http
      .get("http://localhost:8000/api/laptopsList" + '?filter=' + this.news).then(result => {
        this.laptops = result.data
        this.$emit('Ordena',this.laptops)
    })
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
      background-color: rgb(150, 150, 244); 
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
</style>