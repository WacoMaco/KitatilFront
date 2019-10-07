<template>
        <b-card v-if="laptop.name.length < 30" class='laptop-bcard' :title="laptop.name">
        <b-card-text class="card-text">
          <label for="price">{{ $t('price') }}:</label>
          {{laptop.bestPrice}}€
        </b-card-text>
        <b-card-text class="card-text">
          <label for="ki">Ki:</label>
          {{laptop.ki}}
        </b-card-text>

        </b-card>
        <b-card v-else class='laptop-bcard' :title="laptop.name.substring(0,30) + '...'">
           <b-card-text class="card-text">
          <label for="price">{{ $t('price') }}:</label>
          {{laptop.bestPrice}}€
        </b-card-text>
        <b-card-text class="card-text">
          <label for="ki">Ki:</label>
          {{laptop.ki}}
        </b-card-text>
        </b-card>
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
</style>
