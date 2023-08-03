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


            <tr>
              <td>{{ document.id }}</td>
              <td>{{ document.documentType }}</td>
              <td>{{ document.documentNumber }}</td>
              <td>{{ document.documentDate }}</td>
              <td>{{ document.description }}</td>
              <td>{{ document.invoiceType }}</td>
              <td>
                <router-link :to="{name:'users.single', params: { id: `${document.user_id}` }}">{{ document.user }}
                </router-link>
              </td>
              <td>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                  <button type="button" class="btn btn-outline-primary btn-fw"
                          @click="this.$router.push('/documents/'+document.id)">Открыть
                  </button>
                  <button type="button" class="btn btn-outline-success btn-fw" data-toggle="modal"
                          data-target="#exampleModal" @click="modalUpdateDocument(document.id,document.documentType,document.documentNumber,document.documentDate,document.description, document.invoiceType)">Изменить
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-fw" @click="deleteDocument(document.id)">
                    Удалить
                  </button>
                </div>
              </td>
            </tr>

          </template>
          </tbody>
        </table>

        <div class="container-fluid">
          <nav aria-label="Page navigation example" v-if="totalPage">
            <ul class="pagination">
              <li class="page-item paginate"><a class="page-link" @click.prevent="nextPage('-')">пред</a></li>
              <li class="page-item" v-for="total in totalPage"><a class="page-link" @click.prevent="pagination(total)">{{ total }}</a>
              </li>
              <li class="page-item paginate"><a class="page-link" @click.prevent="nextPage('+')">след</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card" style="margin: auto">
            <div class="card-body">
              <form class="forms-sample">

                <div class="form-group">
                  <label>Тип документа</label>
                  <input type="text" class="form-control" placeholder="Введите тип доумента"
                         v-model="updateDocument.documentType">
                </div>

                <div class="form-group">
                  <label>Номер документа</label>
                  <input type="number" class="form-control" placeholder="Введите номер"
                         v-model="updateDocument.documentNumber">
                </div>

                <div class="form-group">
                  <label>Дата документа</label>
                  <input type="date" min="1900-01-01" max="2999-12-31" id="sq_100i" placeholder="" aria-required="true"
                         aria-labelledby="sq_100_ariaTitle" aria-invalid="false" class="sd-input sd-text form-control"
                         data-gtm-form-interact-field-id="0" v-model="updateDocument.documentDate">
                </div>

                <div class="form-group">
                  <label>Описание</label>
                  <input type="text" class="form-control" placeholder="Введите описание"
                         v-model="updateDocument.description">
                </div>

                <div class="form-group">
                  <label>Тип счет-фактуры</label>
                  <input type="text" class="form-control" placeholder="Введите тип счет фактуры"
                         v-model="updateDocument.invoiceType">
                </div>


                <button type="button" class="btn btn-primary mr-2" @click="saveChanges" data-dismiss="modal">изменить</button>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>


</template>


<script>
import {defineComponent} from 'vue'
import axios from "axios";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default defineComponent({
  name: "Documents",
  data() {
    return {
      updateDocument: {
        id: null,
        documentType: '',
        documentNumber: null,
        documentDate: '',
        description: '',
        invoiceType: ''
      }
    }
  },

  methods: {

    ...mapActions({
      getDocuments: 'document/getDocuments',
      pagination: 'document/pagination',
      nextPage: 'document/nextPage',
      deleteDocument: 'document/deleteDocument'
    }),

    ...mapMutations({}),


    modalUpdateDocument(id,documentType,documentNumber,documentDate,description, invoiceType){
      this.updateDocument = {
        id: id,
        documentType: documentType,
        documentNumber: documentNumber,
        documentDate: documentDate,
        description: description,
        invoiceType: invoiceType}
    },

    async saveChanges(){
      const response = await axios.patch('http://localhost:3000/document/'+this.updateDocument.id,this.updateDocument);
      this.getDocuments();

    }

  },


  mounted() {
    this.getDocuments();

  },


  computed: {
    ...mapState({
      documents: state => state.document.documents,
      page: state => state.document.page,
      limit: state => state.document.limit,
      totalPage: state => state.document.totalPage,
    }),
    ...mapGetters({}),
  }
})
</script>

<style scoped>

</style>