<template>
<div id='Laptop' class ='container' >

        <b-card class='laptop-bcard'>
          <div class ='row justify-content-center'>
          <b-card-text id ='LaptopCard' class='col'> {{laptop.name}}" </b-card-text>
          </div>
        <div class ='row justify-content-center'>
        <img class='col-4' id="LaptopImagTag" alt="No image" :src="this.laptop.image_url"/>
        </div>

         <div class ='row justify-content-center'>
         <div id="LaptopInfo" class="btn btn-primary"> {{laptop.bestPrice}}€ </div>

        </div>

        <div  class ='row justify-content-center'>
          <div id="LaptopInfo" class="btn btn-primary"><img class="logo" alt="Kimovil Logo" src="../../assets/logo.png"/> {{laptop.ki}} </div>

        </div>

        </b-card>
</div>
</template>

<script>
export default {
    name: "Laptop",
    data(){
        return{

        }
    },
    props:['laptop'],
    methods:{
        deleteLaptop(laptop_id, text){
            var token = "JWT " + this.$cookies.get("token");
            const formData = new FormData();
            formData.append('laptop_id', laptop_id);
            this.$bvModal.msgBoxConfirm(text, {
              okTitle:this.$t('accept'),
              cancelTitle:this.$t('cancel')
            }).then(value => {
              if(value === true){
                this.$http
                  .post(" https://api5-datame.herokuapp.com/api/v2/delete_laptop", formData, {
                    headers: { Authorization: token }
                  })
                  .then(result => {
                    location.reload();
                  });
              }
            })
        }
    }
}

</script>

<style>
.laptop-bcard {
  margin: 2em;
}
#LaptopImagTag{
  max-width: 50%;
}
#Laptop:hover{
  transform: scale(1.2);
  text-decoration: none;
}
#LaptopInfo{
  margin-top:1%;
  border-radius: 20px;
  padding: 1px 5px;
}
.logo{
  height: 20px;
  width: auto;
}
</style>
