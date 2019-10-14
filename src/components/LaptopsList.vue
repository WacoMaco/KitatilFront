<template>
  <div id="app">
    <Menu  @Precio= "Precio" @Ordena= "Ordena"/>  
           
    <div id="page-wrap">
       <div class="laptopBox container" >

       <div class="laptop" v-bind:key="laptop.id" v-for="(laptop, index) in laptops">
     <router-link :to="{name: 'LaptopView', params:{laptopId : laptop.id}}" active-class='none'> 
        <Laptop  :laptop = laptop> </Laptop>
     </router-link>
       </div>

       </div>
    <div class ='none' v-if="itemsCargados == true && (laptops == none || laptops.length == 0)">
       <h2 id="NadaQueMostrar"> {{$t('nothing_to_show')}} </h2>
    </div>

    <vue-cookie-accept-decline
      :ref="'myPanel1'"
      :elementId="'myPanel1'"
      :debug="false"
      :position="'bottom'"
      :type="'bar'"
      :disableDecline="true"
      :transitionName="'slideFromBottom'"
      :showPostponeButton="false"
      @clicked-decline="cookieClickedDecline"
    >
      
      <!-- Optional -->
      <div slot="message">
        {{$t('cookie_message')}}
        <a class="link-accent" href="https://cookiesandyou.com/" target="_blank">{{$t('learn_more_cookies')}}</a>
      </div>

      <!-- Optional -->
      <div slot="acceptContent">{{$t('accept_cookies')}}</div>
    </vue-cookie-accept-decline>

  </div>
  
  </div>
</template>

<script>
import Vue from 'vue'
import Footer from "./Footer.vue";
import Advertisement from "./Advertisement.vue";
import Laptop from "./Laptop/LaptopView.vue";
import Menu from "./Menu.vue";


export default {
  name: "app",
  components: {
    Laptop,
    Menu,
    Vue
  },
  data(){
  return {
      laptops: [],
      laptopsCopy:[],
      filter: '',
      itemsCargados: false,
      test : [],

  }
  },
  mounted: function() {
      this.$http
      .get("http://localhost:8000/api/laptopsList",{Headers: {filter:''}}).then(result => {
        this.laptops = result.data
        this.laptopsCopy = result.data
        this.itemsCargados = true
    }
    
    );
    
   
    
    var lang;

    if (this.$cookies.get("lang")) {
      lang = this.$cookies.get("lang");
    } else {
      lang = "en";
    }
    this.$i18n.locale = lang;
      },
  computed:{
    bottom: function() {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      alert(bottomOfWindow)
      if(bottomOfWindows){
        alert('hi')

      }
    },
  },
  methods: {
  
    cookieClickedDecline() {
      window.history.back();
    },
    Ordena(laptops) {
      this.laptops = [];
      this.laptops = laptops;
    },
    Precio(Precio){

      this.laptops = this.laptopsCopy.filter(laptop =>laptop.bestPrice > Precio)
    },
  Busca(finder){
   this.$http
      .get("http://localhost:8000/api/finder" + '?finder=' + finder).then(result => {
        this.laptops = result.data  
        Vue.set(this.laptops,result.data)
    })
  },

  

  }, 


};
</script>

<style>

html {
  background-color: #ffffff;
}

h1.title {
  z-index: 999;
  display: block;
  font-size: 4rem;
}

#nav {
  z-index: 999;
  position:sticky
}

#particles-js {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.wrap-banner {
  position: relative;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-flex;
  display: flex;
  height: 100%;
  justify-content: center;
}

.main-title {
  margin-top: 10em;
  color: #000;
  z-index: 999;
}

h2.statement {
  font-size: 3rem;
}
.laptop{
width: 25%;
}
@media all and (max-width: 900px) {
  h2.statement {
    font-size: 1.4rem;
  }
  h1.title {
    font-size: 2.5rem;
  }
  .main-title {
  margin-top: 4em;
  margin-left: 0.5em;
  margin-right:0.5em;
  color: #000;
  z-index: 999;
}
  .laptop{
    width: 50%;
  }
}

.link-accent {
  color: #3030FF;
}

.laptopBox{
 
display: inline-flex;
flex-flow: wrap;
}
#page-wrap{
    display:flex;
}

</style>
