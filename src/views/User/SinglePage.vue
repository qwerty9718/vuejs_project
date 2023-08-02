<template>
  <div class="container-fluid">
    <div class="container user-page" v-if="user">
        <h2>Id :{{user.id}}</h2>
        <h3>Имя:  {{user.name}} {{user.surname}}</h3>
        <h3>Дата рождения: {{user.date}}</h3>
        <h3>Серия паспорта: {{user.passport}}</h3>
        <h3 v-if="user.gender === '' ? user.gender = 'Не указан' : user.gender">Пол: {{user.gender}}</h3>
    </div>
  </div>
</template>


<script>
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "SinglePage",
  data(){
    return{
      id:null,
      user:null
    }
  },

  methods:{
    async getUser(){
      this.id = this.$route.params.id;
      const response = await axios.get(' http://localhost:3000/users/'+this.id);
      this.user = response.data;
    }
  },

  mounted() {
    this.getUser();
  }
})
</script>

<style scoped>
.user-page{
  border: 1px solid teal;
  border-radius: 20px;
  padding: 20px;
}
</style>