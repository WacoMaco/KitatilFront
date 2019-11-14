<template>
  <div id="app" style="height: 100%;">
    <Navbar id="nav" style="z-index: 999;position:sticky"/>
    <router-view style="min-height: 100%;margin: 100px auto -50px;" :key="$route.fullPath" class="content"/>
  <Footer/>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import LaptopsList from "../../components/LaptopsList.vue";
import Vue from 'vue';


export default {
  name: "app",
  components: {
    Navbar,
    Footer,
    LaptopsList
  },

};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.content{
  display: flex;
}






