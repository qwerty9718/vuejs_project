<template>
  <div class="container-fluid">

    <div class="card w-75" style="margin: auto">
      <div class="card-body">
        <h4 class="card-title">Создать нового пользователя</h4>
        <h4 class="card-title text-success">{{ message }}</h4>
        <form class="forms-sample">

          <div class="form-group">
            <label>Тип документа</label>
            <input type="text" class="form-control" placeholder="Введите тип доумента" v-model="document.documentType">
            <p class="err mt-2">{{ error.documentType }}</p>
          </div>

          <div class="form-group">
            <label>Номер документа</label>
            <input type="number" class="form-control" placeholder="Введите номер" v-model="document.documentNumber">
            <p class="err mt-2">{{ error.documentNumber }}</p>
          </div>

          <div class="form-group">
            <label>Дата документа</label>
            <input type="date" min="1900-01-01" max="2999-12-31" id="sq_100i" placeholder="" aria-required="true"
                   aria-labelledby="sq_100_ariaTitle" aria-invalid="false" class="sd-input sd-text form-control"
                   data-gtm-form-interact-field-id="0" v-model="document.documentDate">
            <p class="err mt-2">{{ error.documentDate }}</p>
          </div>

          <div class="form-group">
            <label>Описание</label>
            <input type="text" class="form-control" placeholder="Введите описание" v-model="document.description">
            <p class="err mt-2">{{ error.description }}</p>
          </div>

          <div class="form-group">
            <label>Тип счет-фактуры</label>
            <input type="text" class="form-control" placeholder="Введите тип счет фактуры"
                   v-model="document.invoiceType">
          </div>

          <div class="form-group">
            <label>Выбрать доверенное лицо</label>
            <select class="form-control" v-model="document.user_id">
              <option value="">Не выбирать</option>
              <option v-if="users" v-for="user in users" :value="user.id">{{ user.name }} {{ user.surname }}</option>
            </select>
          </div>

          <button type="button" class="btn btn-primary mr-2" @click="create">Создать</button>
        </form>
      </div>
    </div>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateDocument",
  data() {
    return {
      document: {
        documentType: '',
        documentNumber: null,
        documentDate: '',
        description: '',
        invoiceType: '',
        user_id: null
      },
      message: '',
      users: [],
      error: {documentType: '', documentNumber: '', documentDate: '', description: ''}
    }
  },

  methods: {
    async getUsers() {
      const response = await axios.get(' http://localhost:3000/users');
      this.users = response.data;
    },


    create() {
      let validate = this.validation();
      if (validate) {
        const data = {
          documentType: this.document.documentType,
          documentNumber: this.document.documentNumber,
          documentDate: this.document.documentDate,
          description: this.document.description,
          invoiceType: this.document.invoiceType,
          user_id: this.document.user_id
        }

        const response = axios.post('http://localhost:3000/document', data);
        this.document = {
          documentType: '',
          documentNumber: null,
          documentDate: '',
          description: '',
          invoiceType: '',
          user_id: null
        };
        this.message = 'Документ создать'
      }

    },


    validation() {
      if (this.document.documentType === '') {this.error.documentType = 'Вы не ввели тип покумента';}
      if (this.document.documentType !== '') {this.error.documentType = '';}
      if (this.document.documentNumber === null) {this.error.documentNumber = 'вы не ввели номер документа'}
      if (this.document.documentNumber !== null) {this.error.documentNumber = ''}
      if (this.document.documentDate === '') {this.error.documentDate = 'вы не ввели дату'}

      if (this.document.documentDate !== '') {this.error.documentDate = ''}
      if (this.document.description === '') {this.error.description = 'вы ве ввели описание';}
      if (this.document.description !== '') {this.error.description = '';}

      if (this.document.documentType !== '' && this.document.documentNumber !== null && this.document.documentDate !== '' && this.document.description !== '') {
        return true;
      }
      else return false;
    }
  },

  mounted() {
    this.getUsers();
  },

}
</script>

<style scoped>
.err {
  color: red;
}
</style>