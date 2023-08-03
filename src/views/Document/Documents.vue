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
            <th></th>
          </tr>
          </thead>
          <tbody>
          <template v-for="document in documents" :key="document.id">


          <tr :class="isEdit(document.id) ? 'd-none' : ''">
            <td>{{ document.id }}</td>
            <td>{{ document.documentType }}</td>
            <td>{{document.documentNumber}}</td>
            <td>{{document.documentDate}}</td>
            <td>{{document.description}}</td>
            <td>{{document.invoiceType}}</td>
            <td><router-link :to="{name:'users.single', params: { id: `${document.user_id}` }}">{{document.user}}</router-link></td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-outline-primary btn-fw">Открыть</button>
                <button type="button" class="btn btn-outline-success btn-fw" @click="getUpdateId(document.id,document.documentType,document.documentNumber,document.documentDate,document.description,document.invoiceType)">Изменить</button>
                <button type="button" class="btn btn-outline-danger btn-fw">Удалить</button>
              </div>
            </td>
          </tr>

          <tr :class="isEdit(document.id) ? '' : 'd-none'">
            <td>{{ document.id }}</td>
            <td><input type="text" class="form-control" v-model="updateDocument.documentType"></td>
            <td><input type="number" class="form-control" v-model="updateDocument.documentNumber"></td>
            <td><input  type="date" min="1900-01-01" max="2999-12-31" id="sq_100i" placeholder="" aria-required="true" aria-labelledby="sq_100_ariaTitle" aria-invalid="false" class="sd-input sd-text form-control" data-gtm-form-interact-field-id="0" v-model="updateDocument.documentDate"></td>
            <td><input type="text" class="form-control" v-model="updateDocument.description"></td>
            <td><input type="text" class="form-control" v-model="updateDocument.invoiceType"></td>
            <td><router-link :to="{name:'users.single', params: { id: `${document.user_id}` }}">{{document.user}}</router-link></td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-outline-success btn-fw" @click="updateDocumentDb">Обновить</button>
                <button type="button" class="btn btn-outline-success btn-fw" @click="getUpdateId(null)">Изменить</button>
                <button type="button" class="btn btn-outline-danger btn-fw">Удалить</button>
              </div>
            </td>
          </tr>

          </template>
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
      showUpdateId: null,
      updateDocument:{documentType:'', documentNumber:null, documentDate:null,description:'',invoiceType:'',id:null}
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

    getUpdateId(id,docType,docNumber,docDate,docDescription,docInvoiceType){
      this.showUpdateId = id;
      this.updateDocument = {documentType:docType, documentNumber:docNumber, documentDate:docDate, description:docDescription, invoiceType: docInvoiceType, id: id}
    },

    isEdit(id){
      return this.showUpdateId === id;
    },

    async updateDocumentDb(){
      const data = {documentType: this.updateDocument.documentType, documentNumber:this.updateDocument.documentNumber, documentDate:this.updateDocument.documentDate,description:this.updateDocument.description,invoiceType:this.updateDocument.invoiceType};
      const response = await axios.patch('http://localhost:3000/document/'+this.updateDocument.id,data);
      this.showUpdateId = null;
      this.getDocuments();
    }

  },


  mounted() {
    this.getDocuments();

  }
})
</script>

<style scoped>

</style>