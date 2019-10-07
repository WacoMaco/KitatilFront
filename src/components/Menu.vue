<template>
   
     <Push>
      <a id="home" href="#" > 
        <span v-if= "ki === 'KiDescendente'" @click='OrdenaKi()'>Ordenar por Ki Ascendente</span>  
        <span v-else @click='OrdenaKi()'> Ordenar por Ki Descendente</span>  
      </a>
      <a id="home" href="#" > 
         <span v-if= "price === 'PrecioDescendente' || price === '' " @click='OrdenaPrecio()'>Ordenar por Precio Ascendente</span> 
        <span v-else @click='OrdenaPrecio()'> Ordenar por Precio Descendente</span>  
      </a>
         
     <a id="home" href="#" @click='Test()'> 
        <span>Ordenar por novedades</span>  
      </a>
    </Push>

</template>


<script>
import { Push } from 'vue-burger-menu'
export default {
    components:{
        Push
    },
     data(){
  return {
      price :'',
      ki : 'KiAscendente',
      news : '',
      laptops:[]

  }
  },
  methods: {
    OrdenaKi() {
        if (this.ki == 'KiAscendente'){
            this.ki = 'KiDescendente'
        } else{
            this.ki = 'KiAscendente'
        }
       this.$http
      .get("http://localhost:8000/api/laptopsList" + '?filter=' + this.ki).then(result => {
        this.laptops = result.data
        this.$emit('Ordena',this.laptops)
    })
    },
     OrdenaPrecio() {
        if (this.price == 'PrecioAscendente' || this.price == ''){
            this.price = 'PrecioDescendente'
        } else{
            this.price = 'PrecioAscendente'
        }
       this.$http
      .get("http://localhost:8000/api/laptopsList" + '?filter=' + this.price).then(result => {
        this.laptops = result.data
        this.$emit('Ordena',this.laptops)
    })
    },
}
}
</script>

<style>
.bm-burger-button {
      position: fixed;
      width: 36px;
      height: 30px;
      left: 36px;
      top: 36px;
      cursor: pointer;
      margin-top: 30px;
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