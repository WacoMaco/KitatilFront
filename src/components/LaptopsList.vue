<template>
  <div id="ListaPortatiles">
    <Menu  @precio="precioFun" @Ordena= "Ordena"/>  
           
    <div id="page-wrap">
       <div v-if="laptops.length > 0" class="laptopBox container" >
       <div class="laptop" v-bind:key="laptop.id" v-for="(laptop, index) in laptops">
     <router-link id="router" :to="{name: 'LaptopView', params:{laptopId : laptop.id}}" active-class='none'> 
        <Laptop  :laptop = laptop> </Laptop>
     </router-link>
       </div>
       <div style="margin:auto;">
       <button v-if="!this.fin" class='ShowMore' v-on:click="loadMore">+ </button>
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
      laptopsLoaded: 0,
      fin: false,
      min_price: 0,
      max_price: 3000,

  }
  },
  mounted: function() {
      this.$http
      .get("http://localhost:8000/api/laptopsList?index="+ this.laptopsLoaded + "&filter=" + this.filter +
       "&min_price=" + this.min_price + "&max_price=" + this.max_price).then(result => {
        this.laptops = result.data;
        this.laptopsCopy = result.data;
        this.laptopsLoaded = this.laptopsLoaded + 12;
        this.itemsCargados = true;
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

  },
  methods: {

    loadMore(){
      this.$http
      .get("http://localhost:8000/api/laptopsList?index="+ this.laptopsLoaded + "&filter=" + this.filter +
       "&min_price=" + this.min_price + "&max_price=" + this.max_price).then(result => {
        this.laptops = this.laptops.concat(result.data);
        this.laptopsCopy = this.laptopsCopy.concat(result.data);
        if(result.data.length < 12){
          this.laptopsLoaded = this.laptopsLoaded + result.data.length;
          this.fin = true;
        } else{
          this.laptopsLoaded = this.laptopsLoaded + 12;
        }
        this.itemsCargados = true;
    }
    
    );

    },

  
    cookieClickedDecline() {
      window.history.back();
    },
    Ordena(filter) {
      this.itemsCargados = false;
      this.filter = filter;
      this.laptopsLoaded = 0;
      this.laptops = [];
      this.laptopsCopy = [];
      this.fin = false;
      this.loadMore();
    },
    precioFun(precios){
      this.itemsCargados = false;
      this.min_price =precios[0];
      this.max_price = precios[1];
      this.fin = false;
      this.laptopsLoaded = 0;
      this.laptops = [];
      this.laptopsCopy = [];
      this.loadMore();
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
#page-wrap{
    display:flex;
}
@media all and (max-width: 1000px) {
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

@media all and (max-width: 500px) {
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
    width: 100%;
  }
  #page-wrap{
    display:flex;
    margin-left: 20px;
}
}

.link-accent {
  color: #3030FF;
}

.laptopBox{
 
display: flex;
flex-flow: wrap;
}



.ShowMore {
	background:linear-gradient(to bottom, #44c767 5%, #5cbf2a 100%);
	background-color:#44c767;
	border-radius:42px;
	border:50% solid #18ab29;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
  width: 50px;
  height: 50px;

}
.ShowMore:hover {
	background:linear-gradient(to bottom, #5cbf2a 5%, #44c767 100%);
	background-color:#5cbf2a;
}
.ShowMore:active {
	position:relative;
	top:1px;
}
.none{
  margin:auto;
}
a#router{
  color: black;
}
a#router:hover{
  color: black;
  text-decoration: none;
} 

</style>
