<template>
  <div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Список Сотрудников</h4>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Имя</th>
              <th>Дата рождения</th>
              <th>Серия и номер паспорта</th>
              <th>Пол</th>
              <th>Активность</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="py-1"><img src="/template/user-img.png" alt="image"></td>
              <td>{{ user.id }}</td>
              <td>{{ user.name }} {{ user.surname }}</td>
              <td>{{ user.date }}</td>
              <td>{{ user.passport }}</td>
              <td v-if="user.gender === '' ? user.gender = 'Не указан' : user.gender">{{ user.gender }}</td>
              <td>
                <div class="form-check form-check-success">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" :checked="user.active" @click="setActive(user.active,user.id)">
                    {{ user.active ? 'Активен' : 'Не активен' }}
                    <i class="input-helper"></i>
                  </label>
                </div>
              </td>
              <td>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                  <button type="button" class="btn btn-outline-success btn-fw" data-toggle="modal" data-target="#exampleModal" @click="getEdit(user.id)">Изменить</button>
                  <button type="button" class="btn btn-outline-danger btn-fw" @click="deleteUser(user.id)">Удалить</button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>


  <!-- Модальное окно -->
  <ModalView :edit-user="editUser" @updateUser="updateUser"/>

</template>

<script>
import {defineComponent} from 'vue'
import axios from "axios";
import ModalView from "@/components/html/ModalView.vue";
/*
1) Установить Axios для async запросов к Базе данных
2) Функция getUsers берет из БД Список пользователей
3) Циклом V-For отображаем список пользователей
4) Функция setActive Устанавливет активен пользователь или нет
5) Функция getEdit Получает данные пользователя которые нужно изменить
6) Функция updateUser обновляет данные пользователя и затем отрисовавет изменения
 */
export default defineComponent({
  name: "Users",
  components: {ModalView},
  data() {
    return {
      users: [],
      editUser: null,
    }
  },

  methods: {
    async getUsers() {
      const response = await axios.get('http://localhost:3000/users');
      this.users = response.data;
    },

    async setActive(active, id) {
      let data = Boolean;
      if (active === true) {data = false;}
      if (active === false) {data = true;}
      const response = await axios.patch(' http://localhost:3000/users/' + id, {active: data});
      this.getUsers();
    },

    async getEdit(id){
      const response = await axios.get(' http://localhost:3000/users/'+id);
      this.editUser = response.data;
    },

    async updateUser(id,data){
      const response = await axios.patch('http://localhost:3000/users/'+id,data);
      this.getUsers();
    },

    async deleteUser(id){
      const response = await axios.delete('http://localhost:3000/users/'+id);
      this.getUsers();
    }

  },


  mounted() {
    this.getUsers();
  }
})
</script>

<style scoped>

</style>