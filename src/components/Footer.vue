<template>
    <div id="footer">
    <b-navbar type="dark" variant="dark">
        <b-nav-text><p class="text">© Copyright 2019 | Joaquín Romero Moreno</p></b-nav-text>
         <b-navbar-nav class="ml-auto">
            <b-nav-item href="https://github.com/WacoMaco/KitatilApi"><p class="link" >{{$t("about_us")}}</p></b-nav-item>
            <!--<b-nav-item href="#">Privacy policy</b-nav-item>-->
        </b-navbar-nav>

    </b-navbar>
    </div>
</template>
<script>
export default {
  name: 'Footer',
  props: {
      fixed: String,
      sticky: Boolean
  }, methods: {
  }
}
</script>

<style>

.link {
    color: white;
}

.text {
    color:aliceblue;
}
#footer {
    position: relative;
    width: 100%;
   height:60px;
   bottom:0px;
   margin-top: 60px;
}

</style>
