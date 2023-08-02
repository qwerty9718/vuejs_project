<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item" v-for="item in menu">
        <a class="nav-link" data-toggle="collapse" :href="'#' + encodeURIComponent(item.code)" aria-expanded="false" aria-controls="auth">
          <i :class="item.icon"></i>
          <span class="menu-title" style="margin-top: 4px;">{{item.title}}</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" :id="item.code">
          <ul class="nav flex-column sub-menu" style="padding: 0.25rem 0 0 1.07rem;">
            <li v-for="subMenu in item.items" class="nav-item">
<!--              <a class="nav-link" href="pages/samples/login.html"> {{subMenu.title}} </a>-->
              <router-link :to="{name:subMenu.link}" class="nav-link">{{subMenu.title}} </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>


<script>
import {defineComponent} from 'vue'
import axios from "axios";
/*
Через AXIOS берем все элементы из таблицы Menu
 */

export default defineComponent({
  name: "LeftColumn",

  data(){
    return{
      menu:[]
    }
  },

  methods:{
    async getMenu(){
      const response = await axios.get('http://localhost:3000/menu');
      this.menu = response.data;
    }
  },

  mounted() {
    this.getMenu();
  }
})
</script>

<style scoped>

</style>