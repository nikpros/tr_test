export default {
    namespaced: true,
    state: {
        items: []
    },
    actions: {
        sendPair(ctx, item) {
            ctx.commit('updateArray', { type: 'items', data: item })
            console.log(item)
        }
    },
    mutations: {
        updateArray(state, { type, data }) {
            state[type].push(data);
        },
    },
    getters: {
        getItems: state => state.items,
    }
}