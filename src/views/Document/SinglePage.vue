<template>
  <div class="container-fluid">
    <div class="container document-page" v-if="document">
      <h2>Id :{{document.id}}</h2>
      <h3>Тип документа:  {{document.documentType}}</h3>
      <h3>Номер документа: {{document.documentNumber}}</h3>
      <h3>Дата документа: {{document.documentDate}}</h3>
      <h3>Описание :{{document.description}}</h3>
      <h3 v-if="document.invoiceType">Тип счет-фактуры : {{document.invoiceType}}</h3>
      <h3 v-if="document.user_id && user">Доверенное лицо : <router-link :to="{name:'users.single', params: { id: `${user.id}` }}"> {{user.name}} {{user.surname}} </router-link> </h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SinglePage",
  data(){
    return{
      id:null,
      document:null,
      user:null
    }
  },

  methods:{
    async getDocument(){
      this.id = this.$route.params.id;
      const response = await axios.get(' http://localhost:3000/document/'+this.id);
      this.document = response.data;
      if (response.data.user_id){
        const user = await axios.get('http://localhost:3000/users/'+response.data.user_id);
        this.user = user.data;
      }
    },

  },

  mounted() {
    this.getDocument();

  }
}
</script>

<style scoped>
.document-page{
  border: 1px solid teal;
  border-radius: 20px;
  padding: 20px;
}
</style>