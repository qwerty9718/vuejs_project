import { createStore } from 'vuex'
import {userModule} from "@/store/userModule";
import axios from "axios";
import {documentModule} from "@/store/documentModule";

export default createStore({

  modules: {
    user:userModule,
    document:documentModule
  }

})
