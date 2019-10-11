<template>
  <div id="app">
    <Menu @Ordena= "Ordena"/>
   
    
    
    <div id="page-wrap">
       <Navbar id="nav" @Busca= "Busca"/>
       <div class="laptopBox">
       <div class="laptop" v-bind:key="laptop.id" v-for="(laptop, index) in laptops">
        <Laptop   :laptop = laptop> </Laptop>
       </div>e
       <router-link to="/bar">Go to Bar</router-link>
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
      @status="cookieStatus"
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
  <Footer/>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import Advertisement from "../../components/Advertisement.vue";
import Laptop from "../../components/Laptop/LaptopView.vue";
import Menu from "../../components/Menu.vue";
import Vue from 'vue';


export default {
  name: "app",
  components: {
    Navbar,
    Footer,
    Laptop,
    Menu,
    Vue,
  },
  data(){
  return {
      laptops: [],
      filter: '',
      itemsCargados: false,
      test : [],

  }
  },
  mounted: function() {

      this.$http
      .get("http://localhost:8000/api/laptopsList",{Headers: {filter:''}}).then(result => {
        this.laptops = result.data
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
  
  methods: {
    cookieClickedDecline() {
      window.history.back();
    },
    Ordena(laptops) {
      this.laptops = [];
      this.laptops = laptops;
    },
  Busca(finder){
   this.$http
      .get("http://localhost:8000/api/finder" + '?finder=' + finder).then(result => {
        this.laptops = result.data  
        Vue.set(this.laptops,result.data)
    })
  }
  },

};
</script>

<style>
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
@media all and (max-width: 699px) {
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
</style>
