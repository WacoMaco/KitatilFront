<template>
<div id='ApiBackup'>


<div id='content' class='row justify-content-center'>
<button v-if="!loadApiBol && !loadBackupBol" type="button" @click='LoadApi' class="btn btn-success">{{this.$t('CARGA_API')}}</button>
<button v-if="!loadApiBol && !loadBackupBol" type="button" @click='LoadBackup' class="btn btn-secondary">{{this.$t('CARGA_BACKUP')}}</button>

</div>
<div v-if="loadApiBol" class='row justify-content-center'> {{this.$t('WAIT')}} </div>
<div v-if="loadBackupBol" class='row justify-content-center'> {{this.$t('WAIT2')}} </div>
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
      loadApiBol: false,
      loadBackupBol: false,

  }
  },
  mounted: function() {



  },  methods: {
      LoadApi(){
          let token = `JWT ${this.$cookies.get("token")}`;
           this.$http
            .get("https://kitatil-api.herokuapp.com/api/findLaptops", {
              headers: { Authorization: token }
            }).then(result => {
              this.wait = result.data.message;
              this.loadApiBol = true;
            });

            
            

      },


LoadBackup(){
          let token = `JWT ${this.$cookies.get("token")}`;
             this.$http
            .get("https://kitatil-api.herokuapp.com/api/loadBackup", {
              headers: { Authorization: token }
            })
            .then(result => {
              if(result.data != null){
              this.laptops = result.data;
              this.loadBackupBol = true;
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