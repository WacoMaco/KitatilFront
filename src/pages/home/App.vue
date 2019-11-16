<template>
  <div id="app" style="height: 100%;">
    <Navbar id="nav" style="z-index: 999;position:sticky"/>
    <router-view :key="$route.fullPath" class="content"/>
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
.content{
 min-height: 100%;
 margin: 100px auto -50px;
 position:relative;
}

@media all and (max-width: 600px) {
.content{
 min-height: 100%;
 margin: 150px auto -50px;
 position:relative;
}

}

</style>




