<template>
  <div class="container-scroller">
    <NavBar/>
    <div class="container-fluid page-body-wrapper">
      <Settings/>
      <LeftColumn/>


      <div class="main-panel">

        <Content>
          <RouterView></RouterView>
        </Content>

        <Footer/>
      </div>

    </div>
  </div>
</template>


<script>
import {defineComponent} from 'vue'
import NavBar from "@/components/html/NavBar.vue";
import Settings from "@/components/html/Settings.vue";
import LeftColumn from "@/components/html/LeftColumn.vue";
import Content from "@/components/html/Content.vue";
import Footer from "@/components/html/Footer.vue";

export default defineComponent({
  name: "App",
  components: {Footer, Content, LeftColumn, Settings, NavBar}
})
</script>

<style scoped>

</style>