<template>
<div id='app' class="container">

<div class="EditButton" v-if="isAdmin">
 <router-link class="btn btn-success" :to="{name: 'LaptopEdit', params:{laptopId : laptop.id}}"> {{this.$t('edit')}} </router-link>
</div>

<h2> {{laptop.name}}</h2>

<div id= 'cabecera' class='row'>

<div id='LaptopImage' class='col justify-content-center'>
<img id="LaptopImagTag" alt="No image" :src="this.laptop.image_url"/>
</div>
<div id="ki" class ='col-2'>
          <div v-if="laptop.ki > 4" id="LaptopInfo" class="btn btn-primary"><img class="logo" alt="Kimovil Logo" src="./../assets/logo.png"/> {{laptop.ki}} </div>
          <div v-if="laptop.ki < 4 && laptop.ki > 3" id="LaptopInfo" class="btn btn-warning"><img class="logo" alt="Kimovil Logo" src="./../assets/logo.png"/> {{laptop.ki}} </div>
          <div v-if="laptop.ki <= 3" id="LaptopInfo" class="btn btn-danger"><img class="logo" alt="Kimovil Logo" src="./../assets/logo.png"/> {{laptop.ki}} </div></div>
<div id ='Score Graphic justify-content-center' class="col">
    <Chart :performanceScore = 'laptop.performanceScore' :batteryScore = 'laptop.batteryScore' :otherScore = 'laptop.otherScore' :displayScore = 'laptop.displayScore'/>
</div>

</div>

<div class= 'row'>

<div class = 'col'>
<star-rating  v-if= 'this.getCookie("token") && !isAdmin' :increment='0.5' @rating-selected= 'SaveRating' :read-only= 'rated' v-model="rating"></star-rating>
</div>


<div id='Average' class = 'col'>
{{this.$t('Average_Ratings')}}: <strong class='AverageNumber'> {{ratingAverage}} <strong v-if = "ratingAverage == null">--</strong> </strong>
</div>

</div>


<div class ='row'>

<div id ="Specifications" class='col'>
<Specificationlist :specifications = "specifications"/>
</div>

<div id ="Offers" class='.col-sm-'>
<OfferList :offers = "offers"/>
</div>




</div>



<Comment :comments ='comments'/>

<div v-if= 'this.getCookie("token") && !isAdmin' class='row'>

<textarea  :state= "newComment.length > 5"  v-model='newComment' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

<button :disabled = "newComment.length <= 5" class="btn btn-success" v-on:click="SendComment">{{this.$t('send')}}</button>

</div>

</div>
</template>

<script>

import Specificationlist from "./Specifications/Specificationlist.vue";
import OfferList from "./Offers/OffersList.vue";
import Chart from "./Laptop/Chart.vue"
import Comment from "./Comment/Comment.vue"
import StarRating from 'vue-star-rating'

export default {
    components: {
        Specificationlist,
        OfferList,
        Chart,
        Comment,
        StarRating
  },
    props:['laptopId'],
    data(){
        return{
            id: '',
            laptop : [],
            specifications: [],
            comments: [],
            offers:[],
            isAdmin: false,
            newComment: '',
            rating: 0,
            rated: false,
            userRating: 0,
            ratingAverage: 0,
        }

        
    },

 mounted: function() {
    if(this.getCookie("token")){
    var token = "JWT " + this.$cookies.get("token");
    } else{
        var token =''
    }
    this.$http.get('https://kitatil-api.herokuapp.com/api/laptopView?laptopId='+ this.$route.params.laptopId,{
          headers: { Authorization: token }
        }).then((result) => {
            this.laptop = result.data.Laptop
            this.specifications = result.data.Specifications
            this.offers = result.data.Offers
            this.comments = result.data.Comments
            this.rated = result.data.Rating.Rated
            this.rating = result.data.Rating.Rating
            this.ratingAverage = result.data.Rating.Average.score__avg
        })
    if (this.getCookie("user_type") == "admin") {
      this.isAdmin = true;
    }
 

 }, methods: {
     getCookie: function(name) {
      var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return v ? v[2] : null;
    },
    SendComment(){
         const formData = new FormData();
        var token = "JWT " + this.$cookies.get("token");
        formData.append("laptopId", this.laptop.id);
        formData.append("text", this.newComment);
        this.$http
      .post("https://kitatil-api.herokuapp.com/api/createComment",formData,{
          headers: { Authorization: token }
        }).then(result => { 
            this.$bvModal.msgBoxOk(this.$t('CommentSaved'),  {
            okTitle:'Ok'
          }).then(value => { if(value){this.$router.go()}});

        });

    },

        SaveRating(){
         this.rated = true
        const formData = new FormData();
        var token = "JWT " + this.$cookies.get("token");
        formData.append("laptopId", this.laptop.id);
        formData.append("score", this.rating);
        this.$http
      .post("https://kitatil-api.herokuapp.com/api/createRating",formData,{
          headers: { Authorization: token }
        }).then(result => { 
            this.$bvModal.msgBoxOk(this.$t('LaptopRated'),  {
            okTitle:'Ok'
          }).then(value => { if(value){this.$router.go()}});

        });

    },
 }
}
</script>

<style scoped>
#ki{
    margin:auto;
}
.EditButton{
    margin-top:10px;
    margin-bottom: 10px;
}
#Average{
    margin:auto;
}

.AverageNumber{
    margin:auto;
    font-size: 30px;
}

</style>