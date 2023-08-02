import axios from "axios";
/*
1) Установить Axios для async запросов к Базе данных
2) Функция getUsers берет из БД Список пользователей
3) Циклом V-For отображаем список пользователей
4) Функция setActive Устанавливет активен пользователь или нет
5) Функция getEdit Получает данные пользователя которые нужно изменить
6) Функция updateUser обновляет данные пользователя и затем отрисовавет изменения
7) Функция DeleteUser удалаяет пользователя по id
8) Функция paginateUsers принимиет номер страницы и переходит на нее
9) Функция nextPage переходит на следеющую и предыдущую страницу в зависимости от получаемых данных
 */
export const userModule = {
    state: {

        users: [],
        editUser: null,
        page: 1,
        limit: 10,
        totalPage: 0,

    },
    getters: {},
    mutations: {
        setUser(state, users) {
            state.users = users;
        },
        setEditUser(state,editUser){
            state.editUser = editUser;
        },
        setPage(state, page){
            state.page = page;
        },
        setTotalPage(state, totalPage){
            state.totalPage = totalPage;
        }
    },


    actions: {

        async getUsers({state,commit}) {
            const response = await axios.get('http://localhost:3000/users',
                {params: {_page: state.page, _limit: state.limit}});
            commit('setTotalPage',Math.ceil(response.headers['x-total-count'] / state.limit));
            commit('setUser',response.data);

        },

        async getEdit({state,commit},id){
            const response = await axios.get(' http://localhost:3000/users/'+id);
            commit('setEditUser',response.data);
        },


        async updateUser({state,commit,dispatch},id){
            const data = {id: id, name: state.editUser.name, surname: state.editUser.surname, date: state.editUser.date, passport: state.editUser.passport, gender: state.editUser.gender};
            const response = await axios.patch('http://localhost:3000/users/'+id,data);
            dispatch('getUsers')
        },

        async setActive({state,commit,dispatch},id) {
            const user = await axios.get('http://localhost:3000/users/'+id);
            let active = user.data.active
            let data = Boolean;
            if (active === true) {data = false;}
            if (active === false) {data = true;}
            const response = await axios.patch(' http://localhost:3000/users/' + id, {active: data});
            dispatch('getUsers');
        },

        async deleteUser({state,commit,dispatch},id){
            const response = await axios.delete('http://localhost:3000/users/'+id);
            dispatch('getUsers');
        },

        paginateUsers({state,commit,dispatch},page){
            commit('setPage',page);
            dispatch('getUsers');
        },

        nextPage({state,commit,dispatch},data){
            if (data === '-' && state.page > 1){
                commit('setPage',state.page-=1)
                dispatch('getUsers');
            }
            if (data === '+' && state.page < state.totalPage){
                commit('setPage',state.page+=1)
                dispatch('getUsers');
            }
        }
    },


    namespaced:true
}