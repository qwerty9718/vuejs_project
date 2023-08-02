import { createStore } from 'vuex'
import {userModule} from "@/store/userModule";
import axios from "axios";

export default createStore({

  modules: {
    user:userModule
  }

})
