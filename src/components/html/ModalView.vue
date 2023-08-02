<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="editUser">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Изменить ланные</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label>Имя</label>
              <input type="text" class="form-control" placeholder="Введите имя" v-model="editUser.name">
            </div>
            <div class="form-group">
              <label>Фамилия</label>
              <input type="text" class="form-control" placeholder="Введите фамилию" v-model="editUser.surname">
            </div>

            <div class="form-group">
              <label>Дата рождения</label>
              <input  type="date" min="1900-01-01" max="2999-12-31" id="sq_100i" placeholder="" aria-required="true" aria-labelledby="sq_100_ariaTitle" aria-invalid="false" class="sd-input sd-text form-control" data-gtm-form-interact-field-id="0" v-model="editUser.date">
            </div>


            <div class="form-group">
              <label>Серия паспорта</label>
              <input type="text" class="form-control" placeholder="Серия паспорта" v-model="editUser.passport">
            </div>

            <div class="form-group">
              <label>Выбрать Пол</label>
              <select class="form-control" v-model="editUser.gender">
                <option value="мужской">Мужской</option>
                <option value="женский">Женский</option>
                <option value="">Не указан</option>
              </select>
            </div>

          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-primary" @click="updateUser(editUser.id)" data-dismiss="modal">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "ModalView",
  props:{
    editUser:{type:Object, required:true}
  },


  methods:{
    async updateUser(id){
      const data = {id: id, name: this.editUser.name, surname: this.editUser.surname, date: this.editUser.date, passport: this.editUser.passport, gender: this.editUser.gender};
      this.$emit('updateUser',id,data)
    }
  }

})
</script>


<style scoped>

</style>