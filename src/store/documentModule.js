import axios from "axios";

export const documentModule = {
    state: {


        documents: [],
        page: 1,
        limit:10,
        totalPage:null

    },
    getters: {},

    mutations: {
        setDocuments(state, documents) {
            state.documents = documents;
        },

        setPage(state, page) {
            state.page = page;
        },
        setTotalPage(state,totalPage){
            state.totalPage = totalPage;
        }
    },


    actions: {

        async getDocuments({state,commit}) {
            const response = await axios.get('http://localhost:3000/document',
                {params:{_page: state.page, _limit:state.limit}});
            commit('setTotalPage',Math.ceil(response.headers['x-total-count'] / state.limit))
            commit('setDocuments',response.data);

            for (let i = 0; i < response.data.length ; i++) {
                if (response.data[i].user_id !== null){
                    const users = await axios.get('http://localhost:3000/users/'+response.data[i].user_id);
                    // this.documents[i].user = users.data.name + ' ' + users.data.surname;
                    state.documents[i].user = users.data.name + ' ' + users.data.surname;
                }
            }

        },

        pagination({state,commit,dispatch},page){
            commit('setPage',page);
            dispatch('getDocuments');
        },

        nextPage({state,commit,dispatch},data){
            if (data === '-' && state.page > 0){
                state.page-=1;
                dispatch('getDocuments');
            }
            if (data === '+' && state.page < state.totalPage){
                state.page+=1;
                dispatch('getDocuments');
            }
        },

        async deleteDocument({state,commit,dispatch},id){
            const response = await axios.delete(' http://localhost:3000/document/'+id);
            dispatch('getDocuments');
        }
    },


    namespaced:true
}