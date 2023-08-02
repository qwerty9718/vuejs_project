<template>
  <div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <div class="container-fluid" style="display: flex; justify-content: space-between">
          <h4 class="card-title">Список Сотрудников</h4>

          <!--   Поиск   -->
          <div class="input-group w-25">
            <div class="input-group-prepend hover-cursor" id="navbar-search-icon"><span class="input-group-text" id="search"><i class="icon-search"></i></span></div>
            <input type="text" class="form-control" id="navbar-search-input" placeholder="Поиск ..." v-model="searchQuery">
          </div>


        </div>


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
            <tr v-for="user in searchedUsers" :key="user.id">
              <td class="py-1"><img src="/template/user-img.png" alt="image"></td>
              <td>{{ user.id }}</td>
              <td>{{ user.name }} {{ user.surname }}</td>
              <td>{{ user.date }}</td>
              <td>{{ user.passport }}</td>
              <td v-if="user.gender === '' ? user.gender = 'Не указан' : user.gender">{{ user.gender }}</td>
              <td>
                <div class="form-check form-check-success">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" :checked="user.active" @click="setActive(user.id)">
                    {{ user.active ? 'Активен' : 'Не активен' }}
                    <i class="input-helper"></i>
                  </label>
                </div>
              </td>
              <td>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                  <button type="button" class="btn btn-outline-primary btn-fw" @click="this.$router.push('/users/'+user.id)">Открыть</button>
                  <button type="button" class="btn btn-outline-success btn-fw" data-toggle="modal" data-target="#exampleModal" @click="getEdit(user.id)">Изменить</button>
                  <button type="button" class="btn btn-outline-danger btn-fw" @click="deleteUser(user.id)">Удалить</button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="container-fluid">
        <nav aria-label="Page navigation example" v-if="totalPage && this.searchQuery === ''">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" @click.prevent="nextPage('-')">пред</a></li>
            <li class="page-item"  v-for="total in totalPage"><a class="page-link" @click.prevent="paginateUsers(total)">{{total}}</a></li>
            <li class="page-item"><a class="page-link" @click.prevent="nextPage('+')">след</a></li>
          </ul>
        </nav>
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
import {mapState,mapMutations,mapGetters,mapActions} from "vuex";

export default defineComponent({
  name: "Users",
  components: {ModalView},
  data() {
    return {
      searchQuery: '',
      searchArray:[]
    }
  },

  methods: {

    async getSearchArray(){
      const response = await axios.get(' http://localhost:3000/users');
      this.searchArray = response.data;
    },

    ...mapActions({
      getUsers:'user/getUsers',
      getEdit: 'user/getEdit',
      updateUser:'user/updateUser',
      setActive:'user/setActive',
      deleteUser: 'user/deleteUser',
      paginateUsers:'user/paginateUsers',
      nextPage: 'user/nextPage'
    }),

    ...mapMutations({

    }),

  },


  mounted() {
    this.getUsers();
  },

  computed:{
    ...mapState({
      users: state => state.user.users,
      editUser: state => state.user.editUser,
      page: state => state.user.page,
      limit: state => state.user.limit,
      totalPage: state => state.user.totalPage,
    }),
    ...mapGetters({

    }),

    searchedUsers() {
      if (this.searchQuery === ''){
        return this.users;
      }
      else {
        this.getSearchArray();
        return  this.searchArray.filter(user => user.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
      // return [...this.users].filter(user => user.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      // return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }
})
</script>

<style scoped>

</style>