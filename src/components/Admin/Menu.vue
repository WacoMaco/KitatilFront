<template>
   
     <Push>
     <router-link :to="{name: 'AdminTools.api'}">
        <span>Cargar desde la API</span>  
      </router-link> 
         
   <router-link :to="{name: 'AdminTools.create'}">   
        <span>Cargar manualmente</span>  
    </router-link>
      
    <router-link :to="{name: 'AdminTools.scores'}">   
        <span>Puntuar Especificaciones</span>  
      </router-link>
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

  }
  },
  methods: {
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