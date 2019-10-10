import axios from 'axios'

export default {
    namespaced: true,
    state: {
        users: [],
        auth: false,
        notFound: false
    },
    actions: {
        getAllUsers(ctx) {
            axios
                .get('http://localhost:8080/bd.json')
                .then(response => {
                    ctx.commit('updateArray', {type: 'users', data: response.data['taskOne']});
                })
                .catch(error => {
                    if (error.response.status == 404) {
                        console.error(`Сервер временно недоступен. Text: ${error.response.statusText}`);
                    }
                })
                .finally(() => console.log('AJAX-запрос завершен'))
        },
    },
    mutations: {
        updateArray(state, { type, data }) {
            state[type] = data;
            
        },
        checkUser(state, { name, pass }) {
            if (name == false) console.warn('Введите логин')
            else {
                state['users'].forEach(user => {
                    if (user.login === name && user.password === pass) {
                        state['auth'] = true;
                        console.log('Авторизация прошла успешно!')
                    } else if (user.login === name && user.password !== pass) {
                        if (pass) console.warn('Пароль не верен!')
                        else console.warn('Введите пароль!')
                    }
                    if (user.login !== name) {
                        state['notFound'] = true;
                    } else state['notFound'] = false;
                });
                if (state['notFound']) console.warn('Пользователь не найден')
            }

        }
    },
    getters: {
        authTrig: state => state.auth
    }
}