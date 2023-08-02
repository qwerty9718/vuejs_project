<template>
  <div class="container-fluid">

    <div class="card w-75" style="margin: auto">
      <div class="card-body">
        <h4 class="card-title">Создать нового пользователя</h4>
        <h4 class="card-title text-success">{{message}}</h4>
        <form class="forms-sample">

          <div class="form-group">
            <label>Имя</label>
            <input type="text" class="form-control" placeholder="Введите имя" v-model="user.name">
            <p class="err mt-2">{{error.name}}</p>
          </div>

          <div class="form-group">
            <label>Фамилия</label>
            <input type="text" class="form-control" placeholder="Введите фамилию" v-model="user.surname">
            <p class="err mt-2">{{error.surname}}</p>
          </div>

          <div class="form-group">
            <label>Дата рождения</label>
            <input type="date" min="1900-01-01" max="2999-12-31" id="sq_100i" placeholder="" aria-required="true" aria-labelledby="sq_100_ariaTitle" aria-invalid="false" class="sd-input sd-text form-control" data-gtm-form-interact-field-id="0" v-model="user.date">
            <p class="err mt-2">{{error.date}}</p>
          </div>

          <div class="form-group">
            <label>Серия Паспорта</label>
            <input type="text" class="form-control" placeholder="Введите серию паспорта" v-model="user.passport">
            <p class="err mt-2">{{error.passport}}</p>
          </div>


          <div class="form-group">
            <label>Выбрать Пол</label>
            <select class="form-control" v-model="user.gender">
              <option value="мужской">Мужской</option>
              <option value="женский">Женский</option>
              <option value="">Не указан</option>
            </select>
          </div>

          <button type="button" class="btn btn-primary mr-2" @click="create">Создать</button>
        </form>
      </div>
    </div>


  </div>

</template>

<script>
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "CreatUser",
  data(){
    return{
      user: {name:'', surname: '', date:'', passport:'', gender:'',active:true},
      error: {name:'', surname: '', date:'', passport:''},
      message:''
    }
  },

  methods:{
    create(){
      this.validation();
      if (this.user.name !== '' && this.user.surname !== '' && this.user.date !=='' && this.user.passport !== ''){
        const data = {name: this.user.name, surname: this.user.surname, date: this.user.date, passport: this.user.passport, gender: this.user.gender, active: this.user.active};
        const response = axios.post('http://localhost:3000/users',data);
        this.user = {name:'', surname: '', date:'', passport:'', gender:'',active:true};
        this.message = 'Пользователь создать'
      }
    },

    validation(){
      if (this.user.name === ''){
        this.error.name = 'Вы не ввели имя'
      }
      if (this.user.name !== ''){
        this.error.name = ''
      }

      if (this.user.surname === ''){
        this.error.surname = 'Вы не ввели фамию'
      }
      if (this.user.surname !== ''){
        this.error.surname = ''
      }

      if (this.user.date === ''){
        this.error.date = 'Вы не ввели дату'
      }
      if (this.user.date !== ''){
        this.error.date = ''
      }

      if (this.user.passport === ''){
        this.error.passport = 'Вы не ввели серию паспорта'
      }
      if (this.user.passport !== ''){
        this.error.passport = ''
      }
    }
  }
})
</script>



<style scoped>
.err{
  color: red;
}
</style>