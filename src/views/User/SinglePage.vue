<template>
  <div class="container-fluid">
    <div class="container user-page" v-if="user">
        <h2>Id :{{user.id}}</h2>
        <h3>Имя:  {{user.name}} {{user.surname}}</h3>
        <h3>Дата рождения: {{user.date}}</h3>
        <h3>Серия паспорта: {{user.passport}}</h3>
        <h3 v-if="user.gender === '' ? user.gender = 'Не указан' : user.gender">Пол: {{user.gender}}</h3>


      <div class="container mt-5">
        <div v-if="documents" v-for="document in documents" :key="document.id" class="document">

          <h2>Id Документа :{{document.id}}</h2>
          <h3>Тип документа:  {{document.documentType}}</h3>
          <h3>Номер документа: {{document.documentNumber}}</h3>
          <h3>Дата документа: {{document.documentDate}}</h3>
          <h3>Описание :{{document.description}}</h3>
          <h3 v-if="document.invoiceType">Тип счет-фактуры : {{document.invoiceType}}</h3>


        </div>
      </div>



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
      user:null,
      documents:[]
    }
  },

  methods:{
    async getUser(){
      this.id = this.$route.params.id;
      const response = await axios.get(' http://localhost:3000/users/'+this.id);
      this.user = response.data;

      const documents = await axios.get('http://localhost:3000/document?user_id='+this.user.id);
      this.documents = documents.data;
    },

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

.document{
  border: 1px solid teal;
  border-radius: 20px;
  padding: 20px;
}
</style>