<template>
<div id='comment' >
<div class ='row' v-bind:key="comment.id" v-for="(comment, index) in comments">
<div id='CommentBox'>
<div id='User'>
<p class="font-weight-bold"> {{comment.user}} -- {{FormateDate(comment.date)}} </p>
</div>
<div id='CommentText'>
{{comment.text}}
</div>
</div>

</div>


</div>
</template>


<script>
import moment from 'moment'
export default {
      name: 'Comment',
      components: {
  },props: ['comments'],
 methods:{
      FormateDate: function(date){
        var x = moment(String(date)).format('DD/MM/YYYY : HH:mm')
        return x
      }
  },


}
</script>

<style>
#CommentBox{
    width:100%;
    border: solid 1px lightblue;
    margin-top: 5px;
    margin-bottom: 5px;
    -webkit-box-shadow: 10px 10px 35px 4px rgba(89,89,89,0.73);
-moz-box-shadow: 10px 10px 35px 4px rgba(89,89,89,0.73);
box-shadow: 10px 10px 35px 4px rgba(89,89,89,0.73);
}
#User{
    background: lightblue;
}
#Commenttext{
    font-size: 18px;
}

</style>