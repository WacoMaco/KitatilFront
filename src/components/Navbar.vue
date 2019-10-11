<template>
  <div id="nav">
    <b-navbar class="custom-nav" toggleable="lg"  :sticky="true">
      <b-navbar-brand href="/">
        <router-link :to="{name:'Home'}"> <img id="Kimovil-logo" alt="Kimovil Logo" src="../assets/brand-name2.png"></router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        
        <div class="finder">
        <input type="text" v-model="finder" placeholder="Search title.." v-on:keyup='search'/>
        <div id ='FinderBox'  v-if='finder != ""'>
        <div id='LaptopsFinder' v-bind:key="laptop.id" v-for="(laptop, index) in laptopsFinder">
       <router-link :to="{name: 'LaptopView', params:{laptopId : laptop.id}}"> <b-card  class='laptop-bcard' :title="laptop.name"/> </router-link>
        
        </div>
        </div>

        </div>

      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        
          <b-nav-form class="buttons">
         <router-link :to="{name:'Login'}" class="btn btn-primary" tag ="button" v-show="!isLoggedIn">{{ $t('login') }}</router-link>
          </b-nav-form>
          <b-nav-form class="buttons">
          <b-button size="sm" class="my-2 my-sm-0 secondary-button" variant="outline-primary" href="/register.html" v-show="!isLoggedIn">{{ $t('signup') }}</b-button>
          </b-nav-form>
          <!--<b-nav-item href="/login.html" v-show="!isLoggedIn"><p class="accent-button">{{ $t('login') }}</p></b-nav-item>
          <b-nav-item href="/register.html" v-show="!isLoggedIn">{{ $t('signup') }}</b-nav-item>-->
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
      finder: ''
    };
  },
  mounted: function() {
    //var token = 'JWT ' + this.$cookies.get('token')

       if (this.getCookie("token")) {
        var token = 'JWT ' + this.$cookies.get('token')

        this.$http.get('https://api5-datame.herokuapp.com/api/v3/unvieweds',{ headers:
        { Authorization: token }
        }).then((result) => {

            this.unviewedMessages = result.data.message
        })


     }

    if (this.getCookie("user_type") == "com") {
      this.isCompany = true;
    } else if (this.getCookie("user_type") == "ds") {
      this.isDataScientist = true;
    } else if (this.getCookie("user_type") == "admin") {
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
      .get("http://localhost:8000/api/finder" + '?finder=' + this.finder).then(result => {
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

.custom-nav {
  background-color:  rgb(150, 150, 244);
  top:0px;
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
  MAX-WIDTH: 500px;
}

.card-body{
  overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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
