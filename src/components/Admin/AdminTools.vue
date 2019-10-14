<template>
<div id='app'>
<Menu/>  
<div id="page-wrap">
<router-view :key="$route.fullPath" class="container"/>
</div>
</div>






</template>

<script>
import Menu from "./Menu.vue";
export default {
  name: "app",
  components: {
    Menu,
  }, data(){
  return {
      laptops: [],

  }
  },
  mounted: function() {



  },  methods: {
      Load(){
          alert('Hola')
      }

  }
}


</script>