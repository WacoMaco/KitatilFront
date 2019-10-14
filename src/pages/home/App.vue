<template>
  <div id="app">
    <Navbar id="nav"/>
    <router-view :key="$route.fullPath" class="content"/>
  <Footer class='position-fixed'/>
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
}
.content{
  display: flex;
}