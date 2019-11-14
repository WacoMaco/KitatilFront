<template>
  <div id="nav">
    <b-navbar id="navbartag" class="row custom-nav" toggleable="lg">
      <b-navbar-brand id ="NavBarIcon" class="col d-flex justify-content-start">
        <router-link id = "router" :to="{name:'Home'}"> <img id="Kimovil-logo" alt="Kimovil Logo" src="../assets/brand-name2.png"/></router-link>
      </b-navbar-brand>
      
        
        <div class="col d-flex justify-content-center finder">
        <input id="FinderInput" class="" type="text" v-model="finder" placeholder="HP,MSI,ACER..." v-on:focus='GainFocus' v-on:keyup='search'/>
        <div id ='FinderBox' v-if='finder != "" && focused'>
        <div id='LaptopsFinder'  v-bind:key="laptop.id" v-for="(laptop, index) in laptopsFinder">
       <router-link id = "router" v-on:click.native="LoseFocus" :to="{name: 'LaptopView', params:{laptopId : laptop.id}}"> 
         <div class="row FinderRow"> 
           <div class="col FinderName">
           {{laptop.name}} 
           </div>
            <div class="col" >
            <img  id="LaptopImagTagNav" alt="No image" :src="laptop.image_url"/>
          </div>
           </div> 

         </router-link>
        
        </div>
        </div>

        </div>
      <b-navbar-toggle class="col-2" target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        
          <b-nav-form class="buttons">
         <router-link :to="{name:'Login'}" class="btn btn-primary" tag ="button" v-show="!isLoggedIn">{{ $t('login') }}</router-link>
          </b-nav-form>
          <b-nav-form class="buttons">
        <router-link :to="{name: 'Register'}">  <b-button size="sm" class="my-2 my-sm-0 secondary-button" variant="outline-primary" v-show="!isLoggedIn">{{ $t('signup') }}</b-button> </router-link> 
          </b-nav-form>
          <!--<b-nav-item href="/login.html" v-show="!isLoggedIn"><p class="accent-button">{{ $t('login') }}</p></b-nav-item>
          <b-nav-item href="/register.html" v-show="!isLoggedIn">{{ $t('signup') }}</b-nav-item>-->
         <b-nav-item v-show="isLoggedIn && isAdmin"> <router-link id= "router2" :to="{name: 'AdminTools.api'}">  {{ $t('admin_tools') }} </router-link> </b-nav-item> 
          <b-nav-item href="#" v-show="isLoggedIn" @click="logOut">{{ $t('logout') }}</b-nav-item>
          <b-nav-item-dropdown :text="$t('lang')" v-model="$i18n.locale" right>
            <b-dropdown-item
              v-for="(lang, i) in langs"
              :key="`Lang${i}`"
              :value="lang"
              @click="changeLanguage(lang)"
            >{{ lang }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {},
  data() {
    return {
      items: [],
      form: {
        title: "",
        description: "",
        status: "",
        date: null
      },
      laptopsFinder: [],
      isLoggedIn: null,
      langs: ["English 🇬🇧", "Español 🇪🇸"],
      language: this.$t.lang,
      unviewedMessages: 0,
      finder: '',
      isAdmin: false,
      focused: false,
    };
  },
  mounted: function() {
    //var token = 'JWT ' + this.$cookies.get('token')


     
      if (this.getCookie("user_type") == "admin") {
      this.isAdmin = true;
    }



  },
  created: function() {
    if (this.getCookie("token")) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  },
  methods: {
    LoseFocus(){
      this.focused = false;
    },
    GainFocus(){
      this.focused = true;
    },
    getCookie: function(name) {
      var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return v ? v[2] : null;
    },
    setCookie: function(name, value, days) {
      var d = new Date();
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
      document.cookie =
        name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    logOut: function() {
      this.setCookie("token", "", -1);
      this.setCookie("ads", "true");
      this.setCookie("user_type", " ");
      window.location.href = "/";
    },
    changeLanguage: function(lang) {
      switch (lang) {
        case 'Español 🇪🇸':
            lang = 'es'
            break
        case 'English 🇬🇧':
            lang = 'en'
            break
      }
      this.$i18n.locale = lang;
      this.setCookie("lang", lang, 2);
      //window.location.href = "/"
    },
      search(){
        if(this.finder != ''){
           this.$http
      .get("https://kitatil-api.herokuapp.com/api/finder" + '?finder=' + this.finder).then(result => {
        this.laptopsFinder = result.data  
        
    })
    }
  },
  },
  computed: {
  }
};
</script>
<style>
#Kimovil-logo {
  height: 50px;
  width: auto;
}

#navbartag{
  margin-left: 0px;
  
}

.custom-nav {
background: -moz-linear-gradient(45deg, #d8a3f7 0%,#4c66ea 25%,#ea3f95 50%,#6b213e 75%,#f708ab 100%); 
background: -webkit-linear-gradient(45deg, #d8a3f7 0%,#4c66ea 25%,#ea3f95 50%,#6b213e 75%,#f708ab 100%); 
background: linear-gradient(45deg, #d8a3f7 0%,#4c66ea 25%,#ea3f95 50%,#6b213e 75%,#f708ab 100%);
  top:0px;
  position: fixed;
  width: 100%;
}
@media all and (max-width: 1000px) {
  .custom-nav {
background: -moz-linear-gradient(45deg, #381436 0%,#2f3348 25%,#ea3f95 50%,#6b213e 75%,#f708ab 100%); 
background: -webkit-linear-gradient(45deg, #381436 0%,#2f3348 25%,#ea3f95 50%,#6b213e 75%,#f708ab 100%); 
background: linear-gradient(45deg, #381436 0%,#2f3348 25%,#ea3f95 50%,#6b213e 75%,#f708ab 100%);
  top:0px;
  position: fixed;
  width: 100%;
}
}
.accent-button {
  background-color: #22546f !important;
  border-color: #22546f;
  color: #fff;
  border: 0.5rem;
  margin-left: 0.3rem;
}

.secondary-button {
  background-color: #fff !important;
  border-color: #22546f !important;
  color: #22546f !important;
  margin-left: 0.3rem;
}

@media all and (max-width: 1000px)  {
  .buttons {
    text-align: center !important;
    display: block !important;
    margin-top:0.5rem;
  }
}
#LaptopImagTagNav{
  max-width: 50%;
}
.FinderName{
        display: -webkit-box;
    -moz-line-clamp: 4;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
#notification{
    background: blue;
    color: white;
    border-radius: 60%;
    padding-left: 2px;
    padding-right: 2px;
}
.finder{
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}
#FinderBox{
  position: absolute;
  background: blue;
  MAX-WIDTH: 300px;
    margin-top:35px;
    z-index: 10;

}
.FinderRow{
  font-size: 75%;
  background: white;
  border: 5px outset #1C6EA4;
  padding-top: 10px;
}

.card-body{
  overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
#FinderInput{
  border-radius: 20px;
}
a#router{
  color: black;
}
a#router:hover{
  color: black;
  text-decoration: none;
} 

  @media all and (max-width: 600px) {
  #FinderInput {
      border-radius: 20px;

    }
  .NavBarIcon{
    -webkit-box-pack: center !important;
    justify-content: center !important;
  }
  #navbartag {
    margin-right: 0px;
  }
  .navbar{
    display: inline-block !important;
  }
  #FinderBox{
  position: absolute;
  background: blue;
  width: 150px;
    margin-top:35px;
     z-index: 10;
    

}
  #NavBarIcon{
    -webkit-box-pack: center !important;
    justify-content: center !important;
    display: flex !important;
  }
  #LaptopImagTagNav{
  max-width: 100%;
}
  }
a#router2{
  color: rgba(0, 0, 0, 0.5);
}
a#router2:hover{
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
} 
.FinderRow:hover{
  transform: scale(1.1)
}

input {
      padding: 4px 12px;
      color: rgba(0,0,0,.70);
      border: 1px solid rgba(0,0,0,.12);
      transition: .15s all ease-in-out;
      background: white;
      &:focus {
        outline: none;
        transform: scale(1.05);
        & + label  {
          font-size: 10px;
          transform: translateY(-24px) translateX(-12px);
        }
      }
      &::-webkit-input-placeholder {
          font-size: 12px;
          color: rgba(0,0,0,.50);
          font-weight: 100;
      }
    }
  


</style>
