<template>
<div id='ApiBackup'>


<div id='content' class='row justify-content-center'>
<button v-if="!loading && !loading2" type="button" @click='LoadApi' class="btn btn-success">{{this.$t('CARGA_API')}}</button>
<button v-if="!loading && !loading2" type="button" @click='LoadBackup' class="btn btn-secondary">{{this.$t('CARGA_BACKUP')}}</button>
<div v-if="loading || loading2" class="sk-rotating-plane"></div>
</div>
<div v-if="loading || loading2" class='row justify-content-center'> {{this.$t('WAIT')}} </div>
<div v-if="!loading && !loading2 && laptops != null && !laptops.length == 0" class='row justify-content-center'> <h2> {{this.$t('LAPTOPS_LOADED')}} </h2> </div>

       <div class="laptopBox container" >
       <div class="laptop" v-bind:key="laptop.id" v-for="(laptop, index) in laptops">
     <router-link :to="{name: 'LaptopView', params:{laptopId : laptop.id}}" active-class='none'> 
        <Laptop  :laptop = laptop> </Laptop>
     </router-link>
       </div>



</div>
</div>



</template>


<script>
import Laptop from "../Laptop/LaptopView.vue";
export default {
  name: "app",
  components: {
      Laptop,
  }, data(){
  return {
      laptops: [],
      loading: false,
      loading2: false,
      wait: '',

  }
  },
  mounted: function() {



  },  methods: {
      LoadApi(){
          this.loading = true;
          this.loading2 = true;
          let token = `JWT ${this.$cookies.get("token")}`;
           this.$http
            .get("http://localhost:8000/api/findLaptops", {
              headers: { Authorization: token }
            }).then(result => {
              this.loading = false;
              this.wait = result.data.message;
              if(this.wait == 'Finalizada carga'){
             this.$http
            .get("http://localhost:8000/api/loadBackup", {
              headers: { Authorization: token }
            })
            .then(result => {
              this.laptops = result.data;
              this.loading2 = false;
            });
          }
            });

            
            

      },


LoadBackup(){
          this.loading = true;
          this.loading2 = true;
          let token = `JWT ${this.$cookies.get("token")}`;
             this.$http
            .get("http://localhost:8000/api/loadBackup", {
              headers: { Authorization: token }
            })
            .then(result => {
              this.loading = false;
              this.loading2 = false;
              if(result.data != null){
              this.laptops = result.data;
              }
              
            });
            
            

      }


  }
}


</script>

<style>
#content{
margin-top:25%;
margin-left:25%;
margin-right:25%;
}
.sk-rotating-plane {
  width: 40px;
  height: 40px;
  background-color: #333;
  margin: 40px auto;
  -webkit-animation: sk-rotatePlane 1.2s infinite ease-in-out;
          animation: sk-rotatePlane 1.2s infinite ease-in-out; }
@-webkit-keyframes sk-rotatePlane {
  0% {
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            transform: perspective(120px) rotateX(0deg) rotateY(0deg); }
  50% {
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg); }
  100% {
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg); } }
@keyframes sk-rotatePlane {
  0% {
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            transform: perspective(120px) rotateX(0deg) rotateY(0deg); }
  50% {
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg); }
  100% {
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg); } }
  </style>
</style>