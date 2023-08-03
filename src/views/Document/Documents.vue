<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Список Документов</h4>
      <div class="table-responsive pt-3">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>#</th>
            <th>Тип документа</th>
            <th>Номер</th>
            <th>Дата документа</th>
            <th>Описание</th>
            <th>Тип счет-фактуры</th>
            <th>ФИО доверенного человека</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="document in documents" :key="document.id">
            <td>{{ document.id }}</td>
            <td>{{ document.documentType }}</td>
            <td>{{document.documentNumber}}</td>
            <td>{{document.documentDate}}</td>
            <td>{{document.description}}</td>
            <td>{{document.invoiceType}}</td>
            <td><router-link :to="{name:'users.single', params: { id: `${document.user_id}` }}">{{document.user}}</router-link></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>




</template>


<script>
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "Documents",
  data() {
    return {
      documents: [],
    }
  },

  methods: {
    async getDocuments() {
      const response = await axios.get('http://localhost:3000/document');
      this.documents = response.data;

      for (let i = 0; i <response.data.length ; i++) {
        if (response.data[i].user_id !== null){
          const users = await axios.get('http://localhost:3000/users/'+response.data[i].user_id);
          this.documents[i].user = users.data.name + ' ' + users.data.surname;
        }
      }
    },


  },


  mounted() {
    this.getDocuments();

  }
})
</script>

<style scoped>

</style>